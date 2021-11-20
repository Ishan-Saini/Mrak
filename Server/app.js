const express = require('express');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use(errorController);

module.exports = app;
