import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51Tg8G63dnX8tL64cBpnvmw109w3TT9F6xGWPL5SFW9ybtZyGSszEj4BJLi5IKxh0dWH4DEtf5OgXg4NUvD9MRvtP00zJwgT3Ch';

let stripePromise = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export const PRODUCTS = {
  // --- FORMAL (5) ---
  formal01: { id: 'formal-01', name: 'With Deepest Sympathy', category: 'Formal', price: 500, priceId: 'price_CHELLA_FORMAL_01', image: '/images/cards/formal-01-sympathy.png' },
  formal02: { id: 'formal-02', name: 'Congratulations', category: 'Formal', price: 500, priceId: 'price_CHELLA_FORMAL_02', image: '/images/cards/formal-02-congratulations.png' },
  formal03: { id: 'formal-03', name: 'Wishing you a lifetime of love', category: 'Formal', price: 500, priceId: 'price_CHELLA_FORMAL_03', image: '/images/cards/formal-03-wedding.png' },
  formal04: { id: 'formal-04', name: 'Welcome little one', category: 'Formal', price: 500, priceId: 'price_CHELLA_FORMAL_04', image: '/images/cards/formal-04-new-baby.png' },
  formal05: { id: 'formal-05', name: 'With sincere gratitude', category: 'Formal', price: 500, priceId: 'price_CHELLA_FORMAL_05', image: '/images/cards/formal-05-thank-you.png' },

  // --- FUNNY (8) ---
  funny01: { id: 'funny-01', name: "You're not old... you're vintage", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_01', image: '/images/cards/funny-01-birthday.png' },
  funny02: { id: 'funny-02', name: "I like you — don't make it weird", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_02', image: '/images/cards/funny-02-thinking-of-you.png' },
  funny03: { id: 'funny-03', name: "I literally forgot until now. Happy Birthday!", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_03', image: '/images/cards/funny-03-forgot-birthday.png' },
  funny04: { id: 'funny-04', name: "Thinking of you! Also pizza. Mostly pizza.", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_04', image: '/images/cards/funny-04-pizza-thinking.png' },
  funny05: { id: 'funny-05', name: "You're my favorite person. Don't tell anyone.", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_05', image: '/images/cards/funny-05-favorite-person.png' },
  funny06: { id: 'funny-06', name: "Congratulations on surviving another year!", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_06', image: '/images/cards/funny-06-surviving-year.png' },
  funny07: { id: 'funny-07', name: "No reason. Just wanted to say you're awesome.", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_07', image: '/images/cards/funny-07-no-reason-awesome.png' },
  funny08: { id: 'funny-08', name: "Adulting is hard. Here's a card.", category: 'Funny', price: 500, priceId: 'price_CHELLA_FUNNY_08', image: '/images/cards/funny-08-adulting-hard.png' },

  // --- TRENDY (7) ---
  trendy01: { id: 'trendy-01', name: "You're a whole mood", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_01', image: '/images/cards/trendy-01-whole-mood.png' },
  trendy02: { id: 'trendy-02', name: "You're doing great, sweetie", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_02', image: '/images/cards/trendy-02-encouragement.png' },
  trendy03: { id: 'trendy-03', name: "Happy Birthday! You iconic legend.", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_03', image: '/images/cards/trendy-03-iconic-legend.png' },
  trendy04: { id: 'trendy-04', name: "It's giving... birthday", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_04', image: '/images/cards/trendy-04-its-giving-birthday.png' },
  trendy05: { id: 'trendy-05', name: "Proud of you. Always.", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_05', image: '/images/cards/trendy-05-proud-of-you.png' },
  trendy06: { id: 'trendy-06', name: "Thankful for you", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_06', image: '/images/cards/trendy-06-thankful-for-you.png' },
  trendy07: { id: 'trendy-07', name: "Sending good vibes", category: 'Trendy', price: 500, priceId: 'price_CHELLA_TRENDY_07', image: '/images/cards/trendy-07-good-vibes.png' },

  // --- BUNDLES ---
  bundleFunny4:  { id: 'bundle-funny-4',  name: 'Funny 4-Pack',  price: 1600, priceId: 'price_CHELLA_BUNDLE_FUNNY_4',  includes: ['funny-01','funny-02','funny-03','funny-04'], originalPrice: 2000 },
  bundleFormal3: { id: 'bundle-formal-3', name: 'Formal 3-Pack', price: 1300, priceId: 'price_CHELLA_BUNDLE_FORMAL_3', includes: ['formal-01','formal-02','formal-03'], originalPrice: 1500 },
  bundleTrendy4: { id: 'bundle-trendy-4', name: 'Trendy 4-Pack', price: 1600, priceId: 'price_CHELLA_BUNDLE_TRENDY_4', includes: ['trendy-01','trendy-02','trendy-03','trendy-04'], originalPrice: 2000 },
  bundleMixed10: { id: 'bundle-mixed-10', name: 'Mixed 10-Pack',  price: 3500, priceId: 'price_CHELLA_BUNDLE_MIXED_10', includes: ['formal-01','formal-02','funny-01','funny-02','funny-03','funny-04','trendy-01','trendy-02','trendy-03','trendy-04'], originalPrice: 5000 },
  bundleFull20:  { id: 'bundle-full-20',  name: 'Full 20-Pack',   price: 6000, priceId: 'price_CHELLA_BUNDLE_FULL_20',  includes: [...Array.from({length:5},(_,i)=>`formal-0${i+1}`),...Array.from({length:8},(_,i)=>`funny-0${i+1}`),...Array.from({length:7},(_,i)=>`trendy-0${i+1}`)], originalPrice: 10000 },

  // --- SUBSCRIPTIONS ---
  monthlyStarter:  { id: 'sub-starter',  name: 'Monthly Starter',    price: 1200, priceId: 'price_CHELLA_SUB_STARTER' },
  monthlyFamily:   { id: 'sub-family',   name: 'Monthly Family',     price: 2000, priceId: 'price_CHELLA_SUB_FAMILY' },
  monthlyPremium:  { id: 'sub-premium',  name: 'Monthly Premium',    price: 3500, priceId: 'price_CHELLA_SUB_PREMIUM' },
};

const API_URL = 'https://00118b72e9b6695d6eb6ea2d0a923481.ctonew.app';

export const createCheckoutSession = async (items) => {
  try {
    const response = await fetch(`${API_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const session = await response.json();
    return session.url;
  } catch (error) {
    console.error('[Checkout Error]', error);
    throw error;
  }
};

/**
 * Creates a Stripe Checkout Session for a subscription
 */
export const createSubscriptionSession = async (planName, amount) => {
  try {
    const response = await fetch(`${API_URL}/api/create-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planName, amount }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create subscription');
    }

    const session = await response.json();
    return session.url;
  } catch (error) {
    console.error('[Subscription Error]', error);
    throw error;
  }
};