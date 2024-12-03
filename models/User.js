const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber:{
    type:String,
    required:true
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  student: {
    type: Boolean,
    required: true,
  },
  uniqueId: { type: String, required: true, unique: true },
  signup:{
    type:String,
    required:false,
    default:"false"
  },
  branch:{
    type:String,
    required:true
  }
});

// Mongoose middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it has been modified or is new
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plain password with the hashed password
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Compare the candidate password with the hashed password
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
