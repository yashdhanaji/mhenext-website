import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(slug) {
    if (!confirm(`Delete post "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublished(post) {
    const newVal = post.published === 'TRUE' ? 'FALSE' : 'TRUE';
    try {
      await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: { ...post, published: newVal },
          content: post.content || [],
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
          <h1 className="admin-page-title">Blog Posts</h1>
          <p className="admin-page-subtitle">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link to="/admin/blog/new" className="btn btn-primary">
          <Plus size={14} /> New Post
        </Link>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {loading ? (
        <div className="admin-loading">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="admin-empty">No posts yet. <Link to="/admin/blog/new">Create one →</Link></div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Author</th>
                  <th>Published</th>
                  <th>Featured</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug}>
                    <td>
                      <span style={{ fontWeight: 500, color: '#1a1a2e' }}>{post.title || '(untitled)'}</span>
                      <br />
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{post.slug}</span>
                    </td>
                    <td>
                      {post.category && (
                        <span className="badge badge-blue">{post.category}</span>
                      )}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 12, color: '#64748b' }}>{post.date}</td>
                    <td style={{ fontSize: 12 }}>{post.authorName}</td>
                    <td>
                      <button
                        className={`badge ${post.published === 'TRUE' ? 'badge-green' : 'badge-gray'}`}
                        onClick={() => togglePublished(post)}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle"
                      >
                        {post.published === 'TRUE' ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td>
                      {post.featured === 'TRUE' && (
                        <span className="badge badge-orange">Featured</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link
                          to={`/admin/blog/${post.slug}`}
                          className="btn btn-ghost btn-icon btn-sm"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          className="btn btn-ghost btn-icon btn-sm"
                          onClick={() => handleDelete(post.slug)}
                          disabled={deleting === post.slug}
                          title="Delete"
                          style={{ color: '#ef4444' }}
                        >
                          {deleting === post.slug
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
