export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin } = req.body;
  const SECRET_PIN = process.env.STAFF_PIN || "4321"; // Stored securely on Vercel, never exposed to browser

  if (pin === SECRET_PIN) {
    return res.status(200).json({ success: true, token: "authorized_session_token" });
  } else {
    return res.status(401).json({ success: false, error: "Wrong PIN" });
  }
}
