require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser'); // Import csv-parser to parse CSV files
const axios = require('axios'); // Import axios to make HTTP requests

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

// Endpoint to serve active incidents CSV data
app.get('/api/activeIncidents', (req, res) => {
  const results = [];
  const csvFilePath = path.join(__dirname, 'data', 'tweets.csv');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to read CSV file' });
    });
});

// Endpoint to fetch tweet details by URL
// app.get('/api/tweetDetails', async (req, res) => {
//   try {
//     const { url } = req.query;
//     if (!url) return res.status(400).json({ error: 'No URL provided' });

//     const tweetId = url.split('/').pop(); // Extract tweet ID from URL

//     // Fetch tweet details from Twitter API
//     const response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=created_at&user.fields=username`, {
//       headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN.trim()}` } // Use trimmed token
//     });

//     const tweetData = response.data;
//     const userData = tweetData.includes.users[0]; // Fetch user information

//     res.json({
//       username: userData.username, // Ensure correct field is accessed
//       text: tweetData.data.text,
//       postedDate: tweetData.data.created_at,
//       image: tweetData.data.attachments ? tweetData.data.attachments.media_keys[0] : null // Adjust based on Twitter API response
//     });
//   } catch (err) {
//     console.error('Error fetching tweet details:', err.response ? err.response.data : err.message);
    
//     // Handling different error scenarios
//     if (err.response && err.response.status === 401) {
//       res.status(401).json({ error: 'Unauthorized access - check your Bearer Token' });
//     } else {
//       res.status(500).json({ error: 'Failed to fetch tweet details' });
//     }
//   }
// });

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
