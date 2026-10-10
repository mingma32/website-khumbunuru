'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const storageKey = 'khumbu-nuru-theme';
function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', dark);
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(storageKey); } catch {}
      const next = saved === 'dark' || (saved !== 'light' && system.matches);
      applyTheme(next);
      setDark(next);
    };
    sync();
    system.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => {
      system.removeEventListener('change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return <label className="theme-toggle" htmlFor="night-mode" title="Day / night appearance">
    <Sun size={16} aria-hidden="true" />
    <Switch id="night-mode" className="theme-switch" checked={dark} aria-label="Night mode" onCheckedChange={next => {
      setDark(next);
      applyTheme(next);
      try { localStorage.setItem(storageKey, next ? 'dark' : 'light'); } catch {}
    }} />
    <Moon size={16} aria-hidden="true" />
  </label>;
}
