'use client';
import ConsultationLink from '@/components/ConsultationLink';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { services } from '@/lib/content';
import {serviceDetails} from '@/lib/serviceDetails';
import { ServiceCard } from '@/components/Site';

export default function ServicesExplorer() {
  const [query, setQuery] = useState('');
  const filtered = services.filter(s => `${s.title} ${s.description} ${serviceDetails[s.id]?.areas.join(" ")} ${serviceDetails[s.id]?.sectors.map(item=>item.name+" "+item.example).join(" ")} ${serviceDetails[s.id]?.projectTypes.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="service-search-row">
      <div><label htmlFor="service-search">Find the support you need</label><p>Search by service or what you want to do.</p></div>
      <div className="service-search"><Search size={20} aria-hidden="true" /><input id="service-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try websites, training, or networking" autoComplete="off" />{query && <button onClick={() => setQuery('')} aria-label="Clear service search"><X size={18} /></button>}</div>
    </div>
    <p className="search-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'service' : 'services'}{query.trim() ? ` matching “${query.trim()}”` : ' to explore'}</p>
    <div className="service-grid services-page">{filtered.map(s => <ServiceCard key={s.id} service={s} index={services.indexOf(s)} />)}</div>
    {!filtered.length && <div className="search-empty"><h3>No services match that search.</h3><p>Try a broader term, or tell us what you need in a free consultation.</p><div className="button-row"><button className="button secondary" onClick={() => setQuery('')}>Show all services</button><ConsultationLink className="button primary" >Book a Free Consultation</ConsultationLink></div></div>}
  </>;
}
