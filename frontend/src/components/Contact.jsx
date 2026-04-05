import React, { useState } from 'react';
import { submitContact } from '../api/projects';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text)', fontSize: '0.95rem', fontFamily: 'var(--font-display)', outline: 'none', marginTop: '0.3rem' };

  return (
    <section id="contact" style={{ padding: '6rem 3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div className="reveal" style={{ marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// Get In Touch</span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-1px' }}>Let's Work <span style={{ color: 'var(--text-dim)' }}>Together</span></h2>
      </div>
      <div className="reveal" style={{ padding: '3rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', textAlign: 'left' }}>
        {status === 'success' && <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', borderRadius: '8px', color: 'var(--accent)', textAlign: 'center' }}>Message sent! I'll be in touch soon.</div>}
        {status === 'error' && <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px', color: 'var(--accent3)', textAlign: 'center' }}>Something went wrong. Please try again.</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}>Name</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}>Email</label>
              <input type="email" style={inputStyle} value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}>Message</label>
            <textarea style={{...inputStyle, minHeight: '120px', resize: 'vertical'}} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '1rem 2rem', background: loading ? 'rgba(0,229,160,0.5)' : 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: '100px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', justifySelf: 'start' }}>
            {loading ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {[['📧','thilakganji@gmail.com','mailto:thilakganji@gmail.com'],['💼','Upwork','https://upwork.com'],['🐙','GitHub','https://github.com/ganjithilak'],['📍','Toowoomba, QLD',null]].map(([icon,label,href]) => (
            href ? <a key={label} href={href} target="_blank" rel="noreferrer" style={{ padding: '0.8rem 1.5rem', borderRadius: '100px', background: 'var(--glass)', border: '1px solid var(--glass-border)', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'inherit'; }}>
              {icon} {label}
            </a> : <span key={label} style={{ padding: '0.8rem 1.5rem', borderRadius: '100px', background: 'var(--glass)', border: '1px solid var(--glass-border)', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{icon} {label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
