-- Run once in a new Supabase project. No service-role key is used by clients.
begin;
create table public.lectra_books (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id),
 revision bigint not null default 0,
 operation_id uuid,
 data jsonb,
 updated_at timestamptz not null default now(),
 constraint lectra_payload_size check (data is null or octet_length(data::text) <= 10485760)
);
create table public.lectra_members (
 book_id uuid not null references public.lectra_books(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 role text not null check (role in ('reader','editor')),
 primary key(book_id,user_id)
);
create table public.lectra_invites (
 token uuid primary key default gen_random_uuid(),
 book_id uuid not null references public.lectra_books(id) on delete cascade,
 role text not null check (role in ('reader','editor')),
 expires_at timestamptz not null default (now()+interval '1 day'),
 used_by uuid references auth.users(id),
 revoked boolean not null default false
);
alter table public.lectra_books enable row level security;
alter table public.lectra_members enable row level security;
alter table public.lectra_invites enable row level security;

-- Definer helpers avoid recursive membership policies. No dynamic SQL.
create function public.lectra_role(p_book uuid) returns text
language sql stable security definer set search_path = '' as $$
 select case when b.owner_id=auth.uid() then 'owner' else m.role end
 from public.lectra_books b left join public.lectra_members m
 on m.book_id=b.id and m.user_id=auth.uid() where b.id=p_book
$$;
revoke all on function public.lectra_role(uuid) from public,anon;
grant execute on function public.lectra_role(uuid) to authenticated;
create policy lectra_read_book on public.lectra_books for select to authenticated
 using (public.lectra_role(id) is not null);
create policy lectra_read_members on public.lectra_members for select to authenticated
 using (public.lectra_role(book_id)='owner' or user_id=auth.uid());
create policy lectra_read_invites on public.lectra_invites for select to authenticated
 using (public.lectra_role(book_id)='owner');
revoke all on public.lectra_books,public.lectra_members,public.lectra_invites from anon,authenticated;
grant select on public.lectra_books,public.lectra_members,public.lectra_invites to authenticated;

create function public.lectra_create(p_id uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'LOGIN_REQUIRED'; end if;
 insert into public.lectra_books(id,owner_id) values(p_id,auth.uid()) on conflict do nothing;
 if public.lectra_role(p_id) is distinct from 'owner' then raise exception 'ACCESS_DENIED'; end if;
 return p_id;
end $$;

-- A retry with the same operation UUID is safe after a lost response.
-- A stale revision never overwrites someone else's changes.
create function public.lectra_save(p_book uuid,p_revision bigint,p_operation uuid,p_data jsonb)
returns bigint language plpgsql security definer set search_path = '' as $$
declare b public.lectra_books;
begin
 select * into b from public.lectra_books where id=p_book for update;
 if not found or coalesce(public.lectra_role(p_book),'') not in ('owner','editor') then
  raise exception 'ACCESS_DENIED';
 end if;
 if p_operation is null or p_data is null or jsonb_typeof(p_data) <> 'object' then
  raise exception 'INVALID_PAYLOAD';
 end if;
 if b.operation_id=p_operation then
  if b.data is distinct from p_data then raise exception 'OPERATION_REUSED'; end if;
  return b.revision;
 end if;
 if b.revision is distinct from p_revision then raise exception 'REVISION_CONFLICT'; end if;
 update public.lectra_books set data=p_data,revision=revision+1,
 operation_id=p_operation,updated_at=now() where id=p_book returning revision into b.revision;
 return b.revision;
end $$;

create function public.lectra_invite(p_book uuid,p_role text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
 if public.lectra_role(p_book) is distinct from 'owner' then raise exception 'ACCESS_DENIED'; end if;
 insert into public.lectra_invites(book_id,role) values(p_book,p_role) returning token into result;
 return result;
end $$;
create function public.lectra_join(p_token uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare invite public.lectra_invites;
begin
 if auth.uid() is null then raise exception 'LOGIN_REQUIRED'; end if;
 select * into invite from public.lectra_invites where token=p_token for update;
 if not found or invite.revoked or invite.expires_at<=now() then raise exception 'INVITE_UNAVAILABLE'; end if;
 if invite.used_by=auth.uid() then return invite.book_id; end if;
 if invite.used_by is not null then raise exception 'INVITE_UNAVAILABLE'; end if;
 insert into public.lectra_members(book_id,user_id,role) values(invite.book_id,auth.uid(),invite.role)
 on conflict(book_id,user_id) do nothing;
 update public.lectra_invites set used_by=auth.uid() where token=p_token;
 return invite.book_id;
end $$;
create function public.lectra_revoke(p_book uuid,p_user uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
 if public.lectra_role(p_book) is distinct from 'owner' then raise exception 'ACCESS_DENIED'; end if;
 delete from public.lectra_members where book_id=p_book and user_id=p_user;
 update public.lectra_invites set revoked=true where book_id=p_book and used_by=p_user;
end $$;
create function public.lectra_cancel_invite(p_token uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
 select book_id into target from public.lectra_invites where token=p_token;
 if public.lectra_role(target) is distinct from 'owner' then raise exception 'ACCESS_DENIED'; end if;
 update public.lectra_invites set revoked=true where token=p_token;
end $$;

revoke all on function public.lectra_create(uuid),public.lectra_save(uuid,bigint,uuid,jsonb),
 public.lectra_invite(uuid,text),public.lectra_join(uuid),public.lectra_revoke(uuid,uuid),
 public.lectra_cancel_invite(uuid) from public,anon;
grant execute on function public.lectra_create(uuid),public.lectra_save(uuid,bigint,uuid,jsonb),
 public.lectra_invite(uuid,text),public.lectra_join(uuid),public.lectra_revoke(uuid,uuid),
 public.lectra_cancel_invite(uuid) to authenticated;

-- Immutable attachment paths: book UUID / upload UUID / file UUID.
insert into storage.buckets(id,name,public,file_size_limit)
 values('lectra-files','lectra-files',false,52428800);
create function public.lectra_file_book(p_name text) returns uuid
language sql immutable set search_path = '' as $$
 select case when split_part(p_name,'/',1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
 then split_part(p_name,'/',1)::uuid else null end
$$;
revoke all on function public.lectra_file_book(text) from public,anon;
grant execute on function public.lectra_file_book(text) to authenticated;
create policy lectra_file_read on storage.objects for select to authenticated
 using(bucket_id='lectra-files' and public.lectra_role(public.lectra_file_book(name)) is not null);
create policy lectra_file_insert on storage.objects for insert to authenticated
 with check(bucket_id='lectra-files' and public.lectra_role(public.lectra_file_book(name)) in ('owner','editor'));
-- No update/delete policy: existing revisions retain their attachment bytes.
commit;
