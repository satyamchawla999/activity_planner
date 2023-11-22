const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'satyamchawla999@gmail.com',
        pass: 'ffhfmflipuuhnduo'
    }
})

module.exports = mailTransporter

// let details = {
//     from: 'satyamchawla999@gmail.com',
//     to: 'satyam.1130@zenmonk.tech',
//     subject: 'Hello',
//     // Use the html property to specify the HTML content of the email
//     html: '<h1>Hello</h1><p>This is an HTML email.</p>'
// }

// mailTransporter.sendMail(details, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Email sent!')
//     }
// })

