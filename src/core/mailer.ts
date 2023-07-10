import { render } from "mjml-react";
import { ReactElement } from "react";

const nodemailer = require("nodemailer");

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};

const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_SERVER,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

const sendMessage = async (message: string) => {
  const mailData = {
    from: {
      name: "Photoshot",
      address: process.env.EMAIL_FROM,
    },
    replyTo: "no-reply@test.com",
    to: process.env.TO_EMAIL,
    subject: EMAIL_SUBJECTS.LOGIN,
    text: message,
    html: message,
  };

  await transporter.sendMail(mailData);
};

export default async (req: any, res: any) => {
  const { message } = req.body;

  try {
    await sendMessage(message);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
