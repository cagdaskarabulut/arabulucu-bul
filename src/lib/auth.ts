import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Sadece admin emaili ile giriş yapılabilir
      return user.email === ADMIN_EMAIL;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/admin/giris',
    error: '/admin/giris',
  },
}
