const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
