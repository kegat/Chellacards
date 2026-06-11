import React from 'react';
import { useCart } from '../context/CartContext';

function Header() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          <img
            src="/images/logo-concept-2.png"
            alt="Chella Cards"
            className="header__logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="header__logo-fallback">Chella Cards</span>
        </a>
        <nav className="header__nav">
          <a href="/#gallery" className="header__link">Cards</a>
          <a href="/#subscription" className="header__link">Subscribe</a>
          <a href="/#about" className="header__link">About</a>
          <button className="header__cart-btn" onClick={openCart} aria-label="Open cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="header__cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;