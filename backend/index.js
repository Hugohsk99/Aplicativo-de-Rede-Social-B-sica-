// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const postRoutes = require('./routes/posts');

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Conexão MongoDB
mongoose.connect('mongodb://localhost:27017/social_app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rotas
app.use('/posts', postRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
