'use client';
import {useEffect,useRef,useState} from 'react';
import {company,services} from '@/lib/content';
import {industries,serviceDetails} from '@/lib/serviceDetails';
import {buildInquiryMailto,parseInquiry,submitInquiry} from '@/lib/inquiry';
import ConsultationLink from '@/components/ConsultationLink';
import InquiryThankYou from '@/components/InquiryThankYou';

export default function ContactForm({intent,requestedService,requestedIndustry,submitted=false}:{intent?:string;requestedService?:string;requestedIndustry?:string;submitted?:boolean}){
  const allowed=['Free Consultation',...services.map(s=>s.title),'Other / Not Sure'];
  const initialService=intent==='consultation'?'Free Consultation':requestedService && allowed.includes(requestedService)?requestedService:'';
  const [service,setService]=useState(initialService);
  const [industry,setIndustry]=useState(requestedIndustry && industries.includes(requestedIndustry)?requestedIndustry:'');
  const [status,setStatus]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [accepted,setAccepted]=useState(submitted);
  const [siteUrl,setSiteUrl]=useState(company.siteUrl);
  const inFlight=useRef(false);
  const form=useRef<HTMLFormElement>(null);
  const thankYou=useRef<HTMLElement>(null);
  const selectedService=services.find(item=>item.title===service);
  const projectTypes=selectedService?serviceDetails[selectedService.id]?.projectTypes??[]:[];

  useEffect(()=>{if(accepted)thankYou.current?.focus();},[accepted]);
  useEffect(()=>{setSiteUrl(company.siteUrl || window.location.origin);},[]);
  async function send(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(inFlight.current)return;
    const fields=parseInquiry(Object.fromEntries(new FormData(event.currentTarget)),allowed);
    if(!fields){setError('Please check your name, email, service, and message before submitting.');return;}
    inFlight.current=true;setBusy(true);setError('');setStatus('');
    try{
      const result=await submitInquiry(fields,{recipient:company.email,siteUrl:company.siteUrl || window.location.origin});
      if(result==='activation-required'){
        setError('Email delivery is awaiting activation. Please use “Email this inquiry instead” to contact us directly.');
      }else setAccepted(true);
    }catch{
      setError('We couldn’t confirm your submission. Your details are still here. Please try again or use “Email this inquiry instead”.');
    }finally{inFlight.current=false;setBusy(false);}
  }

  function emailInquiry(event:React.MouseEvent<HTMLAnchorElement>){
    if(!form.current)return;
    const data=Object.fromEntries(new FormData(form.current));
    const fields=Object.fromEntries(['name','company','email','phone','service','industry','projectType','message'].map(key=>[key,String(data[key]??'')]));
    event.currentTarget.href=buildInquiryMailto(fields,company.email);
    setStatus('Your email app opens with your inquiry filled in. Press Send in your email app to complete it.');
  }

  if(accepted)return <section id="inquiry-form" ref={thankYou} tabIndex={-1} aria-labelledby="inquiry-thanks-title" className="contact-form inquiry-success"><InquiryThankYou/></section>;

  return <form ref={form} id="inquiry-form" action={'https://formsubmit.co/'+company.email} method="POST" target="_blank" rel="noopener" onSubmit={send} encType="application/x-www-form-urlencoded" className="contact-form" aria-busy={busy}>
    <div className="form-heading"><h2>Tell us about your project</h2><p>Share a little about what you need.</p></div>
    {siteUrl && <><input type="hidden" name="_url" value={siteUrl+'/contact'}/>
    <input type="hidden" name="_next" value={siteUrl+'/contact?submitted=1#inquiry-form'}/></>}
    <input type="hidden" name="_subject" value={service==='Free Consultation'?'Free consultation request — Khumbu Nuru I.T. Services':'Website inquiry — Khumbu Nuru I.T. Services'+(service?' — '+service:'')}/>
    <input type="hidden" name="_template" value="table"/>
    <input type="hidden" name="_captcha" value="true"/>
    <div className="form-grid">
      <label>Name <span>*</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your full name"/></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={160} placeholder="Company or organization"/></label>
      <label>Email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your phone number"/></label>
      <label className="full-width">Service <span>*</span><select name="service" required value={service} onChange={event=>setService(event.target.value)}><option value="">Select a service</option><option>Free Consultation</option>{services.map(s=><option key={s.id}>{s.title}</option>)}<option>Other / Not Sure</option></select></label>
      <label>Industry / sector<select name="industry" value={industry} onChange={event=>setIndustry(event.target.value)}><option value="">Select a sector (optional)</option>{industries.map(value=><option key={value}>{value}</option>)}</select></label>
      <label>Project type<select key={service} name="projectType" defaultValue=""><option value="">Select a project (optional)</option>{projectTypes.map(value=><option key={value}>{value}</option>)}<option>Other / Not Sure</option></select></label>
      <label className="full-width">Message <span>*</span><textarea name="message" required maxLength={5000} rows={5} placeholder="What are you working on, and how can we help?"/></label>
    </div>
    <p className="form-note">Required fields are marked with *. Your inquiry is submitted to {company.email}.</p>
    <noscript><p className="form-note">Submission opens a verification page in a new tab. Complete that step to send your inquiry.</p></noscript>
    <div className="inquiry-actions"><button type="submit" disabled={busy} className="button primary">{busy?'Sending…':service==='Free Consultation'?'Request a Free Consultation':'Send Inquiry'}</button><a href={'mailto:'+company.email} className="button secondary" onClick={emailInquiry}>Email this inquiry instead</a></div>
    {busy && <p className="form-status" role="status">Sending your inquiry…</p>}
    {error && <p className="form-status form-error" role="alert">{error}</p>}
    {status && <p className="form-status" role="status">{status}</p>}
    <p className="direct-email">Prefer email? <a className="text-link" href={'mailto:'+company.email}>{company.email}</a></p>
    <ConsultationLink className="text-link consultation-select"/>
  </form>;
}
