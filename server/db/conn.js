const mysql = require('mysql2');

/** @type {import('mysql').Connection} */
var _db;

// q: process.env not owrking
// a: https://stackoverflow.com/questions/13394140/using-environment-variables-in-node-js-applications
module.exports = {
  connectToServer: function (callback) {
    const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_USER_PASSWORD || 'rootpass',
      database: process.env.DB_NAME || 'alumniDatabase'
    });

    db.connect(function (err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      _db = db;
      console.log('Connected to the MySQL server.');
    })
  },

  getDb: () => _db
};