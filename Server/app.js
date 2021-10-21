const express = require('express');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

module.exports = app;
