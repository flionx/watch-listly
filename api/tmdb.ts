import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://watch-listly.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
    if (!TMDB_API_TOKEN) {
      res.status(500).json({ error: "API Token is missing" });
      return;
    }

    const TMDB_BASE_URL = "https://api.themoviedb.org/3";

    const path = req.query.path as string;
    if (!path) {
      res.status(400).json({ error: "Missing 'path' parameter" });
      return;
    }

    const response = await axios.get(`${TMDB_BASE_URL}/${path}`, {
      params: req.query,
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("TMDB request error:", error.response?.data || error.message);
    res.status(500).json({ error: "Server error", details: error.response?.data || error.message });
  }
}
