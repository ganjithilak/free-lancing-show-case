import React from 'react';

const testimonials = [
  { text: "Thilak delivered our Power BI dashboard on time and exceeded expectations. The DAX measures he wrote were incredibly optimised.", name: "Sarah Mitchell", role: "CFO, RetailCo AU", rating: 5 },
  { text: "Exceptional Python work. He built our ETL pipeline from scratch and it's been running flawlessly for 8 months.", name: "James Park", role: "CTO, DataStart UK", rating: 5 },
  { text: "The best freelancer I've worked with on Fiverr. Delivered a full React + Node.js app in under 2 weeks.", name: "Priya Sharma", role: "Founder, TechVenture IN", rating: 5 }
];

export default function Testimonials() {
  return (
    <section id="reviews" style={{ padding: '6rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// Client Feedback</span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-1px' }}>What Clients <span style={{ color: 'var(--text-dim)' }}>Say</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.5rem' }}>
        {testimonials.map((t, i) => (
          <div key={i} className="reveal" style={{ padding: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '16px', position: 'relative', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}>
            <span style={{ fontSize: '4rem', color: 'var(--accent)', opacity: 0.2, position: 'absolute', top: '1rem', right: '1.5rem', lineHeight: 1, fontFamily: 'Georgia,serif' }}>"</span>
            <div style={{ color: '#fbbf24', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '2px' }}>{'★'.repeat(t.rating)}</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg,var(--accent${i===1?'2':i===2?'3':''}),var(--accent))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: 'var(--bg)' }}>{t.name[0]}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
