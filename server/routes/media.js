const media = require('express').Router();
const authenticate = require('../middlewares/auth');
const path = require('path');
const fs = require('fs');

media.get('/:filename', authenticate, (req, res) => {
  // send the file if it exists
  if (fs.existsSync(path.join(__dirname, '../media', req.params.filename))) {
    res.sendFile(__dirname + '../media/' + req.params.filename);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
})

module.exports = media;