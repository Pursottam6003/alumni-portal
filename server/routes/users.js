const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/auth');
const clearSession = require('../middlewares/clearSession');
const expiresInMin = 60;

const profileKeys = require('../db/schema').profiles;

const db = require('../db/conn').getDb();

users.route('/users/register-admin').post((req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if ((!email || !password || !confirmPassword) || password !== confirmPassword) {
    return next(Error('Invalid API usage / Passwords do not match'));
  } else {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return next(err);

      const insertQuery = "INSERT INTO users (email, password, role) VALUES (?, ?)";
      db.query(insertQuery, [email, hashedPassword, 'admin'], (err, result) => {
        if (err) return next(err);
        console.log('New admin registered: ', result);

        res.status(200).json({
          success: true,
          message: 'User registered'
        });
      });
    });
  }
})

users.route('/users/register').post((req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if ((!email || !password || !confirmPassword) || password !== confirmPassword) {
    return next('Invalid API usage / Passwords do not match');
  } else {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return next(err);

      const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
      db.query(insertQuery, [email, hashedPassword], (err, result) => {
        if (err) return next(err);
        console.log('New user registered: ', result);

        res.status(200).json({
          success: true,
          message: 'User registered'
        });
      });
    });
  }
})

users.route('/users/login').post(clearSession, (req, res, next) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return next(err);

    if (results.length === 0)
      return res.status(400).json({ message: 'Invalid credentials', error: true });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials', error: true });

      // check if profile exists
      db.query('SELECT * FROM profiles WHERE userId = ?', [user.id], (err, profileResults) => {
        if (err) return next(err);

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: expiresInMin * 60 });
        let userObj = { id: user.id, email: user.email, admin: user.admin };

        if (profileResults.length === 0)
          userObj.isProfileIncomplete = true;
        else
          userObj = { ...userObj, ...profileResults[0] };

        res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({ message: 'User logged in', user: userObj, error: false });
      });
    });
  });
})

users.route('/users/auth').post(authenticate, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: 'User authenticated', error: false, admin: user.admin });
});

users.route('/users/logout').post(authenticate, (req, res) => {
  res.clearCookie('auth').json({ message: 'User logged out', error: false });
});

users.route('/users/profile').post(authenticate, (req, res, next) => {
  const user = req.user;
  const sql = 'SELECT * FROM profiles WHERE userId = ?';
  db.query(sql, [user.id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0)
      return res.status(200).json({
        message: 'Profile incomplete',
        error: false,
        user: { id: user.id, email: user.email, isProfileIncomplete: true, role: user.role },
      });

    res.status(200).json({
      message: 'Profile found',
      error: false,
      user: { ...results[0], isProfileIncomplete: false, role: user.role },
    });
  });
})

users.route('/users/update-profile').post(authenticate, (req, res) => {
  const user = req.user;
  const body = req.body;

  const keys = profileKeys.filter(key => body[key] !== undefined);

  const placeholders = keys.map(() => "?").join(", ");
  const values = [user.id, ...keys.map(key => body[key])];
  const sql = `
    INSERT INTO profiles (userId, ${keys.join(", ")})
    VALUES (?, ${placeholders})
    ON DUPLICATE KEY UPDATE ${keys.map(key => `${key} = VALUES(${key})`).join(", ")}
  `;
  db.query(sql, values, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json({ message: 'Profile updated', error: false });
  });
});

module.exports = users;