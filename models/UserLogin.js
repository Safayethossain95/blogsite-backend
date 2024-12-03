const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userloginSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  const UserLogin = mongoose.model('Userlogin', userloginSchema);

module.exports = UserLogin;