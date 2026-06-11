import React from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CardGallery from './components/CardGallery';
import SubscriptionSection from './components/SubscriptionSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

function App() {
  const path = window.location.pathname;

  // Simple routing for success/cancel pages
  if (path === '/success') {
    return (
      <CartProvider>
        <div className="app">
          <Header />
          <SuccessPage />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  if (path === '/cancel') {
    return (
      <CartProvider>
        <div className="app">
          <Header />
          <CancelPage />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Main storefront
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <CardGallery />
          <SubscriptionSection />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;