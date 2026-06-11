import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CARDS = [
  // --- FORMAL (5) ---
  { id: 'formal-01', title: 'With Deepest Sympathy', category: 'Formal', price: 500, image: '/images/cards/formal-01-sympathy.png', palette: ['#7BA3A8', '#3D3D3D'], desc: 'Delicate watercolor botanical with eucalyptus and white florals.' },
  { id: 'formal-02', title: 'Congratulations', category: 'Formal', price: 500, image: '/images/cards/formal-02-congratulations.png', palette: ['#D4A857', '#3D3D3D'], desc: 'Minimalist gold foil laurel wreath for celebrating achievements.' },
  { id: 'formal-03', title: 'Wishing you a lifetime of love', category: 'Formal', price: 500, image: '/images/cards/formal-03-wedding.png', palette: ['#D4A857', '#3D3D3D'], desc: 'Gold foil intertwined wreath — perfect for weddings and anniversaries.' },
  { id: 'formal-04', title: 'Welcome little one', category: 'Formal', price: 500, image: '/images/cards/formal-04-new-baby.png', palette: ['#F5E1DA', '#5B7B5A'], desc: 'Watercolor onesie and flowers for a new baby arrival.' },
  { id: 'formal-05', title: 'With sincere gratitude', category: 'Formal', price: 500, image: '/images/cards/formal-05-thank-you.png', palette: ['#D4A857', '#3D3D3D'], desc: 'Minimal gold line border — a classic thank you with quiet elegance.' },

  // --- FUNNY (8) ---
  { id: 'funny-01', title: "You're not old... you're vintage", category: 'Funny', price: 500, image: '/images/cards/funny-01-birthday.png', palette: ['#E87A6B', '#3D3D3D'], desc: 'Hand-lettered typography with wine glass line art. A hilarious birthday classic.' },
  { id: 'funny-02', title: "I like you — don't make it weird", category: 'Funny', price: 500, image: '/images/cards/funny-02-thinking-of-you.png', palette: ['#B85C4A', '#3D3D3D'], desc: 'Hand-lettered script with a playful cat. Witty "thinking of you" fun.' },
  { id: 'funny-03', title: "I literally forgot until now. Happy Birthday!", category: 'Funny', price: 500, image: '/images/cards/funny-03-forgot-birthday.png', palette: ['#E87A6B', '#3D3D3D'], desc: 'Bold typography with cake line art. The perfect last-minute birthday card.' },
  { id: 'funny-04', title: "Thinking of you! Also pizza. Mostly pizza.", category: 'Funny', price: 500, image: '/images/cards/funny-04-pizza-thinking.png', palette: ['#B85C4A', '#D4A857'], desc: 'Typography meets pizza — for the friend who shares your food priorities.' },
  { id: 'funny-05', title: "You're my favorite person. Don't tell anyone.", category: 'Funny', price: 500, image: '/images/cards/funny-05-favorite-person.png', palette: ['#E87A6B', '#3D3D3D'], desc: 'Hand-lettered with a "shh" gesture. An exclusive secret for your favorite person.' },
  { id: 'funny-06', title: "Congratulations on surviving another year!", category: 'Funny', price: 500, image: '/images/cards/funny-06-surviving-year.png', palette: ['#B85C4A', '#3D3D3D'], desc: 'Bold typography with party hat. For the realist who celebrates survival.' },
  { id: 'funny-07', title: "No reason. Just wanted to say you're awesome.", category: 'Funny', price: 500, image: '/images/cards/funny-07-no-reason-awesome.png', palette: ['#E87A6B', '#3D3D3D'], desc: 'Hand-lettered with a winking person. A surprise "just because" delight.' },
  { id: 'funny-08', title: "Adulting is hard. Here's a card.", category: 'Funny', price: 500, image: '/images/cards/funny-08-adulting-hard.png', palette: ['#B85C4A', '#3D3D3D'], desc: 'Bold typography with coffee cup. For every friend who needs a laugh and some caffeine.' },

  // --- TRENDY (7) ---
  { id: 'trendy-01', title: "You're a whole mood", category: 'Trendy', price: 500, image: '/images/cards/trendy-01-whole-mood.png', palette: ['#E87A6B', '#D4A857'], desc: '70s revival abstract shapes and bold color blocks. A modern "just because" statement.' },
  { id: 'trendy-02', title: "You're doing great, sweetie", category: 'Trendy', price: 500, image: '/images/cards/trendy-02-encouragement.png', palette: ['#5B7B5A', '#3D3D3D'], desc: 'Minimal botanical line art with a monstera leaf. Gentle encouragement.' },
  { id: 'trendy-03', title: "Happy Birthday! You iconic legend.", category: 'Trendy', price: 500, image: '/images/cards/trendy-03-iconic-legend.png', palette: ['#D4A857', '#5B7B5A'], desc: 'Groovy 70s revival with chunky font. For the legend in your life.' },
  { id: 'trendy-04', title: "It's giving... birthday", category: 'Trendy', price: 500, image: '/images/cards/trendy-04-its-giving-birthday.png', palette: ['#E87A6B', '#7BA3A8'], desc: 'Y2K digital bubble font with smiley. A trendy birthday flex.' },
  { id: 'trendy-05', title: "Proud of you. Always.", category: 'Trendy', price: 500, image: '/images/cards/trendy-05-proud-of-you.png', palette: ['#5B7B5A', '#3D3D3D'], desc: 'Refined minimal / quiet luxury with sage accents. Understated pride.' },
  { id: 'trendy-06', title: "Thankful for you", category: 'Trendy', price: 500, image: '/images/cards/trendy-06-thankful-for-you.png', palette: ['#5B7B5A', '#F5E1DA'], desc: 'Abstract organic blob shapes in sage and blush. A warm, modern gratitude.' },
  { id: 'trendy-07', title: "Sending good vibes", category: 'Trendy', price: 500, image: '/images/cards/trendy-07-good-vibes.png', palette: ['#5B7B5A', '#3D3D3D'], desc: 'Soft script wellness design. A gentle mental health check-in card.' },
];

