import React from 'react';
import { useCart } from '../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 2500; // $25.00 in cents

function FreeShippingBanner() {
  const { subtotal } = useCart();
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const isEligible = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className={`shipping-banner ${isEligible ? 'shipping-banner--eligible' : ''}`}>
      <div className="shipping-banner__container">
        <span className="shipping-banner__icon">{isEligible ? '🎉' : '🚚'}</span>
        <span className="shipping-banner__text">
          {isEligible
            ? 'You get FREE shipping!'
            : `Free shipping on orders over $25.00 — you're $${(remaining / 100).toFixed(2)} away!`}
        </span>
      </div>
    </div>
  );
}

export default FreeShippingBanner;