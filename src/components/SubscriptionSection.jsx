import React from 'react';
import { createSubscriptionSession } from '../config/stripe';

function SubscriptionSection() {
  const [subscribing, setSubscribing] = React.useState(null);

  const handleSubscribe = async (planName, amount) => {
    try {
      setSubscribing(planName);
      const url = await createSubscriptionSession(planName, amount);
      window.location.href = url;
    } catch (error) {
      alert(`Subscription error: ${error.message}\n\nPlease try again.`);
      setSubscribing(null);
    }
  };

  return (
    <section id="subscription" className="subscription">
      <div className="subscription__container">
        <div className="subscription__badge">New</div>
        <h2 className="subscription__title">Monthly Connection Box</h2>
        <p className="subscription__subtitle">
          Never miss an occasion. Get hand-picked seasonal cards delivered to your door every month.
        </p>

        <div className="subscription__plans">
          <div className="plan-card">
            <h3 className="plan-card__name">Starter</h3>
            <p className="plan-card__price">
              <span className="plan-card__amount">$12</span>
              <span className="plan-card__period">/month</span>
            </p>
            <ul className="plan-card__features">
              <li>2 cards per month</li>
              <li>Seasonal designs</li>
              <li>Premium envelopes included</li>
              <li>Free shipping</li>
            </ul>
            <button
              className="btn btn--primary plan-card__btn"
              onClick={() => handleSubscribe('Monthly Starter', 1200)}
              disabled={subscribing === 'Monthly Starter'}
            >
              {subscribing === 'Monthly Starter' ? 'Redirecting...' : 'Subscribe'}
            </button>
          </div>

          <div className="plan-card plan-card--featured">
            <div className="plan-card__popular">Most Popular</div>
            <h3 className="plan-card__name">Family</h3>
            <p className="plan-card__price">
              <span className="plan-card__amount">$20</span>
              <span className="plan-card__period">/month</span>
            </p>
            <ul className="plan-card__features">
              <li>5 cards per month</li>
              <li>Seasonal + occasion-specific</li>
              <li>Premium envelopes included</li>
              <li>Free shipping</li>
              <li>Priority new design access</li>
            </ul>
            <button
              className="btn btn--primary plan-card__btn"
              onClick={() => handleSubscribe('Monthly Family', 2000)}
              disabled={subscribing === 'Monthly Family'}
            >
              {subscribing === 'Monthly Family' ? 'Redirecting...' : 'Subscribe'}
            </button>
          </div>

          <div className="plan-card">
            <h3 className="plan-card__name">Premium</h3>
            <p className="plan-card__price">
              <span className="plan-card__amount">$35</span>
              <span className="plan-card__period">/month</span>
            </p>
            <ul className="plan-card__features">
              <li>10 cards per month</li>
              <li>All designs + exclusive premium</li>
              <li>Premium envelopes + wax seals</li>
              <li>Free shipping</li>
              <li>Early access to new collections</li>
              <li>Personalized messages available</li>
            </ul>
            <button
              className="btn btn--primary plan-card__btn"
              onClick={() => handleSubscribe('Monthly Premium', 3500)}
              disabled={subscribing === 'Monthly Premium'}
            >
              {subscribing === 'Monthly Premium' ? 'Redirecting...' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionSection;