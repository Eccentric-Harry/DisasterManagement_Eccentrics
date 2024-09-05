require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import custom modules using CommonJS
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

// Import routes using CommonJS
const rootRoutes = require('./routes/root');
const authRoutes = require('./routes/authRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const downloadReportRoutes = require('./routes/downloadReportRoutes');

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware setup
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '/public')));

// Routes setup
app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use(disasterRoutes);
app.use('/disasters', resourceRoutes);
app.use('/disasters', reportRoutes);
app.use('/disasters', downloadReportRoutes);

// Fallback for non-existing routes
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '/views/404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not found' });
  } else {
    res.type('txt').send('404 Not found');
  }
});

// Error handling middleware
app.use(errorHandler);

// Database connection events
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
