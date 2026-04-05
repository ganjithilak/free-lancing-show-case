import React from 'react';

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem', display: 'block', fontFamily: 'var(--font-mono)' }}>// Who I Am</span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-1px' }}>Data Nerd. <span style={{ color: 'var(--text-dim)' }}>Code Lover.</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
        <div className="reveal" style={{ position: 'relative', aspectRatio: '1', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg,var(--accent2),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '8rem', fontWeight: 900, color: 'rgba(0,0,0,0.2)', letterSpacing: '-4px' }}>TG</span>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', padding: '0.6rem 1.2rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderRadius: '100px', fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>
            📍 Toowoomba, QLD
          </div>
        </div>
        <div className="reveal">
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>I make numbers talk and pixels dance.</h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: '1rem', fontSize: '0.95rem' }}>I'm Thilak Ganji — a Master of Information Systems student at Holmes Institute Brisbane, originally from India. I bring a unique blend of data analytics, business intelligence, and full-stack web development to the table.</p>
          <p style={{ color: 'var(--text-dim)', marginBottom: '1rem', fontSize: '0.95rem' }}>With a Bachelor of Computer Science from Osmania University and 84+ freelance projects under my belt, I've helped startups, SMEs, and enterprises across Australia, India, the US, and the UK transform their data into actionable insights.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
            {['Power BI','SQL','Python','React','Node.js','Tableau','DAX','Excel/VBA','MongoDB','Financial Models'].map(t => (
              <span key={t} style={{ padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.78rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--text-dim)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
