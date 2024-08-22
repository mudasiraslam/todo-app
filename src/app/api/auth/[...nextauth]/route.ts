// import { authOptions } from "../../../../libs/AuthOptions";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import prismadb from "../../../../libs/prismadb";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // Add your providers here, e.g., GoogleProvider
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      const dbUser = await prismadb.user.findUnique({
        where: { email: session.user.email },
      });
      session.user.id = dbUser?.id;
      return session;
    },
    // Other callbacks like signIn, jwt, etc., can also be included
  },
};
