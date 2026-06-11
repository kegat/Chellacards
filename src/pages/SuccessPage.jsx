import React from 'react';
import { useCart } from '../context/CartContext';

function SuccessPage() {
  const { clearCart } = useCart();

  React.useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="result-page">
      <div className="result-page__card">
        <div className="result-page__icon">&#10003;</div>
        <h1 className="result-page__title">Thank You!</h1>
        <p className="result-page__subtitle">Your order has been placed successfully.</p>
        <div className="result-page__details">
          <p>You'll receive a confirmation email shortly with your order details and tracking information.</p>
          <p className="result-page__note">Your Chella Cards are on their way &mdash; warm connections start here.</p>
        </div>
        <a href="/" className="btn btn--primary">Continue Shopping</a>
      </div>
    </div>
  );
}

export default SuccessPage;