const sgMail = require("@sendgrid/mail")

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = async (message: string) => {
  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: EMAIL_SUBJECTS.LOGIN,
    text: message,
    html: message,
  };

  await sgMail.send(msg);
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
