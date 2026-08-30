import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ShoppingCenter from './components/ShoppingCenter';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ShoppingCenter />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* keep the old /shop links working */}
            <Route path="/shop" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
