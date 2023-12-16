const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const { findUserByToken, SECRET } = require('../helpers/helper');
const jwt = require('jsonwebtoken');
const expiresInMin = 60;

const getDb = require('../db/conn').getDb;

users.route('/users/register-admin').post((req, res) => {
  const db = getDb();
  const { email, password, confirmPassword } = req.body;
  console.log('Signing up: ', req.body);

  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    })
  } else {
    // check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) throw err;
      // email already exists
      if (results.length > 0) {
        return res.status(400).send({ message: 'Email already exists' });
      }

      // hash user password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const insertQuery = "INSERT INTO users (id, email, password, admin) VALUES (UNHEX(REPLACE(UUID(),'-','')), ?, ?, ?)";
        db.query(insertQuery, [email, hashedPassword, true], (err, result) => {
          if (err) throw err;
          console.log(result);

          res.status(200).json({
            success: true,
            message: 'Admin registered'
          });
        });
      });
    });
  }
})

users.route('/users/register').post((req, res) => {
  const db = getDb();
  const { email, password, confirmPassword } = req.body;
  console.log('Signing up: ', req.body);

  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    })
  } else {
    // check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) throw err;
      // email already exists
      if (results.length > 0) {
        return res.status(400).send({ message: 'Email already exists' });
      }

      // hash user password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const insertQuery = "INSERT INTO users (id, email, password) VALUES (UNHEX(REPLACE(UUID(),'-','')), ?, ?)";
        db.query(insertQuery, [email, hashedPassword], (err, result) => {
          if (err) throw err;
          console.log(result);

          res.status(200).json({
            success: true,
            message: 'User registered'
          });
        });
      });
    });
  }
})

users.route('/users/login').post((req, res) => {
  // get json web token from request cookies
  const token = req.cookies.auth;

  findUserByToken(token)
    .then(results => {
      res.clearCookie('auth').json({ messge: 'User already logged in', error: true });
    })
    .catch(err => {
      if (err === 'No jwt provided' || err === 'Invalid jwt') {
        const { email, password } = req.body;
        const db = getDb();
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, results) => {
          if (err) throw err;

          if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                const token = jwt.sign({ id: user.id_text }, SECRET, { expiresIn: expiresInMin * 60 });
                const userObj = { id: user.id_text, email: user.email, admin: user.admin };

                res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({ message: 'User logged in', user: userObj, error: false });
              } else {
                res.status(400).json({ message: 'Invalid credentials', error: true });
              }
            });
          } else {
            res.status(400).json({ message: 'Invalid credentials', error: true });
          }
        });
      } else {
        res.status(400).json({ message: 'Invalid jwt', error: true });
      }
    });
})

users.route('/users/auth').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token)
    .then(results => {
      res.status(200).json({ message: 'User authenticated', error: false, admin: results[0].admin });
    })
    .catch(err => {
      res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
    });
})

users.route('/users/logout').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token)
    .then(results => {
      res.clearCookie('auth').json({ message: 'User logged out', error: false });
    })
    .catch(err => {
      res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
    });
});

users.route('/users/profile').post((req, res) => {
  const token = req.cookies.auth;
  findUserByToken(token).then(results => {
    const db = getDb();
    const sql = 'SELECT * FROM profile WHERE userId = ?';
    db.query(sql, [results[0].id_text], (err, profileResults) => {
      if (err) throw err;
      if (profileResults.length === 0)
        return res.status(200).json({
          message: 'Profile incomplete',
          error: false,
          user: { id: results[0].id_text, email: results[0].email, isProfileIncomplete: true, admin: results[0].admin },
        });
      res.status(200).json({
        message: 'Profile found',
        error: false,
        user: { ...profileResults[0], isProfileIncomplete: false, admin: results[0].admin },
      });
    });
  }).catch(err => {
    res.status(400).json({ message: `Invalid jwt: ${err}`, error: true });
  });
});

module.exports = users;