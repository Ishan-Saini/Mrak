const express = require('express');
const errorController = require('./controllers/errorController');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use(errorController);

module.exports = app;
