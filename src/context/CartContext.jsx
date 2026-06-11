import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'chella-cart';

// --- Pricing Data ---
const PRODUCTS_CATALOG = {
  // --- FORMAL (5) ---
  'formal-01': { id: 'formal-01', name: 'With Deepest Sympathy', price: 500, category: 'Formal', image: '/images/cards/formal-01-sympathy.png' },
  'formal-02': { id: 'formal-02', name: 'Congratulations', price: 500, category: 'Formal', image: '/images/cards/formal-02-congratulations.png' },
  'formal-03': { id: 'formal-03', name: 'Wishing you a lifetime of love', price: 500, category: 'Formal', image: '/images/cards/formal-03-wedding.png' },
  'formal-04': { id: 'formal-04', name: 'Welcome little one', price: 500, category: 'Formal', image: '/images/cards/formal-04-new-baby.png' },
  'formal-05': { id: 'formal-05', name: 'With sincere gratitude', price: 500, category: 'Formal', image: '/images/cards/formal-05-thank-you.png' },

  // --- FUNNY (8) ---
  'funny-01': { id: 'funny-01', name: "You're not old... you're vintage", price: 500, category: 'Funny', image: '/images/cards/funny-01-birthday.png' },
  'funny-02': { id: 'funny-02', name: "I like you — don't make it weird", price: 500, category: 'Funny', image: '/images/cards/funny-02-thinking-of-you.png' },
  'funny-03': { id: 'funny-03', name: "I literally forgot. Happy Birthday!", price: 500, category: 'Funny', image: '/images/cards/funny-03-forgot-birthday.png' },
  'funny-04': { id: 'funny-04', name: "Thinking of you! Also pizza.", price: 500, category: 'Funny', image: '/images/cards/funny-04-pizza-thinking.png' },
  'funny-05': { id: 'funny-05', name: "You're my favorite person.", price: 500, category: 'Funny', image: '/images/cards/funny-05-favorite-person.png' },
  'funny-06': { id: 'funny-06', name: "Congrats on surviving another year!", price: 500, category: 'Funny', image: '/images/cards/funny-06-surviving-year.png' },
  'funny-07': { id: 'funny-07', name: "No reason. You're awesome.", price: 500, category: 'Funny', image: '/images/cards/funny-07-no-reason-awesome.png' },
  'funny-08': { id: 'funny-08', name: "Adulting is hard. Here's a card.", price: 500, category: 'Funny', image: '/images/cards/funny-08-adulting-hard.png' },

  // --- TRENDY (7) ---
  'trendy-01': { id: 'trendy-01', name: "You're a whole mood", price: 500, category: 'Trendy', image: '/images/cards/trendy-01-whole-mood.png' },
  'trendy-02': { id: 'trendy-02', name: "You're doing great, sweetie", price: 500, category: 'Trendy', image: '/images/cards/trendy-02-encouragement.png' },
  'trendy-03': { id: 'trendy-03', name: "Happy Birthday! You iconic legend.", price: 500, category: 'Trendy', image: '/images/cards/trendy-03-iconic-legend.png' },
  'trendy-04': { id: 'trendy-04', name: "It's giving... birthday", price: 500, category: 'Trendy', image: '/images/cards/trendy-04-its-giving-birthday.png' },
  'trendy-05': { id: 'trendy-05', name: "Proud of you. Always.", price: 500, category: 'Trendy', image: '/images/cards/trendy-05-proud-of-you.png' },
  'trendy-06': { id: 'trendy-06', name: "Thankful for you", price: 500, category: 'Trendy', image: '/images/cards/trendy-06-thankful-for-you.png' },
  'trendy-07': { id: 'trendy-07', name: "Sending good vibes", price: 500, category: 'Trendy', image: '/images/cards/trendy-07-good-vibes.png' },

  // --- BUNDLES (5) ---
  'bundle-funny-4':  { id: 'bundle-funny-4',  name: 'Funny 4-Pack',  price: 1600, category: 'Bundle', items: ['funny-01','funny-02','funny-03','funny-04'], originalPrice: 2000 },
  'bundle-formal-3': { id: 'bundle-formal-3', name: 'Formal 3-Pack', price: 1300, category: 'Bundle', items: ['formal-01','formal-02','formal-03'], originalPrice: 1500 },
  'bundle-trendy-4': { id: 'bundle-trendy-4', name: 'Trendy 4-Pack', price: 1600, category: 'Bundle', items: ['trendy-01','trendy-02','trendy-03','trendy-04'], originalPrice: 2000 },
  'bundle-mixed-10': { id: 'bundle-mixed-10', name: 'Mixed 10-Pack',  price: 3500, category: 'Bundle', items: ['formal-01','formal-02','funny-01','funny-02','funny-03','funny-04','trendy-01','trendy-02','trendy-03','trendy-04'], originalPrice: 5000 },
  'bundle-full-20':  { id: 'bundle-full-20',  name: 'Full 20-Pack',  price: 6000, category: 'Bundle', items: ['formal-01','formal-02','formal-03','formal-04','formal-05','funny-01','funny-02','funny-03','funny-04','funny-05','funny-06','funny-07','funny-08','trendy-01','trendy-02','trendy-03','trendy-04','trendy-05','trendy-06','trendy-07'], originalPrice: 10000 },
};

// --- Reducer ---
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.product;
      // For bundles, just add one
      const existingIndex = state.items.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (action.quantity || 1),
        };
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [...state.items, { id: product.id, quantity: action.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item
        ),
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    case 'TOGGLE_CART': {
      return { ...state, isOpen: !state.isOpen };
    }
    case 'SET_CART_OPEN': {
      return { ...state, isOpen: action.isOpen };
    }
    default:
      return state;
  }
}

// --- Enrich cart items with product data ---
function enrichItems(items) {
  return items
    .map((item) => {
      const product = PRODUCTS_CATALOG[item.id];
      if (!product) return null;
      return { ...item, ...product };
    })
    .filter(Boolean);
}

// --- Calculate totals ---
function calcSubtotal(enriched) {
  return enriched.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calcSavings(enriched) {
  return enriched.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
}

// --- Provider ---
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.items) {
          dispatch({ type: 'CLEAR_CART' });
          parsed.items.forEach((item) => {
            const product = PRODUCTS_CATALOG[item.id];
            if (product) {
              dispatch({ type: 'ADD_ITEM', product, quantity: item.quantity });
            }
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  const enriched = enrichItems(state.items);
  const itemCount = enriched.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calcSubtotal(enriched);
  const savings = calcSavings(enriched);

  const value = {
    items: enriched,
    itemCount,
    subtotal,
    savings,
    total: subtotal,
    isOpen: state.isOpen,
    addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', product, quantity }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
    updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    openCart: () => dispatch({ type: 'SET_CART_OPEN', isOpen: true }),
    closeCart: () => dispatch({ type: 'SET_CART_OPEN', isOpen: false }),
    getProduct: (id) => PRODUCTS_CATALOG[id],
    getCatalog: () => PRODUCTS_CATALOG,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}