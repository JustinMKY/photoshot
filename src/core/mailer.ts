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

  console.log("Sending message:", msg); // Console log the message object before sending

  await sgMail.send(msg);
  console.log("Message sent successfully"); // Console log after sending
};

export default async (req: any, res: any) => {
  const { message } = req.body;

  console.log("Received request with message:", message); // Console log the received message

  try {
    await sendMessage(message);
    console.log("Email sent successfully"); // Console log after email is sent
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Error sending email:", error); // Console log the error if sending fails
    res.status(500).json({ error: "Internal Server Error" });
  }
};
