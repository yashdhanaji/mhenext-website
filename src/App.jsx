import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import DrivingChange from './components/DrivingChange';
import Industries from './components/Industries';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import Partners from './components/Partners';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import ProductsListing from './components/ProductsListing';
import CaseStudiesPage from './components/CaseStudiesPage';
import CaseStudyDetail from './components/CaseStudyDetail';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AdminApp from './admin/AdminApp';

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-glow homepage-glow-1" />
      <div className="homepage-glow homepage-glow-2" />
      <div className="homepage-glow homepage-glow-3" />
      <div className="homepage-glow homepage-glow-4" />
      <div className="homepage-glow homepage-glow-5" />
      <div className="homepage-glow homepage-glow-6" />
      <Hero />
      <DrivingChange />
      <Industries />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CaseStudies />
      <Partners />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin panel — completely separate layout, no Header/Footer */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public site */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </Router>
  );
}

function PublicSite() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/products" element={<ProductsListing />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
