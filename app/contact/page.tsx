import {company} from '@/lib/content';
import {PageHero} from '@/components/Site';
import ContactForm from '@/components/ContactForm';
import {MessageSquare,Mail,Phone,MapPin} from 'lucide-react';
export const metadata={title:'Contact',description:'Discuss your project and book a free technology consultation with Khumbu Nuru I.T. Services.'};
export default async function Contact({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const search=await searchParams;
  const value=(key:string)=>typeof search[key]==='string'?search[key] as string:undefined;
  return <><PageHero label="START A CONVERSATION" title="Let's Work Together" description="Have a project, a question, or a technology challenge? Let’s find a practical way forward."/><section className="section container contact-grid"><aside><span className="icon-box"><MessageSquare size={26}/></span><h2>A useful first conversation.</h2><p>During the consultation, we will understand your business or project and recommend a practical technology and digital solution.</p><div className="contact-details">{[[Mail,'Email',company.email],[Phone,'Phone','[Company phone number]'],[MapPin,'Location','[Company address]']].map(([I,t,d])=>{const Icon=I as typeof Mail;return <div key={String(t)}><Icon size={20}/><div><h3>{String(t)}</h3><p>{t==='Email'?<a className="text-link" href={"mailto:"+company.email}>{company.email}</a>:String(d)}</p></div></div>})}</div><div className="consultation-box"><h3>Not sure which service you need?</h3><p>Select Free Consultation in the form. We’ll start with your goals.</p></div></aside><ContactForm intent={value("intent")} requestedService={value("service")} requestedIndustry={value("industry")} submitted={value("submitted")==="1"}/></section></>}
