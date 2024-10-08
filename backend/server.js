require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser'); 
const axios = require('axios'); 
const { exec } = require('child_process'); // Needed to run the Python script
const cron = require('node-cron'); // For scheduling tasks

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const sendSms = require('./sendSms'); 

const rootRoutes = require('./routes/root');
const authRoutes = require('./routes/authRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const downloadReportRoutes = require('./routes/downloadReportRoutes');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use(disasterRoutes);
app.use('/disasters', resourceRoutes);
app.use('/disasters', reportRoutes);
app.use('/disasters', downloadReportRoutes);

// Function to run the Python script
const runPythonScripts = () => {
  exec(python `${path.join(__dirname, 'scripts', 'twitter.py')}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing Python script:', error);
      return;
    }

    const tweetCountMatch = stdout.match(/Got (\d+) tweets/);
    if (tweetCountMatch) {
      const tweetCount = tweetCountMatch[1];
      const message = `ALERT! Action Needed. 
      Recieved ${tweetCount} Reported Incidents.`;

      
      sendSms(message, '+919305107868') 
        .then((sid) => {
          console.log(`SMS sent successfully with SID: ${sid}`);
        })
        .catch((error) => {
          console.error('Failed to send SMS:', error);
        });
    }

    if (stderr) console.error('Python script stderr:', stderr);
  });
};

// Schedule the Python script to run every 5 minutes using node-cron
cron.schedule('*/5 * * * *', () => {
  console.log('Running Twitter scraping every 5 minutes');
  runPythonScripts();
});

// Route to get active incidents from the CSV file
app.get('/api/activeIncidents', (req, res) => {
  const results = [];
  const csvFilePath = path.join(__dirname, 'scripts', 'data', 'tweets.csv');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);

      // Execute the Python script after responding with JSON
      runPythonScripts(); // This will scrape Twitter data again when the API is called
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to read CSV file' });
    });
});

// Catch-all route for 404 errors
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

app.use(errorHandler);

// Connect to MongoDB and start the server
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}, 'mongoErrLog.log'`);
});