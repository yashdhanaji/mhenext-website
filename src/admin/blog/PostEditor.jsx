import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, Save } from 'lucide-react';

const EMPTY_POST = {
  slug: '', title: '', category: '', date: '', readTime: '',
  authorName: '', authorRole: '', thumbnail: '', heroImage: '',
  excerpt: '', tags: '', featured: 'FALSE', published: 'FALSE',
};

const EMPTY_BLOCK = { type: 'paragraph', text: '', value: '', label: '' };

export default function PostEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = !slug;

  const [post, setPost] = useState(EMPTY_POST);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isNew) return;
    async function load() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        const found = data.posts?.find((p) => p.slug === slug);
        if (!found) { setError('Post not found'); return; }
        const { content: blocks, ...meta } = found;
        setPost(meta);
        setContent(
          (blocks || []).map((b, i) => ({ ...EMPTY_BLOCK, ...b, _id: i }))
        );
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
    if (!post.slug.trim()) { alert('Slug is required'); return; }
    setSaving(true);
    setError(null);
    try {
      const body = {
        post,
        content: content.map((b) => {
        const { _id: _ID, ...rest } = b;
        return rest;
      }),
      };
      const res = isNew
        ? await fetch('/api/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch(`/api/blog/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || `HTTP ${res.status}`);
      }
      showToast('Saved!');
      if (isNew) navigate(`/admin/blog/${post.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function setPostField(field, value) {
    setPost((p) => ({ ...p, [field]: value }));
  }

  // Content block helpers
  function addBlock() {
    setContent((c) => [...c, { ...EMPTY_BLOCK, _id: Date.now() }]);
  }

  function removeBlock(idx) {
    setContent((c) => c.filter((_, i) => i !== idx));
  }

  function moveBlock(idx, dir) {
    setContent((c) => {
      const next = [...c];
      const to = idx + dir;
      if (to < 0 || to >= next.length) return c;
      [next[idx], next[to]] = [next[to], next[idx]];
      return next;
    });
  }

  function updateBlock(idx, field, value) {
    setContent((c) => c.map((b, i) => i === idx ? { ...b, [field]: value } : b));
  }

  if (loading) return <div className="admin-loading">Loading post…</div>;

  return (
    <>
      <Link to="/admin/blog" className="admin-back-link">
        <ArrowLeft size={14} /> Back to Blog
      </Link>

      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-page-title">{isNew ? 'New Post' : 'Edit Post'}</h1>
          {!isNew && <p className="admin-page-subtitle">/{slug}</p>}
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <form className="admin-form" onSubmit={handleSave}>
        {/* Metadata */}
        <div className="admin-card">
          <p className="admin-section-title">Metadata</p>

          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Slug <span className="required">*</span></label>
              <input
                className="form-input"
                value={post.slug}
                onChange={(e) => setPostField('slug', e.target.value)}
                placeholder="my-post-slug"
                disabled={!isNew}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Title</label>
              <input
                className="form-input"
                value={post.title}
                onChange={(e) => setPostField('title', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Category</label>
              <input
                className="form-input"
                value={post.category}
                onChange={(e) => setPostField('category', e.target.value)}
                placeholder="Warehouse Technology"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Date</label>
              <input
                className="form-input"
                value={post.date}
                onChange={(e) => setPostField('date', e.target.value)}
                placeholder="January 15, 2025"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Read Time</label>
              <input
                className="form-input"
                value={post.readTime}
                onChange={(e) => setPostField('readTime', e.target.value)}
                placeholder="5 min read"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Tags</label>
              <input
                className="form-input"
                value={post.tags}
                onChange={(e) => setPostField('tags', e.target.value)}
                placeholder="Forklift, Safety, Warehouse"
              />
              <span className="form-hint">Comma-separated</span>
            </div>

            <div className="form-field">
              <label className="form-label">Author Name</label>
              <input
                className="form-input"
                value={post.authorName}
                onChange={(e) => setPostField('authorName', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Author Role</label>
              <input
                className="form-input"
                value={post.authorRole}
                onChange={(e) => setPostField('authorRole', e.target.value)}
                placeholder="Head of Operations"
              />
            </div>

            <div className="form-field full-width">
              <label className="form-label">Excerpt</label>
              <textarea
                className="form-textarea"
                value={post.excerpt}
                onChange={(e) => setPostField('excerpt', e.target.value)}
                rows={2}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Thumbnail URL</label>
              <input
                className="form-input"
                value={post.thumbnail}
                onChange={(e) => setPostField('thumbnail', e.target.value)}
                placeholder="https://…"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Hero Image URL</label>
              <input
                className="form-input"
                value={post.heroImage}
                onChange={(e) => setPostField('heroImage', e.target.value)}
                placeholder="https://…"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
            <label className="form-toggle-row">
              <input
                type="checkbox"
                checked={post.featured === 'TRUE'}
                onChange={(e) => setPostField('featured', e.target.checked ? 'TRUE' : 'FALSE')}
              />
              <span className="form-label" style={{ textTransform: 'none', letterSpacing: 0 }}>Featured</span>
            </label>
            <label className="form-toggle-row">
              <input
                type="checkbox"
                checked={post.published === 'TRUE'}
                onChange={(e) => setPostField('published', e.target.checked ? 'TRUE' : 'FALSE')}
              />
              <span className="form-label" style={{ textTransform: 'none', letterSpacing: 0 }}>Published</span>
            </label>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="admin-card">
          <p className="admin-section-title">Content Blocks</p>

          <div className="content-blocks-list">
            {content.map((block, idx) => (
              <div key={block._id ?? idx} className="content-block-item">
                <div className="content-block-controls">
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => moveBlock(idx, -1)}
                    disabled={idx === 0}
                    title="Move up"
                  >
                    <ChevronUp size={13} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => moveBlock(idx, 1)}
                    disabled={idx === content.length - 1}
                    title="Move down"
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>

                <div className="content-block-fields">
                  <div className="content-block-row">
                    <select
                      className="form-select"
                      value={block.type}
                      onChange={(e) => updateBlock(idx, 'type', e.target.value)}
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="heading">Heading</option>
                      <option value="stat">Stat</option>
                    </select>

                    {block.type === 'stat' ? (
                      <>
                        <input
                          className="form-input"
                          placeholder="Value (e.g. 60%)"
                          value={block.value}
                          onChange={(e) => updateBlock(idx, 'value', e.target.value)}
                          style={{ width: 120, flexShrink: 0 }}
                        />
                        <input
                          className="form-input"
                          placeholder="Label"
                          value={block.label}
                          onChange={(e) => updateBlock(idx, 'label', e.target.value)}
                        />
                      </>
                    ) : (
                      <textarea
                        className="form-textarea"
                        rows={block.type === 'heading' ? 1 : 3}
                        placeholder={block.type === 'heading' ? 'Heading text' : 'Paragraph text…'}
                        value={block.text}
                        onChange={(e) => updateBlock(idx, 'text', e.target.value)}
                      />
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-ghost btn-icon btn-sm content-block-delete"
                  onClick={() => removeBlock(idx)}
                  style={{ color: '#ef4444' }}
                  title="Delete block"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="btn btn-secondary btn-sm" onClick={addBlock}>
            <Plus size={13} /> Add Block
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <><span className="spinner" />Saving…</> : <><Save size={14} />Save Post</>}
          </button>
          <Link to="/admin/blog" className="btn btn-secondary">Cancel</Link>
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
