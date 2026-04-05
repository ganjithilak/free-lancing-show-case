import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/projects';

const CATEGORIES = ['Business Intelligence', 'Data Analysis', 'Web Development', 'Financial Modelling', 'Machine Learning', 'Other'];
const EMPTY_FORM = { title: '', category: 'Web Development', description: '', technologies: '', githubUrl: '', liveUrl: '', featured: false };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => fetchProjects().then(setProjects).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const payload = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean) };
      if (editId) {
        await updateProject(editId, payload);
        setMsg('Project updated!');
      } else {
        await createProject(payload);
        setMsg('Project created!');
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      load();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({ ...p, technologies: (p.technologies || []).join(', ') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await deleteProject(id);
    load();
  };

  const card = { padding: '1.5rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '16px', marginBottom: '1rem' };
  const input = { width: '100%', padding: '0.65rem 0.9rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'var(--font-display)', marginTop: '0.3rem' };
  const label = { display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Welcome, {user?.name}</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '0.6rem 1.4rem', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '100px', color: 'var(--text-dim)', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Project Form */}
      <div style={card}>
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>{editId ? 'Edit Project' : 'Add New Project'}</h2>
        {msg && <div style={{ marginBottom: '1rem', padding: '0.75rem', background: msg.includes('Error') ? 'rgba(255,107,107,0.1)' : 'rgba(0,229,160,0.1)', border: `1px solid ${msg.includes('Error') ? 'rgba(255,107,107,0.3)' : 'rgba(0,229,160,0.3)'}`, borderRadius: '8px', fontSize: '0.85rem', color: msg.includes('Error') ? 'var(--accent3)' : 'var(--accent)' }}>{msg}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={label}>Title *</label>
            <input style={input} value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>
          <div>
            <label style={label}>Category *</label>
            <select style={input} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={label}>Description *</label>
            <textarea style={{...input, minHeight: '80px', resize: 'vertical'}} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={label}>Technologies (comma separated)</label>
            <input style={input} value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} placeholder="React, Node.js, MongoDB" />
          </div>
          <div>
            <label style={label}>GitHub URL</label>
            <input style={input} type="url" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} />
          </div>
          <div>
            <label style={label}>Live URL</label>
            <input style={input} type="url" value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} />
          </div>
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
              Featured project
            </label>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              {editId && <button type="button" onClick={() => { setEditId(null); setForm(EMPTY_FORM); }} style={{ padding: '0.6rem 1.2rem', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '100px', color: 'var(--text-dim)', cursor: 'pointer' }}>Cancel</button>}
              <button type="submit" disabled={loading} style={{ padding: '0.6rem 1.4rem', background: 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: '100px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Saving...' : editId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <h2 style={{ marginBottom: '1rem', fontWeight: 700 }}>All Projects ({projects.length})</h2>
      {projects.map(p => (
        <div key={p._id} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <h4 style={{ fontWeight: 600 }}>{p.title}</h4>
              {p.featured && <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', borderRadius: '100px', color: 'var(--accent)' }}>FEATURED</span>}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>{p.category}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{p.description.substring(0, 100)}...</p>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {(p.technologies || []).map(t => <span key={t} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.2)', borderRadius: '100px', color: 'var(--accent2)' }}>{t}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', flexShrink: 0 }}>
            <button onClick={() => handleEdit(p)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
            <button onClick={() => handleDelete(p._id)} style={{ padding: '0.5rem 1rem', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px', color: 'var(--accent3)', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
