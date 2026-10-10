'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';

const revealSelector = '.section-heading, .service-card, .why-item, .process, .industry-grid > div, .mission-grid article, .values-grid > div, .founder, .objectives, .blog-card, .cta, .contact-grid aside, .contact-form, .sector-card, .project-panel';

export default function ScrollExperience() {
  const path = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0})`;
      setShowTop(window.scrollY > 600);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [path]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = new Set<HTMLElement>();
    let intersection: IntersectionObserver | undefined;
    let mutation: MutationObserver | undefined;
    const clean = () => {
      intersection?.disconnect();
      mutation?.disconnect();
      elements.forEach(el => {
        el.classList.remove('reveal-pending', 'reveal-visible');
        el.style.removeProperty('--reveal-delay');
      });
      elements.clear();
    };
    const setup = () => {
      clean();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      intersection = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove('reveal-pending');
            el.classList.add('reveal-visible');
            el.addEventListener('animationend', () => el.classList.remove('reveal-visible'), { once: true });
            intersection?.unobserve(el);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px 24px 0px' });
      const discover = () => {
        document.querySelectorAll<HTMLElement>(revealSelector).forEach(el => {
          if (elements.has(el)) return;
          elements.add(el);
          // Only animate content below the viewport; initial content never waits for JS.
          if (el.getBoundingClientRect().top < window.innerHeight - 20) return;
          const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
          el.style.setProperty('--reveal-delay', `${Math.max(0, siblings.indexOf(el) % 4) * 55}ms`);
          el.classList.add('reveal-pending');
          intersection?.observe(el);
        });
      };
      discover();
      mutation = new MutationObserver(discover);
      mutation.observe(document.getElementById('main-content')!, { childList: true, subtree: true });
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { clean(); preference.removeEventListener('change', setup); };
  }, [path]);

  return <>
    <div className="scroll-progress" aria-hidden="true"><div ref={progress} /></div>
    {showTop && <button className="back-to-top" aria-label="Back to top" title="Back to top" onClick={() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
      const main = document.getElementById('main-content');
      main?.focus({ preventScroll: true });
    }}><ChevronUp size={22} /><span>Top</span></button>}
  </>;
}
