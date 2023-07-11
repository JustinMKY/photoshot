const sgMail = require("@sendgrid/mail");

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = async (message) => {
  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: EMAIL_SUBJECTS.LOGIN,
    text: message,
    html: message,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async (req, res) => {
  const { message } = req.body;

  try {
    await sendMessage(message);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
