const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo:{
      lat: String,
      lng: String
    }
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  }
});

// Add unique index to email and username fields
usersSchema.index({ email: 1, username: 1 }, { unique: true });

module.exports = mongoose.model('User', usersSchema, 'Users');
