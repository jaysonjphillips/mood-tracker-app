const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, MY_NUMBER} = process.env
const twilio = require('twilio')(TWILIO_SID, TWILIO_TOKEN)
const fs = require('fs')

const sendMessage = async (body, to = null) => {
    console.log(`this phone will be sent a message ${to}`)

    const result = await twilio.messages.create({
        to: to, 
        from: TWILIO_NUMBER,
        body: body
    })
}

const phoneValidator = async number => {
    const result = await twilio.lookups.phoneNumbers(number).fetch({type: 'carrier'})
    const {phoneNumber, nationalFormat, carrier} = result
    return carrier.type === 'mobile' && [phoneNumber, nationalFormat]
}

module.exports = {
    sendMessage,
    phoneValidator
}