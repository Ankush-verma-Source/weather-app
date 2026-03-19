# ⚙️ Weather App Backend

The engine behind the Weather App Unified Project. A Node.js/Express server that handles API proxying and production static file serving.

## 🛠️ Core Capabilities

- **Secure Proxying**: Acts as a middleman between the React frontend and OpenWeatherMap.
- **Unified Serving**: In production, the backend serves the frontend's compiled `dist` folder.
- **Forecast Engine**: Handles URL transformation to fetch 5-day forecast data.
- **Error Shield**: Map external API errors to user-friendly messages.

## 📡 API Reference

### `GET /api/weather?city={name}`
Returns current weather data for the specified city.

### `GET /api/forecast?city={name}`
Returns a 5-day / 3-hour forecast for the specified city.

## 🚀 Production Setup

1. **Environment Variables**:
   Create a `.env` file:
   ```env
   PORT=5000
   WEATHER_API_KEY=your_api_key_here
   WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
   ```

2. **Dependencies**:
   ```bash
   npm install
   ```

3. **Start Server**:
   ```bash
   npm start
   ```

## 🛡️ Production Readiness
- Uses `path` for cross-platform file joining.
- Implements `express.static` for high-performance static file serving.
- Handles wildcard routes `*` to support client-side SPA routing.
