import { Code2, Network, Sparkles, GraduationCap, Layers } from 'lucide-react';

export default function TechnologyMap() {
  return <div className="technology-map hero-visual">
    <div className="map-heading"><span className="eyebrow">CONNECTED POSSIBILITIES</span><span className="map-caption">Your technology, together.</span></div>
    <svg viewBox="0 0 520 400" className="map-diagram" role="img" aria-labelledby="technology-map-title technology-map-description">
      <title id="technology-map-title">A connected approach to your business technology</title>
      <desc id="technology-map-description">Software and web development, hardware and networks, AI and digital growth, and training connect to your business at the center.</desc>
      <g className="map-paths" fill="none" strokeWidth="2"><path d="M120 100C120 200 260 115 260 200"/><path d="M400 100C400 200 260 115 260 200"/><path d="M120 300C120 200 260 285 260 200"/><path d="M400 300C400 200 260 285 260 200"/></g>
      <g className="map-signals" fill="none" strokeWidth="3" aria-hidden="true"><path d="M120 100C120 200 260 115 260 200"/><path d="M400 100C400 200 260 115 260 200"/><path d="M120 300C120 200 260 285 260 200"/><path d="M400 300C400 200 260 285 260 200"/></g>
      <g className="map-node node-software"><rect x="30" y="40" width="180" height="110" rx="16"/><Code2 x={103} y={57} width={34} height={34}/><text x="120" y="113" textAnchor="middle">Software & web</text><text className="map-small" x="120" y="135" textAnchor="middle">Build useful tools</text></g>
      <g className="map-node node-infrastructure"><rect x="310" y="40" width="180" height="110" rx="16"/><Network x={383} y={57} width={34} height={34}/><text x="400" y="113" textAnchor="middle">Hardware & networks</text><text className="map-small" x="400" y="135" textAnchor="middle">Connect your systems</text></g>
      <g className="map-node node-growth"><rect x="30" y="250" width="180" height="110" rx="16"/><Sparkles x={103} y={267} width={34} height={34}/><text x="120" y="323" textAnchor="middle">AI & digital growth</text><text className="map-small" x="120" y="345" textAnchor="middle">Put ideas to work</text></g>
      <g className="map-node node-learning"><rect x="310" y="250" width="180" height="110" rx="16"/><GraduationCap x={383} y={267} width={34} height={34}/><text x="400" y="323" textAnchor="middle">Consulting & training</text><text className="map-small" x="400" y="345" textAnchor="middle">Make informed choices</text></g>
      <g className="map-center"><rect x="190" y="163" width="140" height="74" rx="18"/><text x="260" y="195" textAnchor="middle">Your business</text><text className="map-small" x="260" y="218" textAnchor="middle">At the center</text></g>
    </svg>
    <div className="map-mobile" role="group" aria-label="Connected technology services">
      <div><Code2 size={25} aria-hidden="true"/><strong>Software & web</strong></div>
      <div><Network size={25} aria-hidden="true"/><strong>Hardware & networks</strong></div>
      <div className="map-mobile-center"><strong>Your business</strong><span>At the center</span></div>
      <div><Sparkles size={25} aria-hidden="true"/><strong>AI & digital growth</strong></div>
      <div><GraduationCap size={25} aria-hidden="true"/><strong>Consulting & training</strong></div>
    </div>
    <div className="map-footnote"><Layers size={20} aria-hidden="true"/><span>One connected approach.<br/><strong>Solutions built around your needs.</strong></span></div>
  </div>;
}
