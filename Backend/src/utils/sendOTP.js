require("dotenv").config();
const nodemailer = require("nodemailer");

const sendOTP = async ({ email, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            html,
        });

        console.log("Email sent successfully: ", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

module.exports = sendOTP;
