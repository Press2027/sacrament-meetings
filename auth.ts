import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = z.object({
          email: z.email(),
          password: z.string().min(1),
        }).safeParse(credentials);

        if (!parsed.success) return null;

        const configuredEmail =
          process.env.BISHOPRIC_EMAIL?.trim().toLowerCase();

        const passwordHash =
          process.env.BISHOPRIC_PASSWORD_HASH;

        if (!configuredEmail || !passwordHash) {
          console.error("Authentication is not configured.");
          return null;
        }

        if (
          parsed.data.email.trim().toLowerCase() !== configuredEmail
        ) {
          return null;
        }

        const valid = await bcrypt.compare(
          parsed.data.password,
          passwordHash
        );

        if (!valid) return null;

        return {
          id: "bishopric-admin",
          name: "Bishopric Administrator",
          email: configuredEmail,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
});
