import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: user.id, name: user.name, email: user.email }; // ✅ Include `id`
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id; // ✅ Store `id` in JWT
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // ✅ Attach `id` to session
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/authForm" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
