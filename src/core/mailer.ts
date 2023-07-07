import { render } from "mjml-react";
import nodemailer from "nodemailer";
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
    pass:  process.env.EMAIL_PASSWORD,
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

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

