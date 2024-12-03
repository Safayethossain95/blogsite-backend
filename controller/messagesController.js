const ContactUs = require("../models/ContactUs");
const nodemailer = require("nodemailer");
const StuMessages = require("../models/StuMessageModel");
const messagesController = async (req, res) => {
  try {
    // Retrieve all course posts from the database
    const messages = await ContactUs.find();

    // Send the retrieved courses as a response
    res.status(200).send({ success: true, data: messages });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(400).send({ success: false, msg: error.message });
  }
};
const getmessagesController = async (req, res) => {
  try {
    const { email } = req.params; // Extract userid from URL parameters
    const messages = await ContactUs.find({ email: email }); // Fetch messages for the specific user
    res.status(200).json({ success: true, data: messages });
} catch (err) {
    res.status(500).json({ data: err.message });
}
};
const messagespostController = async (req, res) => {
    try {
      // Retrieve all course posts from the database
      const { email, message } = req.body;
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Correct SMTP host for Gmail
        port: 587, // Secure port for TLS
        secure: false, // Use `true` for port 465
        auth: {
          user: "safayet.hossain95@gmail.com", // Your email address
          pass: "fznx ovvf jbww pqfn", // Your email password (App Password for Gmail)
        },
      });
  
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"iLearn" <safayet.hossain95@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "iLearn Query Answer", // Subject line
        text: "iLearn registration", // plain text body
        html: message, // html body
      });
  
      console.log("Message sent: %s", info.messageId); // Log message ID
      res.status(200).json({ success: true, message: "Message sent", messageId: info.messageId });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
    }
  };
  

const messagedeleteController = async (req, res) => {
    try {
        // Extract the course ID from the request parameters
        const { id } = req.params;
        console.log(id)
        // Find the course post by its ID and delete it
        const deletedCourse = await ContactUs.findByIdAndDelete(id);
    
        if (!deletedCourse) {
          // If the course post with the given ID doesn't exist, send a 404 response
          return res.status(404).send({ success: false, msg: "not found." });
        }
    
        // Send a success response with the deleted course post
        res.status(200).send({ success: true, msg: "Message post deleted successfully.", data: deletedCourse });
      } catch (error) {
        // If an error occurs, send an error response
        res.status(400).send({ success: false, msg: error.message });
      }
  };
  const stumessagesController = async (req, res) => {
    
      const { contactusid,indexnum,userid ,answer,question} = req.body;
      
      // Create a new StuMessage document
      const contactidexsists = await ContactUs.find().populate('contactusid', 'answer')
      console.log(contactidexsists)
      // if(contactidexsists){
      //   await StuMessages.updateOne({ contactusid: contactidexsists.contactusid }, { $set: { answer: answer } });
      //   res.status(201).json({ success: true, data: "answer given" });
      // }
      // else{
      //   try{
  
      //     const newMessage = new StuMessages({contactusid:contactusid, userId: userid, indexnum:indexnum,question:question,answer:answer});
      //     console.log(newMessage)
      //     // Save the document to the database
      //     await newMessage.save();
      //     res.status(201).json({ success: true, data: newMessage });
      //   }catch(err){
      //     console.log("hoynai")
      //     res.status(500).json({success:false,message:err.message})
      //   }

      // }
  
  }
  ;
  const getStuMessagesController = async (req, res) => {
    try {
        const messages = await StuMessages.find({}); // Fetch all messages from the database
        res.status(200).json({ success: true, data: messages });
    } catch (err) {
        res.status(500).json({ data: err.message });
    }
};

module.exports = { messagesController,messagespostController,messagedeleteController,stumessagesController ,getStuMessagesController,getmessagesController};