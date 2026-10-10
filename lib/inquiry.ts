export type Inquiry={name:string;company:string;email:string;phone:string;service:string;industry:string;projectType:string;message:string};
export function parseInquiry(value:unknown,allowedServices:readonly string[]):Inquiry|null {
  if(!value || typeof value!=='object' || Array.isArray(value))return null;
  const raw=value as Record<string,unknown>;
  if(raw._honey)return null;
  const limits={name:120,company:160,email:254,phone:40,service:120,industry:120,projectType:160,message:5000};
  const fields={} as Inquiry;
  for(const key of Object.keys(limits) as (keyof Inquiry)[]){
    const val=raw[key]??'';
    if(typeof val!=='string' || val.length>limits[key])return null;
    fields[key]=val.trim();
  }
  if(!fields.name || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))return null;
  if(!allowedServices.includes(fields.service))return null;
  return fields;
}
/** Opens a draft only. The visitor must press Send in their email app. */
export function buildInquiryMailto(fields:Record<string,string>,recipient:string):string {
  const subject=fields.service==='Free Consultation'?'Free consultation request — Khumbu Nuru I.T. Services':'Website inquiry — '+(fields.service||'General inquiry');
  const labels:Record<string,string>={name:'Name',company:'Company',email:'Reply email',phone:'Phone',service:'Service',industry:'Industry / sector',projectType:'Project type',message:'Message'};
  const body=Object.entries(labels).map(([key,label])=>label+': '+(fields[key]?.trim()||'Not provided')).join('\n\n');
  return 'mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}

export type InquirySubmission='accepted'|'activation-required';
/** Use FormSubmit's cross-origin AJAX endpoint without navigating the iframe. */
export async function submitInquiry(fields:Inquiry,config:{recipient:string;siteUrl:string},fetcher:typeof fetch=fetch):Promise<InquirySubmission>{
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),25000);
  try{
    const response=await fetcher('https://formsubmit.co/ajax/'+config.recipient,{
      method:'POST',mode:'cors',credentials:'omit',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      signal:controller.signal,
      body:JSON.stringify({...fields,
        _subject:fields.service==='Free Consultation'?'Free consultation request — Khumbu Nuru I.T. Services':'Website inquiry — Khumbu Nuru I.T. Services — '+fields.service,
        _replyto:fields.email,_template:'table',_url:config.siteUrl+'/contact'
      })
    });
    if(!response.ok)throw new Error('Submission was not confirmed.');
    const data:unknown=await response.json();
    if(!data || typeof data!=='object')throw new Error('Submission was not confirmed.');
    const result=data as {success?:unknown;message?:unknown};
    if(typeof result.message==='string' && /activat|confirm.{0,40}email|verif.{0,40}email/i.test(result.message))return 'activation-required';
    if(result.success!==true && result.success!=='true')throw new Error('Submission was not confirmed.');
    return 'accepted';
  }finally{clearTimeout(timeout);}
}
