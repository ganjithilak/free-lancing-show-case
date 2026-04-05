import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: scrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)', transition: 'all 0.3s' }}>
      <Link to="/" style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
        TG<span style={{ color: 'var(--accent)' }}>.</span>
      </Link>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        {['about', 'skills', 'work', 'contact'].map(s => (
          <li key={s}>
            <a href={`#${s}`} style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
              {s}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {user && (
          <Link to="/dashboard" style={{ padding: '0.5rem 1rem', border: '1px solid var(--glass-border)', borderRadius: '100px', fontSize: '0.8rem', color: 'var(--text-dim)', transition: 'all 0.3s' }}>Dashboard</Link>
        )}
        <a href="#contact" style={{ padding: '0.6rem 1.4rem', background: 'var(--accent)', color: 'var(--bg)', borderRadius: '100px', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.3s' }}
          onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 30px rgba(0,229,160,0.3)'; }}
          onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}>
          Let's Talk
        </a>
      </div>
    </nav>
  );
}
