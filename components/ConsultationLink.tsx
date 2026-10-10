import { company } from '@/lib/content';

// Native navigation keeps this action usable before hydration.
export default function ConsultationLink({className,children='Book a Free Consultation'}:{className?:string;children?:React.ReactNode}) {
  return <a href={company.consultation} className={className}>{children}</a>;
}
