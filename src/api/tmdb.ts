import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'https://watch-listly.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const TMDB_API_TOKEN = process.env.VITE_TMDB_API_TOKEN;
    if (!TMDB_API_TOKEN) {
      return res.status(500).json({ error: "API Token is missing" });
    }

    const TMDB_BASE_URL = "https://api.themoviedb.org/3";

    const { path, ...query } = req.query;
    if (!path) {
      return res.status(400).json({ error: "Missing 'path' parameter" });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/${path}`, {
      params: query,
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("TMDB request error:", error.response?.data || error.message);
    res.status(500).json({ error: "Server error", details: error.response?.data || error.message });
  }
}
