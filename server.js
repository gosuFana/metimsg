const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, phone, service, date, time, people } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meetangmsg@gmail.com", // Replace with your Gmail
      pass: "qdnd zdsb opwt rmau",   // Use an App Password (not your normal password)
    },
  });

  const mailOptions = {
    from: email,
    to: "meetangmsg@gmail.com", // Your receiving email
    subject: "New Massage Booking",
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service}
      Date: ${date}
      Time: ${time}
      People: ${people}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    } else {
      res.status(200).send("Email sent successfully!");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
