import transporter from "../configs/mailConfig.js"

const sendEmail = async(from, to, subject, message) => {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message,
        // html: message,
    }
    return transporter.sendMail(mailOptions)
};

export default sendEmail