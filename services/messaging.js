const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, MY_NUMBER} = process.env
const twilio = require('twilio')(TWILIO_SID, TWILIO_TOKEN)
const MessagingResponse = require('twilio').twiml.MessagingResponse
const fs = require('fs')

const sendMessage = async (body, to = null) => {
    const result = await twilio.messages.create({
        to: MY_NUMBER, 
        from: TWILIO_NUMBER,
        body: body
    })

    if(result) {
        fs.writeFile('result.txt', JSON.stringify(result), error => {
            if(!error) console.log('success')
        })
    } else {
        console.log('something went wrong')
    }
}

module.exports = {
    sendMessage
}