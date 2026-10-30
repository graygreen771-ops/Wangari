export default async function handler(req, res) {
  // Hardcoded safely on the backend server—never exposed to the frontend/browser
  const projectId = "wangari-3fd1c";
  const apiKey = "AIzaSyCUr_Np-NK6d3sAh8AOq2TDRW64JvLhSRc";

  const { action, path, data } = req.body || req.query;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`;

  try {
    if (req.method === 'GET') {
      const response = await fetch(url);
      if (response.status === 404) return res.status(200).json({ found: null });
      const json = await response.json();
      return res.status(200).json(json);
    } 
    
    if (req.method === 'POST' || req.method === 'PATCH') {
      const response = await fetch(url, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      return res.status(200).json(json);
    }

    if (req.method === 'DELETE') {
      await fetch(url, { method: 'DELETE' });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
