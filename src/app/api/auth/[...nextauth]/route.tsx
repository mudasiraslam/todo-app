// import { authOptions } from "../../../../libs/AuthOptions";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }


import NextAuth from "next-auth/next";
import { authOptions } from "../../../../libs/AuthOptions";


export async function GET(request: Request) {
    const response = await NextAuth(authOptions)(request);
    return response;
}


export async function POST(request: Request) {
    const response = await NextAuth(authOptions)(request);
    return response;
}
