import {PageHero,CTA} from '@/components/Site';
import ServicesExplorer from '@/components/ServicesExplorer';
export const metadata={title:'Services',description:'Explore software, web, IT consulting, AI, hardware, networking, training, e-commerce and engineering software services.'};
export default function Services(){return <><PageHero label="WHAT WE DO" title="Technology solutions, built around your needs." description="A complete range of IT services to help you build, connect, operate, and grow."/><section className="section container"><ServicesExplorer/><div className="service-note"><h3>Not sure where to start?</h3><p>Describe the problem you want to solve. We can help you identify the right service during a free consultation.</p></div></section><CTA/></>}