const BUNDLES = [
  { id: 'bundle-funny-4',  name: 'Funny 4-Pack',      desc: '4 assorted funny designs',     emoji: '😄', price: 1600, original: 2000, color: '#E87A6B', savings: 'Save 20%' },
  { id: 'bundle-formal-3', name: 'Formal 3-Pack',     desc: '3 elegant formal designs',      emoji: '🎩', price: 1300, original: 1500, color: '#7BA3A8', savings: 'Save 13%' },
  { id: 'bundle-trendy-4', name: 'Trendy 4-Pack',     desc: '4 modern trendy designs',       emoji: '✨', price: 1600, original: 2000, color: '#5B7B5A', savings: 'Save 20%' },
  { id: 'bundle-mixed-10', name: 'Mixed 10-Pack',     desc: '10 best across all categories', emoji: '🎁', price: 3500, original: 5000, color: '#D4A857', savings: 'Save 30%', featured: true },
  { id: 'bundle-full-20',  name: 'Full 20-Pack',      desc: 'Complete collection — all 20 cards', emoji: '🏆', price: 6000, original: 10000, color: '#E87A6B', savings: 'Save 40%' },
];

function CardGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Formal', 'Funny', 'Trendy'];
  const { addItem, openCart, getProduct } = useCart();

  const filteredCards = activeFilter === 'All'
    ? CARDS
    : CARDS.filter((card) => card.category === activeFilter);

  const handleAddCard = (card) => { addItem(getProduct(card.id)); openCart(); };
  const handleAddBundle = (bundle) => { addItem(getProduct(bundle.id)); openCart(); };

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__container">
        <h2 className="gallery__title">Our Collection</h2>
        <p className="gallery__subtitle">
          20 designs across 3 categories — {CARDS.length} cards carefully crafted at a price that feels right.
        </p>

        <div className="gallery__filters">
          {filters.map((f) => (
            <button key={f}
              className={`gallery__filter-btn ${activeFilter === f ? 'gallery__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >{f} {f !== 'All' ? `(${CARDS.filter(c => c.category === f).length})` : `(${CARDS.length})`}</button>
          ))}
        </div>

        <div className="gallery__grid">
          {filteredCards.map((card) => (
            <div key={card.id} className="card-item">
              <div className="card-item__preview" style={{ background: `linear-gradient(135deg, ${card.palette[0]}20, #FDF6EE)` }}>
                <img src={card.image} alt={card.title} className="card-item__image" loading="lazy" />
                <div className="card-item__badge" style={{ backgroundColor: card.palette[0] }}>{card.category}</div>
              </div>
              <div className="card-item__info">
                <h3 className="card-item__title">{card.title}</h3>
                <p className="card-item__desc">{card.desc}</p>
                <div className="card-item__bottom">
                  <span className="card-item__price">${(card.price / 100).toFixed(2)}</span>
                  <button className="btn btn--small btn--primary" onClick={() => handleAddCard(card)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bundles */}
        <div className="gallery__bundles">
          <h3 className="bundle-section__title">Bundle & Save</h3>
          <p className="bundle-section__subtitle">Curated packs at a discount — the more you buy, the more you save.</p>
          <div className="bundle-grid">
            {BUNDLES.map((b) => (
              <div key={b.id} className={`bundle-card ${b.featured ? 'bundle-card--featured' : ''}`}>
                <div className="bundle-card__header" style={{ backgroundColor: b.color }}>
                  <span className="bundle-card__emoji">{b.emoji}</span>
                  <h4 className="bundle-card__title">{b.name}</h4>
                </div>
                <div className="bundle-card__body">
                  <p className="bundle-card__desc">{b.desc}</p>
                  <p className="bundle-card__price">
                    <span className="bundle-card__original">${(b.original / 100).toFixed(2)}</span>
                    <span className="bundle-card__sale">${(b.price / 100).toFixed(2)}</span>
                    <span className="bundle-card__savings">{b.savings}</span>
                  </p>
                  <button className="btn btn--small btn--primary" onClick={() => handleAddBundle(b)}>Add Bundle</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardGallery;