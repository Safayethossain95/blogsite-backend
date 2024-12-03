const bcrypt = require("bcryptjs"); // Assuming you're using bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Assuming you use JWT for token generation
const User = require("../models/User.js");

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
    if (user.signup == "true") {
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
        message: "Login successful",
        navigate: "/",
      });
    } else {
      res.status(200).json({
        message: "Not a Verified User",
        navigate: "",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getloginController = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Send the token and a success message
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
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

const checkProtectedLogin = async (req, res) => {
  const token = req.cookies.jwtToken;

if (!token) {
  return res.json({ authenticated: false, message: "No token provided" });
}

jwt.verify(token, "12ef", (err, decoded) => {
  if (err) {
    return res.json({ authenticated: false, message: "Failed to authenticate token" });
  }

  // Token is valid
  return res.json({ authenticated: true, user: decoded });
});
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
  getloginController,
  getlogoutController,
  checkProtectedLogin,
};
