import { company, socialProfiles } from '@/lib/content';

function SocialIcon({platform}:{platform:(typeof socialProfiles)[number]['platform']}) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {platform==='facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
    {platform==='instagram' && <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>}
    {platform==='linkedin' && <><rect x="3" y="9" width="4" height="12"/><circle cx="5" cy="4" r="2"/><path d="M11 21V9h4v2c1-3 6-3 6 2v8h-4v-7c0-2-2-2-2 0v7z"/></>}
    {platform==='youtube' && <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></>}
  </svg>;
}
export default function SocialLinks() {
  const profiles = socialProfiles.filter(profile => profile.url);
  return <div className="footer-social"><h3>Connect with us</h3><div className="social-links">
    <a className="social-link" href={'mailto:'+company.email} aria-label="Email Khumbu Nuru" title="Email us"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg></a>
    {profiles.map(profile => <a key={profile.platform} className="social-link" href={profile.url!} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} (opens in a new tab)`} title={profile.name}><SocialIcon platform={profile.platform}/></a>)}
  </div><a className="text-link" href="/contact#inquiry-form">Send us a message →</a></div>;
}
