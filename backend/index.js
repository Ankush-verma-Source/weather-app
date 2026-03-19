const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Proxy endpoint for weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(process.env.WEATHER_API_URL, {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
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

// Proxy endpoint for forecast data
app.get('/api/forecast', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(process.env.WEATHER_API_URL.replace('/weather', '/forecast'), {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
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

// Serve frontend static files in production
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Fallback to index.html for SPA routing
// Using app.use() without a path at the end to catch-all 
// This avoids Express 5 path-to-regexp syntax issues
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
