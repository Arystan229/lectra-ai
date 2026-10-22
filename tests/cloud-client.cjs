const {test}=require('node:test');
const assert=require('node:assert/strict');
const {CloudClient}=require('../frontend/cloud-client.js');
const book='11111111-1111-4111-8111-111111111111',operation='22222222-2222-4222-8222-222222222222';
const config={url:'https://test.supabase.co',key:'sb_publishable_test'};
test('only public project credentials and HTTPS project URLs are accepted',()=>{
 for(const url of ['http://test.supabase.co','https://test.supabase.co.evil.test','https://test.supabase.co/?key=x'])assert.throws(()=>new CloudClient({...config,url}));
 for(const key of ['sb_secret_private','bad','x.'+btoa(JSON.stringify({role:'service_role'}))+'.x'])assert.throws(()=>new CloudClient({...config,key}));
 assert.doesNotThrow(()=>new CloudClient(config));
});
test('no private data request before login; OTP does not include an old access token',async()=>{
 const calls=[];const c=new CloudClient(config,async(url,options)=>{calls.push({url,options});return new Response('{}')});
 await assert.rejects(c.list(),{code:'LOGIN_REQUIRED'});assert.equal(calls.length,0);
 await c.sendCode('test@example.invalid');assert.equal(calls[0].options.headers.Authorization,undefined);
 assert.equal(JSON.parse(calls[0].options.body).email,'test@example.invalid');
});
test('save forwards exact version and operation; conflict is not automatically overwritten',async()=>{
 let calls=0;const c=new CloudClient(config,async(url,options)=>{calls++;const data=JSON.parse(options.body);assert.equal(data.p_revision,7);assert.equal(data.p_operation,operation);return new Response('{"message":"REVISION_CONFLICT"}',{status:400})});
 c.session={access_token:'test'};await assert.rejects(c.save(book,7,operation,{title:'keep both'}),{code:'REVISION_CONFLICT'});assert.equal(calls,1);
});
test('error bodies cannot expose tokens through the UI; sign-out clears session on failure',async()=>{
 const c=new CloudClient(config,async()=>new Response('private server traceback token=secret',{status:500}));c.session={access_token:'secret'};
 await assert.rejects(c.signOut(),{message:'CLOUD_REQUEST_FAILED'});assert.equal(c.session,null);
});
test('attachment paths cannot leave their notebook; large files are rejected before network',async()=>{
 let calls=0;const c=new CloudClient(config,async()=>{calls++;return new Response('{}')});c.session={access_token:'test'};
 assert.throws(()=>c.download(book,operation+'/'+operation+'/'+book),{code:'INVALID_PATH'});
 assert.throws(()=>c.download(book,book+'/../'+operation),{code:'INVALID_PATH'});
 await assert.rejects(c.upload(book,operation,book,{size:51*1024*1024}),{code:'CLOUD_FILE_TOO_LARGE'});assert.equal(calls,0);
});
test('network stall has a bounded timeout',async()=>{
 const c=new CloudClient(config,async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('aborted','AbortError')))));
 await assert.rejects(c.request('/test',{auth:false,timeout:10}),{code:'CLOUD_TIMEOUT'});
});
