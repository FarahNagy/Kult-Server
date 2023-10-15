const express = require("express");
const sendgrid = require("@sendgrid/mail");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const apiKey = process.env.SEND_GRID_KEY; // Replace with your SendGrid API key
  sendgrid.setApiKey(apiKey);
  console.log(apiKey);
  const { firstName, lastName, email, phone, message } = req.body;
  // Data Validation
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: "Incomplete data provided" });
  }

  // Additional data validation logic can be added here as needed

  // Construct the email message
  const msg = {
    to: "farahnagy529@gmail.com",
    from: "kultcreativeproductions@gmail.com",
    subject: "New Client ya Kult",
    text: `Hi my name is ${firstName} ${lastName}\nPhone: ${phone}\n${message}\nEmail: ${email}`,
  };
  console.log(msg);

  // Send the email
  sendgrid
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error("Email sending error:", error.message);
      res.status(500).json({ error: "Email could not be sent" });
    });
});
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
