const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, MY_NUMBER} = process.env
const twilio = require('twilio')(TWILIO_SID, TWILIO_TOKEN)
const MessagingResponse = require('twilio').twiml.MessagingResponse
const LookupsClient 