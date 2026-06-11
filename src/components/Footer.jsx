import React from 'react';

function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img
            src="/images/logo-concept-3.png"
            alt="Chella Cards"
            className="footer__logo"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <p className="footer__tagline">
            Warm connections, beautifully expressed &mdash; for everyone.
          </p>
        </div>
        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__heading">Shop</h4>
            <a href="#gallery" className="footer__link">All Cards</a>
            <a href="#gallery" className="footer__link">Birthday</a>
            <a href="#gallery" className="footer__link">Sympathy</a>
            <a href="#gallery" className="footer__link">Thank You</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Company</h4>
            <a href="#about" className="footer__link">About Us</a>
            <a href="#about" className="footer__link">Sustainability</a>
            <a href="#about" className="footer__link">Careers</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Support</h4>
            <a href="#about" className="footer__link">FAQ</a>
            <a href="#about" className="footer__link">Shipping</a>
            <a href="#about" className="footer__link">Returns</a>
            <a href="#about" className="footer__link">Contact</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Chella Cards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;