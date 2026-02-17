import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function CaseStudyList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/case-studies');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCaseStudies(data.caseStudies || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(slug) {
    if (!confirm(`Delete case study "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/case-studies/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublished(cs) {
    const newVal = cs.published === 'TRUE' ? 'FALSE' : 'TRUE';
    try {
      await fetch(`/api/case-studies/${cs.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseStudy: { ...cs, published: newVal },
          stats: cs.stats || [],
        }),
      });
      await load();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  }

  return (
    <>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-page-title">Case Studies</h1>
          <p className="admin-page-subtitle">{caseStudies.length} case stud{caseStudies.length !== 1 ? 'ies' : 'y'} total</p>
        </div>
        <Link to="/admin/case-studies/new" className="btn btn-primary">
          <Plus size={14} /> New Case Study
        </Link>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {loading ? (
        <div className="admin-loading">Loading case studies…</div>
      ) : caseStudies.length === 0 ? (
        <div className="admin-empty">No case studies yet. <Link to="/admin/case-studies/new">Create one →</Link></div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Industry</th>
                  <th>Year</th>
                  <th>Published</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((cs) => (
                  <tr key={cs.slug}>
                    <td>
                      <span style={{ fontWeight: 500, color: '#1a1a2e' }}>{cs.title || '(untitled)'}</span>
                      <br />
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{cs.slug}</span>
                    </td>
                    <td style={{ fontSize: 13 }}>{cs.client}</td>
                    <td>
                      {cs.industry && (
                        <span className="badge badge-blue">{cs.industry}</span>
                      )}
                    </td>
                    <td style={{ fontSize: 12, color: '#64748b' }}>{cs.year}</td>
                    <td>
                      <button
                        className={`badge ${cs.published === 'TRUE' ? 'badge-green' : 'badge-gray'}`}
                        onClick={() => togglePublished(cs)}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle"
                      >
                        {cs.published === 'TRUE' ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link
                          to={`/admin/case-studies/${cs.slug}`}
                          className="btn btn-ghost btn-icon btn-sm"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={() => handleDelete(cs.slug)}
                          disabled={deleting === cs.slug}
                          title="Delete"
                          style={{ color: '#ef4444' }}
                        >
                          {deleting === cs.slug
                            ? <span className="spinner spinner-dark" />
                            : <Trash2 size={13} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
