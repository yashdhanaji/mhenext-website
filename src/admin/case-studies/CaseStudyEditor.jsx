import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

const EMPTY_CS = {
  slug: '', title: '', client: '', industry: '', location: '',
  duration: '', year: '', thumbnail: '', heroImage: '',
  gallery: '', excerpt: '', tags: '', equipment: '',
  challenge: '', solution: '', results: '', published: 'FALSE',
};

export default function CaseStudyEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = !slug;

  const [cs, setCs] = useState(EMPTY_CS);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isNew) return;
    async function load() {
      try {
        const res = await fetch('/api/case-studies');
        const data = await res.json();
        const found = data.caseStudies?.find((c) => c.slug === slug);
        if (!found) { setError('Case study not found'); return; }
        const { stats: foundStats, ...meta } = found;
        setCs(meta);
        setStats((foundStats || []).map((s, i) => ({ ...s, _id: i })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, isNew]);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!cs.slug.trim()) { alert('Slug is required'); return; }
    setSaving(true);
    setError(null);
    try {
      const body = {
        caseStudy: cs,
        stats: stats.map((s) => {
          const { _id: _ID, ...rest } = s;
          return rest;
        }),
      };
      const res = isNew
        ? await fetch('/api/case-studies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch(`/api/case-studies/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || `HTTP ${res.status}`);
      }
      showToast('Saved!');
      if (isNew) navigate(`/admin/case-studies/${cs.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function setField(field, value) {
    setCs((c) => ({ ...c, [field]: value }));
  }

  function addStat() {
    setStats((s) => [...s, { value: '', label: '', _id: Date.now() }]);
  }

  function removeStat(idx) {
    setStats((s) => s.filter((_, i) => i !== idx));
  }

  function updateStat(idx, field, value) {
    setStats((s) => s.map((stat, i) => i === idx ? { ...stat, [field]: value } : stat));
  }

  if (loading) return <div className="admin-loading">Loading case study…</div>;

  return (
    <>
      <Link to="/admin/case-studies" className="admin-back-link">
        <ArrowLeft size={14} /> Back to Case Studies
      </Link>

      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-page-title">{isNew ? 'New Case Study' : 'Edit Case Study'}</h1>
          {!isNew && <p className="admin-page-subtitle">/{slug}</p>}
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <form className="admin-form" onSubmit={handleSave}>
        {/* Identity */}
        <div className="admin-card">
          <p className="admin-section-title">Identity</p>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Slug <span className="required">*</span></label>
              <input
                className="form-input"
                value={cs.slug}
                onChange={(e) => setField('slug', e.target.value)}
                placeholder="ecommerce-fulfillment-automation"
                disabled={!isNew}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Title</label>
              <input className="form-input" value={cs.title} onChange={(e) => setField('title', e.target.value)} />
            </div>

            <div className="form-field">
              <label className="form-label">Client</label>
              <input className="form-input" value={cs.client} onChange={(e) => setField('client', e.target.value)} placeholder="FlipMart Logistics" />
            </div>
            <div className="form-field">
              <label className="form-label">Industry</label>
              <input className="form-input" value={cs.industry} onChange={(e) => setField('industry', e.target.value)} placeholder="E-commerce" />
            </div>

            <div className="form-field">
              <label className="form-label">Location</label>
              <input className="form-input" value={cs.location} onChange={(e) => setField('location', e.target.value)} placeholder="Mumbai, India" />
            </div>
            <div className="form-field">
              <label className="form-label">Duration</label>
              <input className="form-input" value={cs.duration} onChange={(e) => setField('duration', e.target.value)} placeholder="6 months" />
            </div>

            <div className="form-field">
              <label className="form-label">Year</label>
              <input className="form-input" value={cs.year} onChange={(e) => setField('year', e.target.value)} placeholder="2024" />
            </div>

            <div className="form-field full-width">
              <label className="form-label">Excerpt</label>
              <textarea className="form-textarea" value={cs.excerpt} onChange={(e) => setField('excerpt', e.target.value)} rows={2} />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="admin-card">
          <p className="admin-section-title">Media</p>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Thumbnail URL</label>
              <input className="form-input" value={cs.thumbnail} onChange={(e) => setField('thumbnail', e.target.value)} placeholder="https://…" />
            </div>
            <div className="form-field">
              <label className="form-label">Hero Image URL</label>
              <input className="form-input" value={cs.heroImage} onChange={(e) => setField('heroImage', e.target.value)} placeholder="https://…" />
            </div>
            <div className="form-field full-width">
              <label className="form-label">Gallery URLs</label>
              <input className="form-input" value={cs.gallery} onChange={(e) => setField('gallery', e.target.value)} placeholder="https://…, https://…" />
              <span className="form-hint">Comma-separated image URLs</span>
            </div>
          </div>
        </div>

        {/* Tags & Equipment */}
        <div className="admin-card">
          <p className="admin-section-title">Tags & Equipment</p>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Tags</label>
              <input className="form-input" value={cs.tags} onChange={(e) => setField('tags', e.target.value)} placeholder="E-commerce, Automation, Warehouse" />
              <span className="form-hint">Comma-separated</span>
            </div>
            <div className="form-field">
              <label className="form-label">Equipment Used</label>
              <input className="form-input" value={cs.equipment} onChange={(e) => setField('equipment', e.target.value)} placeholder="Electric Forklift 2T, Three Wheel Electric Forklift" />
              <span className="form-hint">Comma-separated</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-card">
          <p className="admin-section-title">Content</p>
          <div className="admin-form">
            <div className="form-field">
              <label className="form-label">Challenge</label>
              <textarea className="form-textarea tall" value={cs.challenge} onChange={(e) => setField('challenge', e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Solution</label>
              <textarea className="form-textarea tall" value={cs.solution} onChange={(e) => setField('solution', e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Results</label>
              <textarea className="form-textarea tall" value={cs.results} onChange={(e) => setField('results', e.target.value)} placeholder="One result per line" />
              <span className="form-hint">One result per line</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-card">
          <p className="admin-section-title">Stats</p>
          <table className="stats-table">
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Value</th>
                <th>Label</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, idx) => (
                <tr key={stat._id ?? idx}>
                  <td><input value={stat.value} onChange={(e) => updateStat(idx, 'value', e.target.value)} placeholder="60%" /></td>
                  <td><input value={stat.label} onChange={(e) => updateStat(idx, 'label', e.target.value)} placeholder="Increase in order processing speed" /></td>
                  <td>
                    <button type="button" className="btn btn-ghost btn-icon btn-sm" onClick={() => removeStat(idx)} style={{ color: '#ef4444' }}>
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn btn-secondary btn-sm" onClick={addStat}>
            <Plus size={13} /> Add Stat
          </button>
        </div>

        {/* Publish */}
        <div className="admin-card">
          <p className="admin-section-title">Publishing</p>
          <label className="form-toggle-row">
            <input
              type="checkbox"
              checked={cs.published === 'TRUE'}
              onChange={(e) => setField('published', e.target.checked ? 'TRUE' : 'FALSE')}
            />
            <span style={{ fontSize: 14, color: '#374151' }}>Published (visible on site after sync)</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <><span className="spinner" />Saving…</> : <><Save size={14} />Save Case Study</>}
          </button>
          <Link to="/admin/case-studies" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>

      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}
    </>
  );
}
