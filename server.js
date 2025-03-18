const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

app.get('/api/tmdb', async (req, res) => {
  try {
    const { path, ...query } = req.query;
    const TMDB_API_TOKEN = process.env.VITE_TMDB_API_TOKEN;
    
    if (!TMDB_API_TOKEN) {
      return res.status(500).json({ error: "API Token is missing" });
    }

    if (!path) {
      return res.status(400).json({ error: "Missing 'path' parameter" });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      params: query,
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error("Ошибка запроса к TMDB:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: "Ошибка сервера", 
      details: error.response?.data || error.message 
    });
  }
});

const PORT = process.env.PORT || 3001 ;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});