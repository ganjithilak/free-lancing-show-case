import React from 'react';

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '8rem 3rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--accent)', filter: 'blur(120px)', opacity: 0.15, top: '-200px', right: '-100px', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--accent2)', filter: 'blur(120px)', opacity: 0.15, bottom: '-100px', left: '-100px', animation: 'float 8s ease-in-out infinite', animationDelay: '3s' }} />
      <style>{`@keyframes float { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-30px) scale(1.1)} } @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} } .reveal{opacity:0;transform:translateY(40px);transition:all 0.8s cubic-bezier(0.16,1,0.3,1)} .reveal.visible{opacity:1;transform:translateY(0)}`}</style>
      <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '100px', background: 'var(--glass)', border: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '2rem', animation: 'fadeUp 0.8s ease both' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Available for Projects
        </div>
        <h1 style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', animation: 'fadeUp 0.8s ease 0.1s both' }}>
          I turn raw data<br />into <span style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>business gold.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '600px', margin: '1.5rem 0 2.5rem', fontWeight: 300, lineHeight: 1.7, animation: 'fadeUp 0.8s ease 0.2s both' }}>
          Freelance Data Analyst, BI Developer & Full-Stack Web Developer based in Queensland, Australia — with 80+ projects delivered across 4 continents.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp 0.8s ease 0.3s both' }}>
          <a href="#work" style={{ padding: '0.9rem 2rem', background: 'var(--accent)', color: 'var(--bg)', borderRadius: '100px', fontWeight: 700, fontSize: '0.95rem', transition: 'all 0.3s' }}>View My Work</a>
          <a href="#contact" style={{ padding: '0.9rem 2rem', background: 'transparent', color: 'var(--text)', border: '1px solid var(--glass-border)', borderRadius: '100px', fontWeight: 500, fontSize: '0.95rem', transition: 'all 0.3s' }}>Get a Quote</a>
        </div>
      </div>
    </section>
  );
}
