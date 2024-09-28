require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC1adbe0aa5c17891894a8246918fef500'; 
const authToken = process.env.TWILIO_AUTH_TOKEN || '014ea4fd80b1f27a57d9c1c454876c73'; 
const client = require('twilio')(accountSid, authToken); 

const sendSms = (messageBody, toNumber) => {
  return client.messages
    .create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER || '+12705600993', 
      to: toNumber,
    })
    .then((message) => {
      console.log(`Message sent: ${message.sid}`);
      return message.sid;
    })
    .catch((error) => {
      console.error('Error sending SMS:', error.message);
      throw error;
    });
};

module.exports = sendSms;
