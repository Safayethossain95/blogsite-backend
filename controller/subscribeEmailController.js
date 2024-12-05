const nodemailer = require("nodemailer");

const subscribeEmailController = async (req, res) => {
  const { email } = req.body;

  // Create the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Using 'gmail' automatically sets host and port
    auth: {
      user: "safayet.hossain95@gmail.com", // Use environment variables for security
      pass: "fznx ovvf jbww pqfn", // App Password
    },
  });

  try {
    // Send mail
    const info = await transporter.sendMail({
      from: '"BlogMe" <safayet.hossain95@gmail.com>',
      to: "safayet.hossain95@gmail.com",
      subject: "New Subscriber",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 5px;">
              <h2 style="color: #333333; text-align: center;">New Message</h2>
              <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #4CAF50;">Subscriber:</strong> ${email}</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

module.exports = {
  subscribeEmailController,
};
