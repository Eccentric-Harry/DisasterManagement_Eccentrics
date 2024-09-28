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

const runPythonScripts = () => {
  exec(`python "${path.join(__dirname, 'scripts', 'twitter.py')}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing Python script:', error);
      return;
    }

    // Assume the output contains the number of tweets scraped in a pattern
    const tweetCountMatch = stdout.match(/Got (\d+) tweets/);
    if (tweetCountMatch) {
      const tweetCount = tweetCountMatch[1];
      const message = `Scraped ${tweetCount} tweets from Twitter.`;

      // Send SMS with the tweet count
      sendSms(message, '+919305107868') // Your target phone number
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

app.get('/api/activeIncidents', (req, res) => {
  const results = [];
  const csvFilePath = path.join(__dirname, 'scripts', 'data', 'tweets.csv');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);

      // After responding with the JSON, execute the Python script
      runPythonScripts(); // Running the Python script when incidents are retrieved
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to read CSV file' });
    });
});

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

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
