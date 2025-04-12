const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'city requires' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const { main, weather, wind, name } = response.data;

    res.json({
      city: name,
      temperature: main.temp,
      condition: weather[0].main,
      icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
      humidity: main.humidity,
      windSpeed: wind.speed,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'city not exist' });
    } else {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
});

router.get('/forecast', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'city requires' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const forecastResponse = await axios.get(url);

    res.json(forecastResponse.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'failed to fetch' });
  }
});

module.exports = router;
