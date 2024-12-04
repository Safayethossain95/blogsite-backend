// models/PartnerBrand.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamsSchema = new Schema({
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

});

const TeamsModel = mongoose.model('Teams', teamsSchema);
module.exports = TeamsModel;
