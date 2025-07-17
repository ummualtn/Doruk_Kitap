const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/products', require('./routes/products'));

// Test endpoint
app.get('/', (req, res) => {
  res.send('API Çalışıyor!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 