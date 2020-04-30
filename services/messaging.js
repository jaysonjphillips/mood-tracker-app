const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, MY_NUMBER} = process.env
const twilio = require('twilio')(TWILIO_SID, TWILIO_TOKEN)
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

const phoneValidator = async number => {
    const result = await twilio.lookups.phoneNumbers(number).fetch({type: 'carrier'})
    const {phoneNumber, nationalFormat, carrier} = result
    return carrier.type === 'mobile' && [phoneNumber, nationalFormat]
}

module.exports = {
    sendMessage,
    phoneValidator
}