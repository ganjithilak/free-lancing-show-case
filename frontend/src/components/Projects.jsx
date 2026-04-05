import React from 'react';

const FALLBACK_PROJECTS = [
  { _id: '1', title: 'Sales Analytics Dashboard', category: 'Business Intelligence', description: 'Interactive Power BI dashboard tracking $2M+ in sales across 12 regions with real-time KPI monitoring and automated reports.', technologies: ['Power BI','DAX','SQL Server','Excel'], metrics: { value1: '$2M+', label1: 'Revenue Tracked', value2: '12', label2: 'Regions' } },
  { _id: '2', title: 'E-Commerce Full-Stack App', category: 'Web Development', description: 'Full-stack web application with React frontend and Node.js backend, featuring user authentication, product CRUD, and payment integration.', technologies: ['React','Node.js','Express','MongoDB'], metrics: { value1: '99.9%', label1: 'Uptime', value2: '500+', label2: 'Users' } },
  { _id: '3', title: 'Financial Forecast Model', category: 'Financial Modelling', description: 'DCF valuation and 3-year revenue forecast model for an Australian startup used to secure seed funding.', technologies: ['Excel','VBA','Python','Matplotlib'], metrics: { value1: '$150K', label1: 'Funding Secured', value2: '94%', label2: 'Accuracy' } }
];

export default function Projects({ projects }) {
  const displayProjects = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <section id="work" style={{ padding: '6rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// Selected Work</span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-1px' }}>Featured <span style={{ color: 'var(--text-dim)' }}>Projects</span></h2>
      </div>
      {displayProjects.map((p, i) => (
        <div key={p._id} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', padding: '3rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', transition: 'all 0.4s', alignItems: 'center', direction: i % 2 === 1 ? 'rtl' : 'ltr' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <div style={{ direction: 'ltr', aspectRatio: '16/10', borderRadius: '16px', overflow: 'hidden', background: `linear-gradient(135deg,${i===0?'#1a1a2e,#16213e':i===1?'#0f3460,#533483':'#1b1b2f,#162447'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.15)', letterSpacing: '-2px' }}>
            {p.title.split(' ').map(w => w[0]).join('').substring(0, 3)}
          </div>
          <div style={{ direction: 'ltr' }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{p.category}</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.8rem 0' }}>{p.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1rem' }}>{p.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {(p.technologies || []).map(t => <span key={t} style={{ padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.2)', color: 'var(--accent2)', fontWeight: 500 }}>{t}</span>)}
            </div>
            {p.metrics && (
              <div style={{ display: 'flex', gap: '2rem' }}>
                {p.metrics.value1 && <div><div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{p.metrics.value1}</div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.metrics.label1}</div></div>}
                {p.metrics.value2 && <div><div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{p.metrics.value2}</div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.metrics.label2}</div></div>}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
