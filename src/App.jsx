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
import Products from './components/Products';

function HomePage() {
  return (
    <>
      <Hero />
      <DrivingChange />
      <Industries />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CaseStudies />
      <Partners />
    </>
  );
}

function ProductsPage() {
  return <Products />;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/electric-forklift" element={<ProductsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
