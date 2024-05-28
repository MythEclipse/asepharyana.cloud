import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = {
          id: 1,
          name: "Admin",
          email: "superaseph@gmail.com",
          role: "admin",
        };
        if (email === "superaseph@gmail.com" && password === "123456") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullName = user.fullname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("fullName" in token) {
        session.user.fullName = token.fullName;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export{
  handler as GET,handler as POST
}