import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 3000;

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

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const originUrl = req.get('origin') || baseUrl;

    // Build line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [`${baseUrl}${item.image}`] : [],
        },
        unit_amount: item.price, // Already in cents
      },
      quantity: item.quantity || 1,
    }));

    const total = lineItems.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0);
    const FREE_THRESHOLD = 2500; // $25.00

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${originUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${originUrl}/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: total >= FREE_THRESHOLD ? 0 : 499, currency: 'usd' },
            display_name: total >= FREE_THRESHOLD ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 8 },
            },
          },
        },
      ],
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

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const originUrl = req.get('origin') || baseUrl;

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
      success_url: `${originUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${originUrl}/cancel`,
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

/**
 * POST /api/subscribe
 * Subscribes a user to the newsletter via team-db
 */
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Insert into team-db
    const escapedName = name.replace(/'/g, "''");
    const escapedEmail = email.replace(/'/g, "''");
    const result = execSync(
      `team-db "INSERT INTO subscribers (name, email) VALUES ('${escapedName}', '${escapedEmail}')"`,
      { encoding: 'utf8', timeout: 10000 }
    ).trim();

    res.json({
      success: true,
      message: 'Welcome to the club!',
      discount_code: 'LAUNCH10',
    });
  } catch (error) {
    console.error('[Subscribe Error]', error.message);

    // Check for duplicate email
    if (error.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'This email is already subscribed!' });
    }

    res.status(500).json({ error: 'Could not complete signup. Please try again.' });
  }
});

// API 404 handler — return JSON for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  next();
});

// Global error handler — ensures API routes always return JSON, not HTML
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
  next(err);
});

// Fallback to index.html for SPA routing (non-API routes only)
app.use((req, res) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    return res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Chella Cards API server running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Stripe mode: ${process.env.STRIPE_SECRET_KEY ? 'Live keys detected' : 'Test mode'}`);
});