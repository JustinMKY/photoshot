import { render } from "mjml-react";
import { ReactElement } from "react";
import { Resend } from 'resend'; // Make sure to import the correct types from 'resend'

interface CustomEmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const EMAIL_SUBJECTS = {
  LOGIN: "Your Photoshot Login Link",
};

export const sendEmail = async ({
  to,
  subject,
  component,
}: {
  to: string;
  subject: string;
  component: ReactElement;
}) => {
  const { html } = render(component);

  // Use the Resend library for sending emails
  const resend = new Resend(process.env.RESEND_KEY);

  const emailOptions: CustomEmailOptions = {
    from: 'onboarding@resend.dev', // You can set the desired "from" address here
    to,
    subject,
    html,
  };

  await resend.emails.send(emailOptions);
};
