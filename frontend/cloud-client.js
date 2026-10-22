/* Transport only. Not activated until a Supabase project is configured. */
(function(root){
 'use strict';
 const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
 class CloudError extends Error {constructor(code){super(code);this.code=code}}
 class CloudClient {
  constructor(config,fetcher=globalThis.fetch){
   const url=new URL(config.url);
   if(url.protocol!=='https:'||!url.hostname.endsWith('.supabase.co')||url.pathname!=='/'||url.search||url.hash||url.username||url.password)throw new CloudError('INVALID_CONFIG');
   if(!String(config.key).startsWith('sb_publishable_')){
    let payload;try{payload=JSON.parse(atob(config.key.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')))}catch{}
    if(payload?.role!=='anon')throw new CloudError('PUBLIC_KEY_REQUIRED');
   }
   this.url=url.origin;this.key=config.key;this.fetcher=fetcher;this.session=null;
  }
  async request(path,{body,method='POST',auth=true,raw=false,timeout=30000}={}){
   if(auth&&!this.session)throw new CloudError('LOGIN_REQUIRED');
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeout);
   const headers={apikey:this.key};if(auth)headers.Authorization='Bearer '+this.session.access_token;
   if(body!==undefined)headers['Content-Type']=raw?(body.type||'application/octet-stream'):'application/json';
   try{
    const response=await this.fetcher(this.url+path,{method,headers,body:body===undefined?undefined:raw?body:JSON.stringify(body),signal:controller.signal});
    if(!response.ok){const text=await response.text();const known=['REVISION_CONFLICT','OPERATION_REUSED','ACCESS_DENIED','INVITE_UNAVAILABLE','INVALID_PAYLOAD'];
     throw new CloudError(response.status===401?'LOGIN_EXPIRED':known.find(c=>text.includes(c))||'CLOUD_REQUEST_FAILED');}
    if(response.status===204)return null;
    if(raw&&method==='GET')return response.blob();
    const text=await response.text();return text?JSON.parse(text):null;
   }catch(error){if(error.name==='AbortError')throw new CloudError('CLOUD_TIMEOUT');throw error}finally{clearTimeout(timer)}
  }
  sendCode(email){return this.request('/auth/v1/otp',{auth:false,body:{email,create_user:true}})}
  async verifyCode(email,token){const session=await this.request('/auth/v1/verify',{auth:false,body:{email,token,type:'email'}});
   if(!session?.access_token||!session.user?.id)throw new CloudError('LOGIN_FAILED');this.session=session;return session.user;}
  async signOut(){try{if(this.session)await this.request('/auth/v1/logout')}finally{this.session=null}}
  rpc(name,body){return this.request('/rest/v1/rpc/'+name,{body})}
  id(value){if(!UUID.test(value))throw new CloudError('INVALID_ID');return value}
  create(id){return this.rpc('lectra_create',{p_id:this.id(id)})}
  list(){return this.request('/rest/v1/lectra_books?select=id,owner_id,revision,updated_at&data=not.is.null&order=updated_at.desc',{method:'GET'})}
  async load(id){const rows=await this.request('/rest/v1/lectra_books?id=eq.'+this.id(id)+'&select=*',{method:'GET'});if(!rows?.length)throw new CloudError('ACCESS_DENIED');return rows[0]}
  save(id,revision,operation,data){if(!Number.isSafeInteger(revision)||revision<0)throw new CloudError('INVALID_REVISION');
   return this.rpc('lectra_save',{p_book:this.id(id),p_revision:revision,p_operation:this.id(operation),p_data:data});}
  invite(id,role){if(!['reader','editor'].includes(role))throw new CloudError('INVALID_ROLE');return this.rpc('lectra_invite',{p_book:this.id(id),p_role:role})}
  join(token){return this.rpc('lectra_join',{p_token:this.id(token)})}
  members(id){return this.request('/rest/v1/lectra_members?book_id=eq.'+this.id(id)+'&select=user_id,role',{method:'GET'})}
  revoke(id,user){return this.rpc('lectra_revoke',{p_book:this.id(id),p_user:this.id(user)})}
  cancelInvite(token){return this.rpc('lectra_cancel_invite',{p_token:this.id(token)})}
  async upload(id,upload,file,blob){if(blob.size>50*1024*1024)throw new CloudError('CLOUD_FILE_TOO_LARGE');
   const path=[id,upload,file].map(v=>this.id(v)).join('/');await this.request('/storage/v1/object/lectra-files/'+path,{raw:true,body:blob,timeout:120000});return path;}
  download(id,path){if(!path.startsWith(this.id(id)+'/')||!path.split('/').every(v=>UUID.test(v))||path.split('/').length!==3)throw new CloudError('INVALID_PATH');
   return this.request('/storage/v1/object/authenticated/lectra-files/'+path,{raw:true,method:'GET',timeout:120000});}
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={CloudClient,CloudError};else root.LectraCloudTransport={CloudClient,CloudError};
})(globalThis);
