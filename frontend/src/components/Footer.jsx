import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '3rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
      <p>© {new Date().getFullYear()} Thilak Ganji · Built with React + Node.js + MongoDB · Deployed on AWS EC2</p>
      <p style={{ marginTop: '0.5rem' }}>
        <a href="https://github.com/ganjithilak/free-lancing-show-case" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', marginRight: '1rem' }}>GitHub</a>
        <a href="/login" style={{ color: 'var(--text-muted)' }}>Admin</a>
      </p>
    </footer>
  );
}
