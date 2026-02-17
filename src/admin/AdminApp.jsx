import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import PostList from './blog/PostList';
import PostEditor from './blog/PostEditor';
import CaseStudyList from './case-studies/CaseStudyList';
import CaseStudyEditor from './case-studies/CaseStudyEditor';
import ProductList from './products/ProductList';
import './admin.css';

export default function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="blog" element={<PostList />} />
        <Route path="blog/new" element={<PostEditor />} />
        <Route path="blog/:slug" element={<PostEditor />} />
        <Route path="case-studies" element={<CaseStudyList />} />
        <Route path="case-studies/new" element={<CaseStudyEditor />} />
        <Route path="case-studies/:slug" element={<CaseStudyEditor />} />
        <Route path="products" element={<ProductList />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
