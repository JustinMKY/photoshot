import { VercelRequest, VercelResponse } from "@vercel/node";
import { createTransport, Transporter } from "nodemailer";

const transporter: Transporter = createTransport({
  service: "SendGrid",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const { email, message } = req.body;

  const mailData = {
    from: {
      name: "Photoshot",
      address: process.env.FROM_EMAIL,
    },
    replyTo: email,
    to: process.env.TO_EMAIL,
    subject: EMAIL_SUBJECTS.LOGIN,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailData);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
