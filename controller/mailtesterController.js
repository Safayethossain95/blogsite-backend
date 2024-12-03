const nodemailer = require("nodemailer");

const mailtesterCotroller = async (req, res) => {
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
    try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"iLearn" <safayet.hossain95@gmail.com>', // sender address
        to: "safayet.hossain95@gmail.com", // list of receivers
        subject: "Regstration Successful", // Subject line
        text: "iLearn registration", // plain text body
        html: `<table style="margin-top:40px" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center"><table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"><tr><td align="center" style="padding: 40px 0"><img src="https://i.ibb.co/HDQqLsG/logo.png" alt="logo" border="0"></td></tr><tr><td style="padding: 0 40px; text-align: center"><h1 style="color: #333333; margin-bottom: 20px">Welcome to iLearn!</h1><p style="color: #666666">Dear [Name],</p><p style="color: #666666">We're thrilled to have you join iLearn.</p><p style="color: #666666">With our diverse range of courses and interactive learning tools, you're on your way to mastering new skills and achieving your goals.</p><p style="color: #666666">If you have any questions or need assistance, feel free to reach out to our support team.</p><a href="https://yourwebsite.com" style="display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
              margin-bottom:20px;">Start Learning Now</a></td></tr><tr><td style="padding: 40px;
            text-align: center;
            background-color: #f5f5f5;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;"><p style="color: #666666; font-size: 12px">You're receiving this email because you recently signed up for an iLearn account. If you didn't create an account, please ignore this email.</p></td></tr></table></td></tr></table>`, // html body
      });

      console.log("Message sent: %s", info.messageId); // Log message ID
      return res.json({ message: "Message sent", messageId: info.messageId });
    } catch (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json({ message: "Failed to send message", error: error.message });
    }
  }

  main();
};

module.exports = { mailtesterCotroller };
