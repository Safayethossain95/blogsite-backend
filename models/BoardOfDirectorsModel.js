// models/PartnerBrand.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardOfDirectorsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const BoardofDirectors = mongoose.model('Boardofdirectors', boardOfDirectorsSchema);
module.exports = BoardofDirectors;
