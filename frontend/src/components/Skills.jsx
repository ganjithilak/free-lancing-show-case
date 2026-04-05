import React from 'react';

const skills = [
  { icon: '📊', title: 'Business Intelligence', desc: 'Interactive dashboards & reports in Power BI and Tableau. DAX formulas, data modelling, KPI tracking, and automated refreshes.', level: 95, color: 'green' },
  { icon: '🐍', title: 'Python & Data Analysis', desc: 'Pandas, NumPy, Matplotlib, Seaborn. Web scraping, ETL pipelines, statistical analysis, and automation scripts.', level: 90, color: 'green' },
  { icon: '🗃️', title: 'SQL & Database Design', desc: 'Complex queries, stored procedures, database optimisation. MySQL, PostgreSQL, SQL Server, and MongoDB.', level: 92, color: 'purple' },
  { icon: '🌐', title: 'Full-Stack Web Dev', desc: 'React, Node.js, Express, HTML/CSS/JS. REST APIs, responsive design, e-commerce platforms, and portfolio sites.', level: 88, color: 'purple' },
  { icon: '💰', title: 'Financial Modelling', desc: 'Revenue forecasts, DCF valuations, scenario analysis, and investor-ready spreadsheets in Excel with VBA automation.', level: 85, color: 'green' },
  { icon: '📑', title: 'Research & Reports', desc: 'Academic writing, case study analysis, market research, and professional presentation design for business contexts.', level: 93, color: 'purple' }
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// What I Do</span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-1px' }}>Services <span style={{ color: 'var(--text-dim)' }}>& Expertise</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
        {skills.map(s => (
          <div key={s.title} className="reveal" style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '16px', transition: 'all 0.4s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.icon}</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{s.title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{s.desc}</p>
            <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '2px', width: `${s.level}%`, background: s.color === 'green' ? 'var(--accent)' : 'var(--accent2)', transition: 'width 1s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
