const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

const ServicesModel = mongoose.model("Service", ServicesSchema);
module.exports = ServicesModel;
