const bcrypt = require("bcryptjs"); // Assuming you're using bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Assuming you use JWT for token generation
const User = require("../models/User.js");
const { v4: uuidv4 } = require('uuid'); 
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", navigate: "/login" });
    }
    if (isMatch) {
      // Generate a token (assuming you are using JWT)
      const token = jwt.sign({ userId: user._id }, "12ef", {
        expiresIn: "1h",
      });
      console.log(token);
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: true, // Use this in production with HTTPS
        sameSite: "None", // or 'Lax' or 'None'
        maxAge: 3600000, // 1 hour in milliseconds
      });
      res.status(200).json({
        success: true,
        message: "Login successful"
      });
    } else {
      res.status(200).json({
        message: "Not a Verified User",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getlogoutController = async (req, res) => {
  res.cookie("jwtToken", "", {
    httpOnly: true,
    secure: true, // Use this in production with HTTPS
    sameSite: "None", // or 'Lax' or 'None'
    expires: new Date(0), // Set the expiration date to the past
  });
  res.status(200).json({ success: true, data: "Logged out" });
};

const signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;  // Extract email and password from request body
    const uniqueId = uuidv4();             // Generate a unique ID for the new user

    // Create a new user instance
    const newUser = new User({
      email,
      password,
      uniqueId
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and user data (excluding sensitive info like password)
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: {
        email: newUser.email,
        uniqueId: newUser.uniqueId
      }
    });
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message  // Send error details for debugging (consider removing in production)
    });
  }
};

// const checkProtectedLogin = async (req,res) =>{
//   const token = req.cookies.jwtToken;

//   if (!token) {
//       return res.status(401).json({message:'Access Denied'});
//   }

//   try {
//       const verified = jwt.verify(token, '12ef');
//       req.user = verified;
//       res.status(200).json({success:true,data:"verified",tk:token});
//   } catch (err) {
//       res.status(400).json({message:'Invalid Token'});
//   }
// }

module.exports = {
  loginController,
  getlogoutController,
  signUpController
};
