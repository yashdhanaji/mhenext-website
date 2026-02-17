import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Package, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ posts: null, caseStudies: null, products: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCounts() {
      try {
        const [blogRes, csRes, prodRes] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/case-studies'),
          fetch('/api/products'),
        ]);
        const [blog, cs, prod] = await Promise.all([
          blogRes.json(),
          csRes.json(),
          prodRes.json(),
        ]);
        setCounts({
          posts: blog.posts?.length ?? 0,
          caseStudies: cs.caseStudies?.length ?? 0,
          products: prod.products?.length ?? 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCounts();
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Overview of your content</p>
      </div>

      {error && <div className="admin-error">Could not connect to admin server: {error}. Make sure <code>npm run admin</code> is running.</div>}

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Blog Posts</div>
          <div className="admin-stat-value">
            {loading ? '—' : counts.posts}
          </div>
          <div className="admin-stat-sub">total posts in sheet</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Case Studies</div>
          <div className="admin-stat-value">
            {loading ? '—' : counts.caseStudies}
          </div>
          <div className="admin-stat-sub">total case studies in sheet</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Products</div>
          <div className="admin-stat-value">
            {loading ? '—' : counts.products}
          </div>
          <div className="admin-stat-sub">total products in sheet</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Quick Actions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <QuickAction to="/admin/blog/new" icon={<FileText size={16} />} label="New Blog Post" />
          <QuickAction to="/admin/case-studies/new" icon={<Briefcase size={16} />} label="New Case Study" />
          <QuickAction to="/admin/blog" icon={<FileText size={16} />} label="Manage Blog Posts" />
          <QuickAction to="/admin/case-studies" icon={<Briefcase size={16} />} label="Manage Case Studies" />
          <QuickAction to="/admin/products" icon={<Package size={16} />} label="View Products" />
        </div>
      </div>
    </>
  );
}

function QuickAction({ to, icon, label }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderRadius: 6,
        background: '#f8fafc',
        color: '#374151',
        textDecoration: 'none',
        fontSize: 14,
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '#f8fafc')}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon}
        {label}
      </span>
      <ArrowRight size={14} style={{ color: '#94a3b8' }} />
    </Link>
  );
}
