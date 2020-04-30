const sg = require('@sendgrid/mail')
const {SENDGRID_API_KEY, FROM_ADDRESS} = process.env

sg.setApiKey(SENDGRID_API_KEY)

module.exports = {
    sendEmail: (to, subject, body) => {
        sg.send({
            to: to,
            from: FROM_ADDRESS,
            subject: subject,
            text: body
        })
    }
}