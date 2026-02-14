import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import About from './components/About';
import CaseStudiesPage from './components/CaseStudiesPage';
import BlogPage from './components/BlogPage';

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
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/products" element={<ProductsListing />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
