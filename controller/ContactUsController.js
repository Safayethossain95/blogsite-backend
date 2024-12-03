const ContactUs = require("../models/ContactUs");

const contactuspostCotnroller = async (req, res) => {
  const { name, subject, email, message } = req.body;

  try {
    const newBanner = new ContactUs({
      name,
      subject,
      email,
      message,
    });
    const savedBanner = await newBanner.save();
    res.status(201).json({ data: savedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};


module.exports = {
  contactuspostCotnroller,
};