// api/login.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin } = req.body;
  const SECRET_PIN = "8893"; // Hardcoded directly in serverless backend file

  if (pin === SECRET_PIN) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: "Wrong PIN" });
  }
}
