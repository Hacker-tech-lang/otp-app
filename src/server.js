const express = require('express');
const bodyParser = require('body-parser');
const { totp } = require('otplib');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const secret = 'MY_SECRET'; // Use a secure secret in a real application

// Route to generate and send OTP
app.get('/generate-otp', (req, res) => {
  const otp = totp.generate(secret);
  console.log('Generated OTP:', otp);
  
  // Simulate sending OTP to the user
  res.json({ message: `OTP sent successfully! (OTP: ${otp})` });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  const isValid = totp.check(otp, secret);

  if (isValid) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
