import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Resend, SendEmailOptions } from 'resend'; // Make sure to import the correct types from 'resend'
import db from "@/core/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      // Remove the nodemailer configuration since we won't use it
      sendVerificationRequest: async ({
        identifier: email,
        url,
        token,
        baseUrl,
        provider,
      }) => {
        // Use the Resend library to send the verification email
        const resend = new Resend(process.env.RESEND_KEY);

        const emailOptions: SendEmailOptions = {
          from: 'onboarding@resend.dev', // You can set the desired "from" address here
          to: email,
          subject: 'Sign in to your account',
          html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
        };

        await resend.emails.send(emailOptions);
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verifyRequest=1",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
