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

export const sendEmail = async ({
  to,
  subject,
  component,
}: {
  to: string;
  subject: string;
  component: string;
}) => {
  const mailData = {
    from: {
      name: "Photoshot Test",
      address: process.env.EMAIL_USER,
    },
    replyTo: "noreply@photoshot.app",
    to,
    subject,
    text: component,
    html: component,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log(info);
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
