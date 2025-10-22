import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// (solo desarrollo)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = () => {
  return {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
};

export const transporter = nodemailer.createTransport(config());
