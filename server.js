const express = require('express'); 
const mongodb = require('./data/database');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', require('./route/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
});