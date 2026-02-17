import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, Package,
  RefreshCw, ExternalLink, Check,
} from 'lucide-react';

function NavItem({ to, icon, children }) {
  const NavIcon = icon;
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
    >
      <NavIcon size={16} />
      {children}
    </NavLink>
  );
}

export default function AdminLayout({ children }) {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  async function handleSync() {
    setSyncing(true);
    setSynced(false);
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (!res.ok) throw new Error('Sync failed');
      setSynced(true);
      setTimeout(() => setSynced(false), 3000);
    } catch (err) {
      alert('Sync failed: ' + err.message);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">MHE Next</div>
          <div className="admin-sidebar-title">Admin</div>
        </div>

        <nav className="admin-sidebar-nav">
          <NavItem to="/admin" icon={LayoutDashboard}>Dashboard</NavItem>
          <NavItem to="/admin/blog" icon={FileText}>Blog</NavItem>
          <NavItem to="/admin/case-studies" icon={Briefcase}>Case Studies</NavItem>
          <NavItem to="/admin/products" icon={Package}>Products</NavItem>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            className={`admin-sync-btn${synced ? ' success' : ''}`}
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <><span className="spinner" />Syncing…</>
            ) : synced ? (
              <><Check size={14} />Synced!</>
            ) : (
              <><RefreshCw size={14} />Sync Data Files</>
            )}
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-view-site-link"
          >
            <ExternalLink size={13} />
            View Site
          </a>
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
