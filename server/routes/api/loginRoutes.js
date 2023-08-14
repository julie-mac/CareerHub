const express = require('express');
const router = express.Router();
const User = require('../../models/User');
require('dotenv').config({path: '.env'});
const telnyx = require('telnyx')(process.env.TELNYX_API_KEY);

router.post('/forgotpassword', async (request, response) => {
  const { username } = request.body;

  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      return response.json({error: "Email not found"});
    }

    // If email found, send a verification SMS to the associated phone number
    const telnyx_response = await telnyx.verifications.create({
      verify_profile_id: process.env.TELNYX_VERIFY_PROFILE_ID,
      phone_number: user.phoneNumber,
      type: "sms",
      timeout: 300
    });

    // You might want to handle the response, but for now, redirect to a page where the user can input the code
    response.json({ message: "Verification code was sent to phone number ending in "+ telnyx_response.data.phone_number.slice(-4), userId: user._id});

  } catch (error) {
    console.log("Error:", error);
    response.status(500).send(error);
  }
});

router.post('/verifycode', async(request, response) => {
  const { username, code } = request.body;

  try {
    const user = await User.findOne({ email: username });
    
    if (!user) {
      response.json({error: "Email not found"});
    }

    const telnyx_response = await telnyx.verifications.byPhoneNumber.submit(user.phoneNumber, {code:code, verify_profile_id: process.env.TELNYX_VERIFY_PROFILE_ID});
    console.log(telnyx_response.data.response_code);
    if (telnyx_response.data.response_code == "accepted") {
      // Redirect user to a page where they can reset their password
      response.json({ message: "Code accepted. Redirecting to password reset page..."});
    } else {
      response.json({error: "Incorrect code. Please try again"});
    }

  } catch (error) {
    console.log("Error:", error);
    response.status(500).send(error);
  }
});
module.exports = router;