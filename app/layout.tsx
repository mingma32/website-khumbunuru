import type { Metadata } from 'next';
import './globals.css';
import './brand.css';
import Navbar from '@/components/Navbar';
import ScrollExperience from '@/components/ScrollExperience';
import {Footer} from '@/components/Site';
export const metadata:Metadata={title:{default:'Khumbu Nuru I.T. Services | Smart IT & Digital Solutions',template:'%s | Khumbu Nuru I.T. Services'},description:'Software, websites, IT consulting, hardware, networking, training, AI and digital growth solutions for businesses and organizations.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('khumbu-nuru-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.classList.toggle('dark',d)}catch(e){}`}}/></head><body><a className="skip-link" href="#main-content">Skip to content</a><Navbar/><ScrollExperience/><main id="main-content" tabIndex={-1}>{children}</main><Footer/></body></html>}
