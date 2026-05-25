/**
 * NextAuth v5 Configuration
 */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // In production, validate against MongoDB
        // For demo, accept any email/password with basic check
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo user for testing
        if (
          credentials.email === "demo@vahancheck.com" &&
          credentials.password === "demo1234"
        ) {
          return {
            id: "demo-user-001",
            name: "Demo User",
            email: "demo@vahancheck.com",
          };
        }

        // In production:
        // const user = await User.findOne({ email: credentials.email });
        // if (!user) return null;
        // const isValid = await bcrypt.compare(credentials.password, user.password);
        // if (!isValid) return null;
        // return { id: user._id.toString(), name: user.name, email: user.email };

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production",
});
