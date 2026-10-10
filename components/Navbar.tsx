'use client';
import ConsultationLink from '@/components/ConsultationLink';
import BrandLogo from '@/components/BrandLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const path = usePathname();
  const links = <>
    {['Home','About','Services','Blog','Contact'].map(label => {
      const href = label === 'Home' ? '/' : '/' + label.toLowerCase();
      const active = href === '/' ? path === href : path === href || path.startsWith(href + '/');
      return <a key={label} href={href} aria-current={active ? 'page' : undefined}>{label}</a>;
    })}
    <ConsultationLink className="button primary nav-cta" />
  </>;
  return <header className="site-header"><div className="container nav-row">
    <a className="wordmark" href="/" aria-label="Khumbu Nuru I.T. Services home"><BrandLogo/></a>
    <nav aria-label="Main navigation" className="navigation desktop-navigation">{links}</nav>
    <div className="header-controls"><ThemeToggle/>
      <details className="mobile-navigation">
        <summary className="menu-button" aria-label="Toggle navigation"><Menu className="menu-open" aria-hidden="true"/><X className="menu-close" aria-hidden="true"/><span className="sr-only">Menu</span></summary>
        <nav aria-label="Mobile navigation" className="navigation">{links}</nav>
      </details>
    </div>
  </div></header>;
}
