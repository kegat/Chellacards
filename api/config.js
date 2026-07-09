// Vercel serverless function — returns Stripe publishable key
export default function handler(req, res) {
  res.json({
    publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51Tg8G63dnX8tL64cBpnvmw109w3TT9F6xGWPL5SFW9ybtZyGSszEj4BJLi5IKxh0dWH4DEtf5OgXg4NUvD9MRvtP00zJwgT3Ch',
  });
}