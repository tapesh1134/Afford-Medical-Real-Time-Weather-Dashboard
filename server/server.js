const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const weatherRoute = require('./routes/weather');
app.use('/weather', weatherRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
