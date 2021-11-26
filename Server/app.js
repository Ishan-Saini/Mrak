const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorController = require('./controllers/errorController');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:3000',
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/files', fileRoutes);
app.use(errorController);

module.exports = app;
