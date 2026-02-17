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
<<<<<<< HEAD
import CaseStudiesPage from './components/CaseStudiesPage';
import CaseStudyDetail from './components/CaseStudyDetail';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
=======
import About from './components/About';
import CaseStudiesPage from './components/CaseStudiesPage';
import BlogPage from './components/BlogPage';
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2

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
      <div className="app">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/products" element={<ProductsListing />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
