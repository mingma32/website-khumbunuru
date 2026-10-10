import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../lib/inquiry.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {parseInquiry,buildInquiryMailto,submitInquiry}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const allowed=['Free Consultation','Software Development'];
const sample={name:' Test User ',email:'customer@example.com',service:'Free Consultation',industry:'Education & Training',projectType:'Mobile App',message:'Discuss an attendance app.'};
const config={recipient:'khumbunuru@gmail.com',siteUrl:'https://khumbu-nuru-it.sandrarobertsa810.chatgpt.site'};
test('valid sector inquiry preserves details and trims name',()=>{
  const data=parseInquiry(sample,allowed);
  assert.equal(data.name,'Test User');assert.equal(data.company,'');assert.equal(data.industry,sample.industry);assert.equal(data.projectType,'Mobile App');
});
test('invalid or malicious input never reaches the provider',()=>{
  for(const change of [{name:''},{email:'invalid'},{email:'customer@example.com\r\nBcc: bad@example.com'},{service:'Unknown Service'},{message:' '},{message:'a'.repeat(5001)},{company:123},{_honey:'spam'},{industry:'a'.repeat(121)}]){
    assert.equal(parseInquiry({...sample,...change},allowed),null);
  }
  assert.equal(parseInquiry(null,allowed),null);assert.equal(parseInquiry([],allowed),null);
});
test('email fallback preserves every field and the intended recipient',()=>{
  const url=new URL(buildInquiryMailto({...sample,company:'My company',phone:'9800000000'},config.recipient));
  assert.equal(url.pathname,config.recipient);
  assert.match(url.searchParams.get('subject'),/Free consultation request/);
  const body=url.searchParams.get('body');
  for(const value of ['My company','9800000000',sample.email,sample.industry,sample.projectType,sample.message])assert.ok(body.includes(value));
});
test('draft encoding preserves Nepali and query-like text without adding recipients',()=>{
  const message='नमस्ते & subject=test # body ? cc=other@example.com';
  const url=new URL(buildInquiryMailto({...sample,message},config.recipient));
  assert.equal(url.pathname,config.recipient);
  assert.ok(url.searchParams.get('body').includes(message));
  assert.deepEqual([...url.searchParams.keys()],['subject','body']);
});


test('AJAX acceptance sends every field to the intended mailbox without navigating',async()=>{
  let request;
  const result=await submitInquiry(parseInquiry(sample,allowed),config,async(url,options)=>{
    request={url,...options};
    return new Response(JSON.stringify({success:'true',message:'Form successfully submitted'}),{status:200,headers:{'Content-Type':'application/json'}});
  });
  assert.equal(result,'accepted');
  assert.equal(request.url,'https://formsubmit.co/ajax/khumbunuru@gmail.com');
  const body=JSON.parse(request.body);
  assert.equal(body._replyto,sample.email);
  for(const key of ['email','service','industry','projectType','message'])assert.equal(body[key],sample[key]);
  assert.equal(body._url,config.siteUrl+'/contact');
  assert.equal(body._template,'table');
  assert.equal(body._captcha,undefined);
  assert.equal(body._next,undefined);
});

test('failed, blocked, or malformed provider responses never produce thank-you',async()=>{
  const fields=parseInquiry(sample,allowed);
  for(const response of [new Response('blocked',{status:403}),new Response('rate limit',{status:429}),new Response('<html>Verification required</html>'),new Response(JSON.stringify({success:false})),new Response(JSON.stringify({message:'OK'}))]){
    await assert.rejects(submitInquiry(fields,config,async()=>response));
  }
  await assert.rejects(submitInquiry(fields,config,async()=>{throw new TypeError('Network error');}));
});

test('activation instructions are distinguished from accepted submissions',async()=>{
  for(const success of [true,'true',false]){
    const result=await submitInquiry(parseInquiry(sample,allowed),config,async()=>new Response(JSON.stringify({success,message:'Please confirm your email address. We have sent an activation email.'})));
    assert.equal(result,'activation-required');
  }
});
