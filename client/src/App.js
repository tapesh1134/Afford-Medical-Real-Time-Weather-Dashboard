import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);

    try {
      const res = await axios.get(`http://localhost:8000/?city=${city}`);
      setWeather(res.data);
      const forecastres = await axios.get(`http://localhost:8000/forecast?city=London`);

      const select = forecastres.data.list.filter((_, idx) => idx % 8 === 0);
      setForecast(select);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('city not exist');
      } else {
        setError('failed to fetch');
      }
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Afford Medical: Real-Time Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5 Day Forecast</h3>
          {forecast.map((item, index) => (
            <ForecastCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
