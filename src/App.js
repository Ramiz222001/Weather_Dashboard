import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import { fetchWeather, fetchForecast } from './utils/api';
import ForecastChart from './components/ForecastChart';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');
  const [cityName, setCityName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // 🌙

  const handleCitySearch = async (city) => {
    setSearchInput(city);
    setCityName(city);
    setError('');
    setWeatherData(null);
    setForecastData(null);
    setLoading(true);

    try {
      const [current, forecast] = await Promise.all([
        fetchWeather(city, unit),
        fetchForecast(city, unit),
      ]);

      setWeatherData(current);
      setForecastData(forecast);

      setSearchHistory((prev) =>
        prev.includes(city) ? prev : [city, ...prev.slice(0, 4)]
      );
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please check city name or try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityName) {
      handleCitySearch(cityName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center' }}>🌤 Weather Dashboard</h1>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
            Switch to {unit === 'metric' ? '°F' : '°C'}
          </button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={() => handleCitySearch(searchInput)}
          suggestions={searchHistory}
        />


        {searchHistory.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <h3>Recent Searches:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {searchHistory.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySearch(city)}
                  className="recent-search-btn"
                >
                  {city}
                </button>

              ))}
            </div>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {loading && (
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <div className="spinner" />
            <p>Loading weather data...</p>
          </div>
        )}

        {weatherData && (
          <div className="fade-in">
            <WeatherCard data={{ ...weatherData, unit }} />
          </div>
        )}

        {forecastData && !loading && (
          <div className="fade-in">
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                marginTop: '2rem',
              }}
            >
              <div style={{ minWidth: '400px', flexShrink: 0 }}>
                <ForecastChart data={forecastData} unit={unit} type="temp" />
              </div>
              <div style={{ minWidth: '400px', flexShrink: 0 }}>
                <ForecastChart data={forecastData} unit={unit} type="humidity" />
              </div>
              <div style={{ minWidth: '400px', flexShrink: 0 }}>
                <ForecastChart data={forecastData} unit={unit} type="wind" />
              </div>
            </div>

            <div style={{ minWidth: '400px', flexShrink: 0 }}>
              <ForecastList data={forecastData} unit={unit} darkMode={darkMode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
