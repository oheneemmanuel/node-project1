const express = require('express'); 
const mongodb = require('./data/database');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// this was for the CORS error handling and for swagger to work properly
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next(); 
});

// Routes
app.use('/', require('./route/index'));

// Global error handling middleware
app.use(async (err, req, res, next) => {

    console.error(`Error at: "${req.path}": ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
});