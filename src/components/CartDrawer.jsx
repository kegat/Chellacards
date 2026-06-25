import React from 'react';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../config/stripe';

function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    savings,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const lineItems = items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        id: item.id,
      }));

      const url = await createCheckoutSession(lineItems);
      window.location.href = url;
    } catch (error) {
      alert(`Checkout error: ${error.message}\n\nPlease try again or contact support.`);
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Your Cart
            {itemCount > 0 && (
              <span className="cart-drawer__count">({itemCount})</span>
            )}
          </h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="cart-drawer__empty-icon">&#x1F3F0;</span>
            <p className="cart-drawer__empty-text">Your cart is empty</p>
            <p className="cart-drawer__empty-hint">
              Browse our card collection and add some warmth to your cart!
            </p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-row__image-wrap">
                    <div
                      className="cart-item-row__swatch"
                      style={{ backgroundColor: item.category === 'Bundle' ? '#D4A857' : '#E87A6B' }}
                    >
                      {item.category === 'Bundle' ? '📦' : '💌'}
                    </div>
                  </div>
                  <div className="cart-item-row__info">
                    <p className="cart-item-row__name">{item.name}</p>
                    <p className="cart-item-row__category">{item.category}</p>
                    <div className="cart-item-row__bottom">
                      <div className="cart-item-row__qty">
                        <button
                          className="cart-item-row__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          &minus;
                        </button>
                        <span className="cart-item-row__qty-val">{item.quantity}</span>
                        <button
                          className="cart-item-row__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-row__pricing">
                        <span className="cart-item-row__price">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="cart-item-row__savings">
                            Save ${((item.originalPrice - item.price) / 100).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="cart-item-row__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-drawer__summary">
              {/* Free shipping progress */}
              <div className="cart-drawer__shipping">
                {(() => {
                  const threshold = 2500;
                  const remaining = threshold - subtotal;
                  if (subtotal >= threshold) {
                    return <div className="shipping-progress shipping-progress--free">🎉 You've unlocked FREE shipping!</div>;
                  }
                  const pct = Math.min((subtotal / threshold) * 100, 99);
                  return (
                    <div className="shipping-progress">
                      <div className="shipping-progress__bar">
                        <div className="shipping-progress__fill" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="shipping-progress__text">
                        You're ${(remaining / 100).toFixed(2)} away from <strong>free shipping!</strong>
                      </p>
                    </div>
                  );
                })()}
              </div>
              {savings > 0 && (
                <div className="cart-drawer__savings-row">
                  <span>You Save</span>
                  <span className="cart-drawer__savings-amount">
                    &minus;${(savings / 100).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="cart-drawer__total-row">
                <span>Total</span>
                <span className="cart-drawer__total-amount">
                  ${(subtotal / 100).toFixed(2)}
                </span>
              </div>
              <button className="btn btn--primary cart-drawer__checkout" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Redirecting to Stripe...' : 'Checkout'}
              </button>
              <button className="cart-drawer__continue" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartDrawer;