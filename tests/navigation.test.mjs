import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {test} from 'node:test';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const root=resolve(import.meta.dirname,'..');
const cache=new Map();
const navigation='data:text/javascript;base64,'+Buffer.from('export function usePathname(){return "/";} export function notFound(){throw new Error("Route not found");}').toString('base64');
function moduleUrl(file){
  file=resolve(root,file);
  if(cache.has(file))return cache.get(file);
  let code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  code=code.replace(/from (["'])([^"']+)\1/g,(_,quote,spec)=>{
    let url;
    if(spec==='next/navigation')url=navigation;
    else if(spec.startsWith('@/')||spec.startsWith('.')){
      const base=spec.startsWith('@/')?resolve(root,spec.slice(2)):resolve(dirname(file),spec);
      const dependency=['','.tsx','.ts','.mjs'].map(ext=>base+ext).find(existsSync);
      assert.ok(dependency,`Missing module: ${spec}`);
      url=moduleUrl(dependency);
    }else url=import.meta.resolve(spec);
    return 'from '+JSON.stringify(url);
  });
  const url='data:text/javascript;base64,'+Buffer.from(code).toString('base64');
  cache.set(file,url);return url;
}
const {services,posts,company}=await import(moduleUrl('lib/content.ts'));
const {ServiceCard,BlogCard,CTA,Footer}=await import(moduleUrl('components/Site.tsx'));
const {default:Navbar}=await import(moduleUrl('components/Navbar.tsx'));
const {default:Contact}=await import(moduleUrl('app/contact/page.tsx'));
const {default:ServiceDetail}=await import(moduleUrl('app/services/[slug]/page.tsx'));
const {default:Article}=await import(moduleUrl('app/blog/[slug]/page.tsx'));
const html=node=>renderToStaticMarkup(node);

function assertValidLinks(markup){
  const paths=new Set(['/','/about','/services','/blog','/contact',...services.map(s=>'/services/'+s.id),...posts.map(p=>'/blog/'+p.slug)]);
  for(const match of markup.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
    const href=match[1].replaceAll('&amp;','&');
    if(!href.startsWith('/'))continue;
    const url=new URL(href,'https://example.test');
    assert.ok(paths.has(url.pathname),`Unresolved destination: ${href}`);
    const service=url.searchParams.get('service');
    if(service)assert.ok(services.some(s=>s.title===service),`Unknown inquiry service: ${service}`);
  }
}

test('every service and article opens a real detail route, with no nested links',async()=>{
  for(const service of services){
    const card=html(createElement(ServiceCard,{service}));
    assert.match(card,new RegExp('^<a[^>]+href="/services/'+service.id+'"'));
    assert.equal((card.match(/<a\b/g)||[]).length,1);
    assertValidLinks(html(await ServiceDetail({params:Promise.resolve({slug:service.id})})));
  }
  for(const post of posts){
    const card=html(createElement(BlogCard,{post}));
    assert.equal((card.match(/<a\b/g)||[]).length,1);
    assert.match(card,new RegExp('href="/blog/'+post.slug+'"'));
    assertValidLinks(html(await Article({params:Promise.resolve({slug:post.slug})})));
  }
});

test('navigation and footer resolve destinations; mobile menu is native HTML',()=>{
  const header=html(createElement(Navbar));
  assert.match(header,/<details class="mobile-navigation"><summary/);
  assert.match(header,/href="\/contact\?intent=consultation#inquiry-form"/);
  assertValidLinks(header+html(createElement(CTA))+html(createElement(Footer)));
  assert.doesNotMatch(html(createElement(Footer)),/social-pending/);
});

test('consultation and service choices are present before client JavaScript runs',async()=>{
  const consultation=html(await Contact({searchParams:Promise.resolve({intent:'consultation'})}));
  assert.match(consultation,/<option selected="">Free Consultation<\/option>/);
  const formTag=consultation.match(/<form[^>]+>/)?.[0];
  assert.ok(formTag);
  assert.match(formTag,/method="POST"/);
  assert.match(formTag,/action="https:\/\/formsubmit.co\/khumbunuru@gmail.com"/);
  assert.match(formTag,/target="_blank"/); // Native fallback leaves the embedding frame.
  assert.match(consultation,/href="mailto:khumbunuru@gmail.com"[^>]*class="button secondary"/);
  const service=html(await Contact({searchParams:Promise.resolve({service:services[0].title})}));
  assert.ok(service.includes('<option selected="">'+services[0].title.replaceAll('&','&amp;')+'</option>'));
  assert.ok(company.consultation.endsWith('#inquiry-form'));
});


test('native successful return renders the same complete thank-you panel',async()=>{
  const success=html(await Contact({searchParams:Promise.resolve({submitted:'1'})}));
  assert.match(success,/Thank you for filling out the form\./);
  assert.doesNotMatch(success,/<form\b/);
  assertValidLinks(success);
});
