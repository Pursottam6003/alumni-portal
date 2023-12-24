const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const { findUserByToken, SECRET } = require('../helpers/helper');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/auth');
const expiresInMin = 60;

const db = require('../db/conn').getDb();

users.route('/users/register-admin').post((req, res) => {
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

users.route('/users/update-profile').post(authenticate, (req, res) => {
  const user = req.user;
  const body = req.body;

  const profileKeys = [
    "title", "firstName", "lastName", "dob", "sex", "category", "nationality", "religion", "address", "pincode", "state", "city", "country", "phone", "altPhone", "email", "altEmail", "linkedin", "github", "courseCompleted", "registrationNo", "rollNo", "discipline", "gradYear"
  ];

  const placeholders = profileKeys.map(() => "?").join(", ");
  const values = [user.id_text, ...profileKeys.map(key => body[key])];

  const sql = `
        INSERT INTO profile (userId, ${profileKeys.join(", ")})
        VALUES (?, ${placeholders})
        ON DUPLICATE KEY UPDATE ${profileKeys.map(key => `${key} = VALUES(${key})`).join(", ")}
      `;
  db.query(sql, values, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json({ message: 'Profile updated', error: false });
  });
});

// users.route('/users/update-profile').post((req, res) => {
//   const token = req.cookies.auth;
//   findUserByToken(token).then(results => {
//     const body = req.body;
//     const profileKeys = [
//       "title", "firstName", "lastName", "dob", "sex", "category", "nationality", "religion", "address", "pincode", "state", "city", "country", "phone", "altPhone", "email", "altEmail", "linkedin", "github", "courseCompleted", "registrationNo", "rollNo", "discipline", "gradYear"
//     ]
//     let sql = 'INSERT INTO profile (userId, ';
//     let values = [results[0].id_text];

//     profileKeys.forEach(key => {
//       if (body[key]) {
//         sql += `${key}, `;
//         values.push(body[key]);
//       }
//     })

//     sql = sql.slice(0, -2) + ') VALUES (?, ';
//     profileKeys.forEach(key => {
//       if (body[key]) sql += '?, ';
//     })

//     sql = sql.slice(0, -2) + ') ON DUPLICATE KEY UPDATE ';

//     profileKeys.forEach(key => {
//       if (body[key]) {
//         sql += `${key} = ?, `;
//         values.push(body[key]);
//       }
//     })

//     sql = sql.slice(0, -2);
//     db.query(sql, values, (err, results) => {
//       if (err) throw err;
//       console.log(results);
//       res.status(200).json({ message: 'Profile updated', error: false });
//     })
//   })
// })

users.route('/users/login').post((req, res) => {
  // get json web token from request cookies
  const token = req.cookies.auth;

  findUserByToken(token)
    .then(results => {
      res.clearCookie('auth').json({ messge: 'User already logged in', error: true });
    })
    .catch(err => {
      if (!['No jwt provided', 'Invalid jwt'].includes(err)) {
        return res.status(400).json({ message: `Invalid jwt: ${err}`, error: true });
      }

      const { email, password } = req.body;
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0)
          return res.status(400).json({ message: 'Invalid credentials', error: true });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials', error: true });

          // check if profile exists
          db.query('SELECT * FROM profile WHERE userId = ?', [user.id_text], (err, profileResults) => {
            if (err) throw err;

            const token = jwt.sign({ id: user.id_text }, SECRET, { expiresIn: expiresInMin * 60 });
            let userObj = { id: user.id_text, email: user.email, admin: user.admin };

            if (profileResults.length === 0)
              userObj.isProfileIncomplete = true;
            else
              userObj = { ...userObj, ...profileResults[0] };

            res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({ message: 'User logged in', user: userObj, error: false });
          });
        });
      });
    });
})

// users.route('/users/auth').post((req, res) => {
//   const token = req.cookies.auth;
//   findUserByToken(token)
//     .then(results => {
//       res.status(200).json({ message: 'User authenticated', error: false, admin: results[0].admin });
//     })
//     .catch(err => {
//       res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
//     });
// })

users.route('/users/auth').post(authenticate, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: 'User authenticated', error: false, admin: user.admin });
});

// users.route('/users/logout').post((req, res) => {
//   const token = req.cookies.auth;
//   findUserByToken(token)
//     .then(results => {
//       res.clearCookie('auth').json({ message: 'User logged out', error: false });
//     })
//     .catch(err => {
//       res.clearCookie('auth').status(400).json({ message: 'Invalid jwt', error: true });
//     });
// });

users.route('/users/logout').post(authenticate, (req, res) => {
  res.clearCookie('auth').json({ message: 'User logged out', error: false });
});

users.route('/users/profile').post(authenticate, (req, res) => {
  const user = req.user;
  const sql = 'SELECT * FROM profile WHERE userId = ?';
  db.query(sql, [user.id_text], (err, results) => {
    if (err) throw err;
    if (results.length === 0)
      return res.status(200).json({
        message: 'Profile incomplete',
        error: false,
        user: { id: user.id_text, email: user.email, isProfileIncomplete: true, admin: user.admin },
      });

    res.status(200).json({
      message: 'Profile found',
      error: false,
      user: { ...results[0], isProfileIncomplete: false, admin: user.admin },
    });
  });
})

// users.route('/users/profile').post((req, res) => {
//   const token = req.cookies.auth;
//   findUserByToken(token).then(results => {
//     const sql = 'SELECT * FROM profile WHERE userId = ?';
//     db.query(sql, [results[0].id_text], (err, profileResults) => {
//       if (err) throw err;
//       if (profileResults.length === 0)
//         return res.status(200).json({
//           message: 'Profile incomplete',
//           error: false,
//           user: { id: results[0].id_text, email: results[0].email, isProfileIncomplete: true, admin: results[0].admin },
//         });

//       res.status(200).json({
//         message: 'Profile found',
//         error: false,
//         user: { ...profileResults[0], isProfileIncomplete: false, admin: results[0].admin },
//       });
//     });
//   }).catch(err => {
//     res.status(400).json({ message: `Invalid jwt: ${err}`, error: true });
//   });
// });

module.exports = users;