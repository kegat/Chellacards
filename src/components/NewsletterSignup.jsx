import React, { useState } from 'react';

function NewsletterSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(`Thanks ${name}! Use code LAUNCH10 for 10% off your first order.`);
        setName('');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter newsletter--success">
        <div className="newsletter__container">
          <div className="newsletter__icon">&#10003;</div>
          <h3 className="newsletter__title">You're in the club!</h3>
          <p className="newsletter__message">{message}</p>
          <p className="newsletter__fineprint">Check your inbox for a welcome note from us.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__content">
          <h3 className="newsletter__title">Join the Club</h3>
          <p className="newsletter__subtitle">
            Be the first to know about new designs, seasonal launches, and exclusive offers.
          </p>
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__fields">
              <input
                type="text"
                className="newsletter__input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <input
                type="email"
                className="newsletter__input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary newsletter__btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing up...' : 'Get 10% Off'}
            </button>
          </form>
          {status === 'error' && (
            <p className="newsletter__error">{message}</p>
          )}
          <p className="newsletter__fineprint">
            No spam, ever. Unsubscribe anytime. Your discount code will be sent right away.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSignup;