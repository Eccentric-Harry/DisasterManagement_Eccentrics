require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const { exec } = require('child_process');
const cron = require('node-cron');

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const corsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend URL
  credentials: true,
};

const connectDB = require('./config/dbConn');

// Importing routes
const rootRoutes = require('./routes/root');
const authRoutes = require('./routes/authRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const downloadReportRoutes = require('./routes/downloadReportRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '/public')));

// Routes setup
app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/disasters', disasterRoutes);
app.use('/disasters', resourceRoutes);
app.use('/disasters', reportRoutes);
app.use('/disasters', downloadReportRoutes);

// Function to run Python scripts
const runPythonScripts = () => {
  const scripts = ['twitter.py'];
  scripts.forEach(script => {
    exec(`python "${path.join(__dirname, 'scripts', script)}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${script}:`, error);
        return;
      }
      console.log(`${script} output:`, stdout);
      if (stderr) console.error(`${script} error:`, stderr);
    });
  });
};

// Run Python script when the server starts
runPythonScripts();

// Schedule the job to run every 10 minutes
cron.schedule('*/10 * * * *', () => {
  console.log('Running Python scripts...');
  runPythonScripts();
});

// Serve CSV data as JSON (Active Incidents)
app.get('/api/activeIncidents', (req, res) => {
  const results = [];
  const csvFilePath = path.join(__dirname, 'scripts', 'data', 'tweets.csv'); // Path to the CSV file

  // Check if the CSV file exists
  if (!fs.existsSync(csvFilePath)) {
    return res.status(404).json({ error: 'CSV file not found' });
  }

  // Read and parse CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: `Failed to read CSV file: ${err.message}` });
    });
});

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
  console.error(err);
  logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
