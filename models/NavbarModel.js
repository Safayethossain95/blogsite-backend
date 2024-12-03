const mongoose = require('mongoose');



const menuSchema = new mongoose.Schema({
  menuId: { type: Number, required: true },
  menuName: { type: String, required: true },
  
});

module.exports = mongoose.model('Navbar', menuSchema);
