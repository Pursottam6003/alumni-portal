// upload file using multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// configure multer for different file types and storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname === 'avatar') {
      // cb(null, './server/public/avatars/');
      cb(null, path.join(__dirname, '..', 'public', 'avatars'));
    } else if (file.fieldname === 'sign') {
      // cb(null, './server/private/signatures/'); // Change the destination to a private folder
      cb(null, path.join(__dirname, '..', 'private', 'avatars'));
    } else {
      cb('Error: Invalid fieldname!');
    }
  },
  filename: function(req, file, cb) {
    const userId = req.user.id; // Assuming you have the user ID available in the request object
    const extname = path.extname(file.originalname).toLowerCase();
    cb(null, userId + extname);
  },
  fileFilter: function(req, file, cb) {
    const filetypes = /png|jpg|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Only .png, .jpg, and .webp files are allowed!');
  }
});

// create upload middleware for avatar upload
const uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: 200 * 200 * 5 }
}).single('avatar');

// create upload middleware for signature upload
const uploadSign = multer({
  storage: storage,
  limits: { fileSize: 200 * 200 * 5 }
}).single('sign');

// export upload middleware
module.exports = { uploadAvatar, uploadSign };