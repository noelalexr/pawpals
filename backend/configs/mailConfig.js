import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transportConfig = {
    host: "smtp.gmail.com",
    port: 587,
    tls: {
        chipers: "SSLv3"
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};

const transporter = nodemailer.createTransport(transportConfig);

export default transporter;