// api/db.js
export default async function handler(req, res) {
  const projectId = "wangari-3fd1c";
  const apiKey = "AIzaSyCUr_Np-NK6d3sAh8AOq2TDRW64JvLhSRc";

  const path = req.query.path || (req.body && req.body.path);
  if (!path) return res.status(400).json({ error: "Missing path" });

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`;

  try {
    if (req.method === 'GET') {
      const response = await fetch(url);
      if (response.status === 404) return res.status(200).json({ found: null });
      const json = await response.json();
      return res.status(response.status).json(json);
    } 
    
    if (req.method === 'POST' || req.method === 'PATCH') {
      const response = await fetch(url, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body.data)
      });
      const json = await response.json();
      return res.status(response.status).json(json);
    }

    if (req.method === 'DELETE') {
      const response = await fetch(url, { method: 'DELETE' });
      return res.status(response.status).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
