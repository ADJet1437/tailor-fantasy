import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { LanguageProvider } from './i18n/LanguageProvider';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-[rgb(var(--ink))]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/products" element={<Products />} />
              {/* the catalogue lived at /shop until it was renamed */}
              <Route path="/shop" element={<Navigate to="/products" replace />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
