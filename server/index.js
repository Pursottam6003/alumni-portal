const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');
const path = require('path');
const dbo = require('./db/conn');

const app = express();

app.use(cookies());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: [`http://localhost:${process.env.PORT}`, 'http://localhost:3000'],
    credentials: true
  }));
}

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log('Server listening to port', port, ' Environment:', process.env.NODE_ENV);
  dbo.connectToServer(() => {
    // middlewares for api routes
    app.use(require('./routes/users'));
    app.use(require('./routes/alumni'));

    // middlewares for media routes
    app.use('/media', require('./routes/media'));
  });
});

// serve react frontend (static files) from build folder in production environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}