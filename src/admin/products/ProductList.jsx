import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Products</h1>
        <p className="admin-page-subtitle">Read-only — edit products in Google Sheets</p>
      </div>

      <div className="admin-external-note" style={{ marginBottom: 20 }}>
        <ExternalLink size={14} />
        Products are managed in Google Sheets.
        {' '}
        <a
          href="https://sheets.google.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', fontWeight: 600 }}
        >
          Open Sheets →
        </a>
        {' '}After editing, click <strong>Sync Data Files</strong> in the sidebar.
      </div>

      {error && <div className="admin-error">{error}</div>}

      {loading ? (
        <div className="admin-loading">Loading products…</div>
      ) : products.length === 0 ? (
        <div className="admin-empty">No products found.</div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Short Description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td>
                      {p.category && <span className="badge badge-blue">{p.category}</span>}
                    </td>
                    <td style={{ fontSize: 12, color: '#94a3b8' }}>{p.slug}</td>
                    <td style={{ fontSize: 12, color: '#64748b', maxWidth: 300 }}>
                      {p.shortDesc}
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
