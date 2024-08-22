// import { authOptions } from "../../../../libs/AuthOptions";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authOptions);

// export {handler as GET, handler as POST}

import NextAuth from "next-auth/next";
import { authOptions } from "../../../../libs/AuthOptions";

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

handler.catch((error: any) => {
    console.error("Error during NextAuth request handling:", error);
    throw error;
});

