import {PageHero,CTA} from '@/components/Site';
import BlogList from '@/components/BlogList';
export const metadata={title:'Blog',description:'Practical perspectives on technology, AI, software, websites and digital business.'};
export default function Blog(){return <><PageHero label="IDEAS & INSIGHTS" title="A clearer view of technology." description="Practical perspectives on IT, AI, software, and the digital tools that help businesses move forward."/><section className="section container"><BlogList/></section><CTA/></>}
