import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import db from "@/core/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // Remove the EmailProvider configuration since we'll use NextAuth's built-in email functionality
  ],
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
    async sendVerificationRequest({ identifier: email, url, token, baseUrl }) {
      // Use the Resend library to send the verification email
      const resend = new Resend(process.env.RESEND_KEY);

      const emailOptions = {
        from: 'onboarding@resend.dev', // You can set the desired "from" address here
        to: email,
        subject: 'Sign in to your account',
        html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
      };

      await resend.emails.send(emailOptions);
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verifyRequest=1",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
