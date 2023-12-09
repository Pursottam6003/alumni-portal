const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');
const path = require('path');

const app = express();

const dbo = require('./db/conn');
const { findUserByToken } = require('./helpers/helper');

app.use(cookies());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: [`http://localhost:${process.env.PORT}`, 'http://localhost:3000'],
    credentials: true
  }));
}

// middlewares for routes
app.use(require('./routes/usersnew'));
app.use(require('./routes/alumni'));

// send a file in upload folder when requeted in url without using express.static
app.get('/media/:filename', (req, res) => {
  if (!req.cookies.auth) return res.status(400).json('No jwt provided');

  // check if user is authenticated 
  findUserByToken(req.cookies.auth).then(results => {
    // if (results.length === 0) return res.status(400).json('Invalid jwt');

    // send the file if it exists
    res.sendFile(__dirname + '/media/' + req.params.filename);
  }).catch(err => {
    res.status(400).json(err);
  });
});

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log('Server listening to port', port, ' Environment:', process.env.NODE_ENV);
  dbo.connectToServer();
});

// serve react frontend (static files) from build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}