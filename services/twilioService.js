const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const twilioPhoneNumber = process.env.Twilio_Phone;

const client = new twilio(accountSid, authToken);

const makeVoiceCall = async (toPhoneNumber) => {
  try {
    const call = await client.calls.create({
      url: process.env.Twilio_URL, 
      to: toPhoneNumber,
      from: twilioPhoneNumber,
    });

    return call.status;
  } catch (error) {
    console.error('Twilio Call Error:', error);
    return 'error';
  }
};

module.exports = {
  makeVoiceCall,
};
