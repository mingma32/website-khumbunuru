
import {notFound} from 'next/navigation';
import {Check,Building2} from 'lucide-react';
import {services} from '@/lib/content';
import {serviceDetails} from '@/lib/serviceDetails';
import {PageHero,ServiceCard} from '@/components/Site';

export function generateStaticParams(){return services.map(service=>({slug:service.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const service=services.find(item=>item.id===slug);
  return {title:service?.title??'Service not found',description:service?.description};
}
export default async function ServiceDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const service=services.find(item=>item.id===slug);const detail=serviceDetails[slug];
  if(!service || !detail)notFound();
  const Icon=service.icon;
  const inquiry='/contact?service='+encodeURIComponent(service.title)+'#inquiry-form';
  return <>
    <PageHero label="EXPLORE THE SERVICE" title={service.title} description={detail.overview}/>
    <section className="section container service-detail">
      <a href="/services" className="text-link">All services</a>
      <div className="detail-intro"><div><span className={'icon-box service-icon tone-'+service.id}><Icon size={26}/></span><h2>What we can help you plan.</h2><ul className="detail-checklist">{detail.areas.map(area=><li key={area}><Check size={20} aria-hidden="true"/><span>{area}</span></li>)}</ul></div><aside className="project-panel"><p className="eyebrow">START WITH YOUR NEEDS</p><h3>Have a project in mind?</h3><p>Tell us about your sector, the problem you want to solve, and the people who will use the solution.</p><a href={inquiry} className="button primary">Discuss this service</a><p className="project-note">We’ll agree on the scope, requirements, and next steps together.</p></aside></div>
      <div className="section-heading"><div><p className="eyebrow">SOLUTIONS FOR YOUR SECTOR</p><h2>Different needs.<br/>Practical possibilities.</h2></div><p>Examples to help start a conversation. The final solution depends on your project and requirements.</p></div>
      <div className="sector-grid">{detail.sectors.map(sector=><article className="sector-card" key={sector.name}><Building2 size={24} aria-hidden="true"/><h3>{sector.name}</h3><p>{sector.example}</p><a className="text-link" href={'/contact?service='+encodeURIComponent(service.title)+'&industry='+encodeURIComponent(sector.name)+'#inquiry-form'}>Discuss a project in this sector</a></article>)}</div>
      <div className="service-note"><h3>A clear next step</h3><p>Share what you want to achieve. We’ll discuss the right approach, design, platforms, and support needs before implementation.</p></div>
      <div className="button-row"><a href={inquiry} className="button primary">Request a consultation about {service.title}</a></div>
    </section>
    {detail.related.length>0 && <section className="section container related-services"><p className="eyebrow">RELATED SUPPORT</p><h2>Bring the pieces together.</h2><div className="service-grid services-page">{detail.related.map(id=>{const related=services.find(item=>item.id===id);return related?<ServiceCard key={id} service={related}/>:null;})}</div></section>}
  </>;
}
