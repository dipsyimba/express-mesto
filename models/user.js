const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
    default:
      'https://cdn.pixabay.com/photo/2017/07/27/21/37/bitcoin-2546854_1280.png',
  },
});

module.exports = mongoose.model('user', userSchema);
