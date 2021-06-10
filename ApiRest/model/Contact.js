'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Person = new Schema({
  name: {
    type: String
  },
  surnames: {
    type: String
  },
  age: {
    type: Number
  },
  dni: {
    type: String
  },
  birthday: {
    type: Date
  },
  favouriteColour: {
    type: String
  },
  sex: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  collection: 'contacts'
})

module.exports = mongoose.model('Contact', Person)

