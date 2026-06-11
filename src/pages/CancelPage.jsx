import React from 'react';

function CancelPage() {
  return (
    <div className="result-page">
      <div className="result-page__card">
        <div className="result-page__icon result-page__icon--cancel">&#10007;</div>
        <h1 className="result-page__title">Order Cancelled</h1>
        <p className="result-page__subtitle">Your payment was not processed.</p>
        <div className="result-page__details">
          <p>No charges have been made. If you ran into any issues, feel free to try again or contact us for help.</p>
        </div>
        <div className="result-page__actions">
          <a href="/" className="btn btn--primary">Try Again</a>
        </div>
      </div>
    </div>
  );
}

export default CancelPage;