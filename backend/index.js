const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Weather API proxy
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const apiUrl = process.env.WEATHER_API_URL || "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = (process.env.WEATHER_API_KEY || "").trim();

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';
    res.status(status).json({ error: message });
  }
});

// Forecast API proxy
app.get('/api/forecast', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const apiUrl = (process.env.WEATHER_API_URL || "https://api.openweathermap.org/data/2.5/weather").replace('/weather', '/forecast');
  const apiKey = (process.env.WEATHER_API_KEY || "").trim();

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';
    res.status(status).json({ error: message });
  }
});

// Serve frontend if it exists
const frontendPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  // SPA Fallback
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Simple welcome for API only
  app.get('/', (req, res) => {
    res.json({ message: 'Weather App API is running', endpoints: ['/api/weather', '/api/forecast'] });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
