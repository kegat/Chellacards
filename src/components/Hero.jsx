import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          Warm connections,<br />
          <span className="hero__title-accent">beautifully expressed</span>
        </h1>
        <p className="hero__subtitle">
          High-quality greeting cards that feel personal &mdash; without the boutique price tag.
          From thoughtful sentiments to laugh-out-loud humor, find the perfect card for every moment.
        </p>
        <div className="hero__actions">
          <a href="#gallery" className="btn btn--primary">
            Browse Cards
          </a>
          <a href="#subscription" className="btn btn--secondary">
            Subscribe &amp; Save
          </a>
        </div>
        <div className="hero__pill">
          <span className="hero__pill-dot"></span>
          Most cards just <strong>$5</strong>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__card-preview">
          <div className="hero__card-mockup">
            <div className="mockup-inner">
              <span className="mockup-icon">&#x2661;</span>
              <p className="mockup-text">You're the best</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;