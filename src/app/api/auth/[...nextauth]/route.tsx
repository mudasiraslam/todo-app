// import { authOptions } from "../../../../libs/AuthOptions";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authOptions);

// export {handler as GET, handler as POST}

import NextAuth from "next-auth/next";
import { authOptions } from "../../../../libs/AuthOptions";

try {
    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };
} catch (error) {
    console.error("Error during NextAuth initialization:", error);
    throw error;
}
