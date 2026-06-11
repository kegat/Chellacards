import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// Serve static files from the Vite build in production
app.use(express.static(path.join(__dirname, 'dist')));

// --- Price ID mapping ---
// These are the product/price IDs we'd create in Stripe Dashboard
// For testing, we'll generate prices on the fly using the amount
const PRICE_MAP = {
  // Individual cards - we create them dynamically based on amount
};

/**
 * POST /api/create-checkout-session
 * Creates a Stripe Checkout Session for one-time purchases
 */
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Build line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [`http://localhost:5173${item.image}`] : [],
        },
        unit_amount: item.price, // Already in cents
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/create-subscription
 * Creates a Stripe Checkout Session for recurring subscriptions
 */
app.post('/api/create-subscription', async (req, res) => {
  try {
    const { priceId, planName, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName || 'Monthly Connection Box',
              description: 'Recurring monthly card subscription',
            },
            unit_amount: amount || 1200,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('[Stripe Subscription Error]', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/config
 * Returns the Stripe publishable key to the client
 */
app.get('/api/config', (req, res) => {
  res.json({
    publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY,
  });
});

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Chella Cards API server running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Stripe mode: ${process.env.STRIPE_SECRET_KEY ? 'Live keys detected' : 'Test mode'}`);
});