const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const authController = require('./controllers/authController');
const errorController = require('./controllers/errorController');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());

// Rate limiter
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP. Please try again after 30 minutes',
});

app.use('/api', limiter);

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:3000',
  })
);

app.use(fileupload());
app.use(express.json());
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/files', authController.protect, fileRoutes);
app.use(errorController);

module.exports = app;
