// Vercel serverless function — newsletter signup
import { execSync } from 'child_process';

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

  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

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

    if (error.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'This email is already subscribed!' });
    }

    res.status(500).json({ error: 'Could not complete signup. Please try again.' });
  }
}