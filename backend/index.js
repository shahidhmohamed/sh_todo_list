const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
