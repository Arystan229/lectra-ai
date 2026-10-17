const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('frontend/mobile-audio.js','utf8');
const calls=[];
class Recorder{static isTypeSupported(mime){return mime.startsWith('audio/mp4')}constructor(stream,options){calls.push(options);if(options?.audioBitsPerSecond){const e=new Error('bitrate unsupported');e.name='NotSupportedError';throw e}this.mimeType=options?.mimeType||'default'}}
const ctx={window:{},MediaRecorder:Recorder};vm.runInNewContext(code,ctx);
ctx.localStorage={getItem:()=> 'en'};
vm.runInNewContext(fs.readFileSync('frontend/ui-i18n.js','utf8'),ctx);ctx.UI=ctx.window.UI;
assert(ctx.window.MobileAudio.createRecorder({}).mimeType.startsWith('audio/mp4'));assert.equal(calls.length,2);
Recorder.isTypeSupported=()=>false;assert.equal(ctx.window.MobileAudio.createRecorder({}).mimeType,'default');
let handler,trackHandler,requested=0,released=0,interrupted=0;
const toggle={checked:true,addEventListener(){},removeEventListener(){}},hint={};
ctx.document={visibilityState:'visible',querySelector:s=>s==='#keepScreenAwake'?toggle:hint,addEventListener:(e,fn)=>handler=fn,removeEventListener(){}};
ctx.navigator={wakeLock:{request:async()=>{requested++;return {released:false,addEventListener(){},release:async()=>{released++}}}}};
const track={addEventListener:(e,fn)=>trackHandler=fn,removeEventListener(){}};
let checkpoint=0;const cleanup=ctx.window.MobileAudio.protect({getAudioTracks:()=>[track]},{state:'recording',requestData(){checkpoint++}},()=>interrupted++);
setImmediate(()=>{assert.equal(requested,1);ctx.document.visibilityState='hidden';handler();assert.equal(checkpoint,1);trackHandler();assert.equal(interrupted,1);cleanup();assert.equal(released,1);console.log('PASS: MP4 codec fallback, default recorder, wake lock cleanup, hidden-tab checkpoint, track interruption')});
