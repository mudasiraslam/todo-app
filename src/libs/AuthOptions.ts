import prismadb from "./prismadb";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prismadb.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user || !user.id || !user.passwordHash) {
          throw new Error("Invalid credentials");
        }

        if (!user.isVerified) {
          throw new Error("Email not verified");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // return user;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) {
          throw new Error("Email is required");
        }

        console.log("Sign-in attempt:", { user, account });

        if (account?.provider === "google") {
          const existingUser = await prismadb.user.findFirst({
            where: { email: user.email },
          });

          if (!existingUser) {
            await prismadb.user.create({
              data: {
                email: user.email,
                name: user.name,
                passwordHash: await bcrypt.hash("dummyPassword", 11),
                isVerified: true,
                provider: "google",
              },
            });
          }
        }
      } catch (error: any) {
        console.error("Error in Provider callbacks!", error);
        return false;
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
