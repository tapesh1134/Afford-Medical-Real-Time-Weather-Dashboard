const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const city = req.query.city;
  const apiKey = "7a7686edd13bc44742feb516c1fc9ce9";

  if (!city) {
    return res.status(400).json({ error: 'City requires' });
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
      res.status(404).json({ error: 'no city' });
    } else {
      res.status(500).json({ error: 'something went wrong' });
    }
  }
});

module.exports = router;
