# Cloud collaboration foundation — not enabled in production

This is the tested database and transport layer for the next LECTRA release.
`cloud-client.js` is intentionally **not loaded by index.html**. No existing
notebook is uploaded, no authentication email is sent, and no user account is
created merely by deploying these files. A Supabase project has not yet been
provided. This is not a finished synchronization feature.

## Setup in the owner's Supabase account

1. Create a new project. Keep its database password and secret/service-role key
   private. The browser client needs only Project URL and Publishable key.
2. Run `001_notebooks.sql` once in the SQL Editor. It creates namespaced tables,
   RPCs, RLS policies and the private `lectra-files` bucket in one transaction.
   This migration is for a new project; do not repeatedly run it against an
   existing installation. It does not replace existing unrelated policies.
3. Enable email authentication. Change the Magic Link email template to display
   `{{ .Token }}` so users can enter the OTP inside the Streamlit iframe.
4. Configure custom SMTP before accepting arbitrary users. Supabase's built-in
   delivery is restricted to the project team and is unsuitable for a public app.
5. Provide the Project URL and Publishable key for application integration.
   No database password, personal access token or service-role key is needed.

## Protocol

- OTP authentication stays in memory. The current transport requires login again
  after reload/expiry; session refresh and account UI are still to be implemented.
- `create(uuid)` is idempotent for the owner; a different user cannot claim an ID.
- Upload attachments to immutable `book/upload/file` UUID paths first. Only after
  all uploads succeed, commit a JSON snapshot and its file manifest with `save`.
- `save(book, expectedRevision, operationUUID, payload)` atomically checks the
  revision. Retrying the latest successful operation with the same payload is
  idempotent. Reusing its UUID with different content is rejected. A stale version
  is rejected; the UI must preserve both versions and offer an explicit merge.
- An older retried operation after another successful write returns a conflict,
  not a false success. Never automatically retry a conflict with the new revision.
- `invite(book, reader|editor)` issues a single-use code valid for one day.
  The owner can cancel it. `join` requires an authenticated recipient.
- `revoke` removes the member and revokes consumed invites for that member.
  It cannot erase a copy the recipient downloaded while access was authorized.
- Files are private and checked against current notebook membership on each
  download. No public URL or service key bypass is used.

## Limits and unfinished integration

The first migration permits a JSON snapshot up to 10 MiB and files up to 50 MiB.
This does not reduce the existing local audio-import limit. Cloud transfer of
larger lecture recordings needs a separate resumable-upload/quota design.
Uploads abandoned before snapshot commit require a later owner-controlled
garbage-collection job. Existing files cannot be overwritten by editors.

Next work: account dialog in RU/EN/ZH, device-specific authenticated caches,
explicit opt-in to upload local notebooks, attachment manifest validation,
sanitization of incoming rich text, conflict copies, offline queue, refresh-token
lifecycle, account switching, shared-library UI, invitation management and
cross-device integration tests. Until these are complete, do not load this client
in the app or label any existing local notebook as synchronized.

## Validation

`node --test tests/cloud-client.cjs` checks public-key restrictions, authentication
boundaries, no silent conflict retry, bounded network waits, safe error messages,
file limits and path isolation using an injected transport.

`node tests/cloud-database.cjs` requires test-only `@electric-sql/pglite@0.5.11`
on NODE_PATH. It executes the actual migration in PostgreSQL WASM with minimal
Supabase-compatible `auth` and `storage` schemas. It tests owner, editor, reader,
stranger and anonymous access, retries, conflicts, immutable files, invitations
and revocation. It does not test the hosted Auth/Storage HTTP services or SMTP.
Run equivalent tests against the actual project with separate test accounts
before enabling the feature for users.

Official references:
- https://supabase.com/docs/guides/auth/auth-email-passwordless
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/storage/security/access-control
