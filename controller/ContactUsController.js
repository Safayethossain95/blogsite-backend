
const nodemailer = require("nodemailer");
const contactuspostCotnroller = async (req, res) => {
  const { name, subject, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Correct SMTP host for Gmail
    port: 587, // Secure port for TLS
    secure: false, // Use `true` for port 465
    auth: {
      user: "safayet.hossain95@gmail.com", // Your email address
      pass: "fznx ovvf jbww pqfn", // Your email password (App Password for Gmail)
    },
  });

  async function main() {
    console.log(email, "email");
    try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"BlogMe" <safayet.hossain95@gmail.com>', // sender address
        to: 'safayet.hossain95@gmail.com', // list of receivers
        subject: "Regstration Successful", // Subject line
        text: "BlogMe registration", // plain text body
        html: ` 
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333333; text-align: center;">New Message</h2>
          <div style="border-top: 2px solid #4CAF50; margin-bottom: 20px;"></div>
          <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #4CAF50;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #4CAF50;">Subject:</strong> ${subject}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #4CAF50;">Email:</strong> ${email}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #4CAF50;">Message:</strong><br> ${message}</p>
        </div>
      </body>
    </html>
  ` });

      console.log("Message sent: %s", info.messageId); // Log message ID
      return res.json({
        message: "Message sent and sign up complete",
        messageId: info.messageId,
      });
    } catch (error) {
      console.error("Error sending email: ", error);
      return res
        .status(500)
        .json({ message: "Failed to send message", error: error.message });
    }
  }
  try {
    main();
  } catch (err) {
    console.error("Error sending email: ", err);
    return res
      .status(500)
      .json({ message: "Failed to send message", error: error.message });
  }
};

module.exports = {
  contactuspostCotnroller,
};
