// Vercel serverless function — creates a Stripe subscription session
import Stripe from 'stripe';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { priceId, planName, amount } = req.body;

    const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['x-forwarded-host'] || req.headers.host}`;
    const originUrl = req.headers.origin || baseUrl;

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
}