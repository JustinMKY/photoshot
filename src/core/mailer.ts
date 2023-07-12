import { render } from "mjml-react";
import nodemailer from "nodemailer";
import { ReactElement } from "react";

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};

const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

export const sendEmail = async ({
  to,
  subject,
  component,
}: {
  to: string;
  subject: string;
  component: ReactElement;
}) => {
  console.log("Sending email to:", to); // Console log the recipient before sending

  const { html } = render(component);

  console.log("Rendered email HTML:", html); // Console log the rendered HTML before sending

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  console.log("Email sent successfully"); // Console log after email is sent
};
