import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Thermometer, CloudRain, Sun, Cloud, ThermometerSun } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const WEATHER_API_URL = `${BACKEND_URL}/api/weather`;
const FORECAST_URL = `${BACKEND_URL}/api/forecast`;

const App = () => {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBackground = (weather) => {
    document.body.className = '';
    const main = weather?.toLowerCase();
    if (main?.includes('clear')) document.body.classList.add('sunny');
    else if (main?.includes('cloud')) document.body.classList.add('cloudy');
    else if (main?.includes('rain') || main?.includes('drizzle')) document.body.classList.add('rainy');
    else if (main?.includes('snow')) document.body.classList.add('snowy');
    else if (main?.includes('thunderstorm')) document.body.classList.add('stormy');
    else document.body.classList.add('default');
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherRes = await fetch(`${WEATHER_API_URL}?city=${cityName}`);
      if (!weatherRes.ok) throw new Error('City not found');
      const weather = await weatherRes.json();
      setWeatherData(weather);
      updateBackground(weather.weather[0].main);

      // Fetch forecast
      const forecastRes = await fetch(`${FORECAST_URL}?city=${cityName}`);
      if (forecastRes.ok) {
        const forecast = await forecastRes.json();
        // Filter for one forecast per day (around noon)
        const daily = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));
        setForecastData(daily);
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
      document.body.className = 'default';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.city.value.trim();
    if (input) {
      setCity(input);
      fetchWeather(input);
    }
  };

  const getWeatherIcon = (main, size = 64) => {
    switch (main?.toLowerCase()) {
      case 'clouds': return <Cloud size={size} className="text-blue-100" strokeWidth={1.5} />;
      case 'rain': return <CloudRain size={size} className="text-blue-300" strokeWidth={1.5} />;
      case 'clear': return <Sun size={size} className="text-yellow-200" strokeWidth={1.5} />;
      default: return <Sun size={size} className="text-yellow-200" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSearch} className="search-container">
        <input
          name="city"
          type="text"
          placeholder="Search city..."
          className="search-input"
          defaultValue={city}
        />
        <button type="submit" className="search-button">
          <Search size={20} />
        </button>
      </form>

      {loading && (
        <div className="glass-card text-center">
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="glass-card text-center">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {weatherData && !loading && (
        <div className="glass-card">
          <div className="weather-info">
            <div className="main-weather">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={24} className="text-blue-400" />
                <h1 className="city-name">{weatherData.name}, {weatherData.sys.country}</h1>
              </div>
              <p className="weather-desc">{weatherData.weather[0].description}</p>
              <div className="temp-container">
                <span className="temperature">{Math.round(weatherData.main.temp)}</span>
                <span className="unit">°</span>
              </div>
              <div className="mt-8">
                {getWeatherIcon(weatherData.weather[0].main, 120)}
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">
                  <Thermometer size={18} />
                  <span>Feels Like</span>
                </div>
                <div className="detail-value">{Math.round(weatherData.main.feels_like)}°C</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <Droplets size={18} />
                  <span>Humidity</span>
                </div>
                <div className="detail-value">{weatherData.main.humidity}%</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <Wind size={18} />
                  <span>Wind Speed</span>
                </div>
                <div className="detail-value">{weatherData.wind.speed} m/s</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <ThermometerSun size={18} />
                  <span>Pressure</span>
                </div>
                <div className="detail-value">{weatherData.main.pressure} hPa</div>
              </div>
            </div>
          </div>

          {forecastData && (
            <div className="forecast-container animate-fade-in">
              {forecastData.map((item, index) => (
                <div key={index} className="forecast-card">
                  <div className="forecast-day">
                    {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="my-4">
                    {getWeatherIcon(item.weather[0].main, 48)}
                  </div>
                  <div className="forecast-temp">{Math.round(item.main.temp)}°</div>
                  <div className="weather-desc text-xs mt-1">{item.weather[0].description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
