// Vercel serverless function — creates a Stripe Checkout Session
import Stripe from 'stripe';

export default async function handler(req, res) {
  // CORS headers
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
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items provided' });
    }

    const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['x-forwarded-host'] || req.headers.host}`;
    const originUrl = req.headers.origin || baseUrl;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [`${baseUrl}${item.image}`] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity || 1,
    }));

    const total = lineItems.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0);
    const FREE_THRESHOLD = 2500;

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
}