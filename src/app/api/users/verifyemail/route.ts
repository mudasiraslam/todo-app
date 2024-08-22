import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log("Received token:", token);
    console.log("Received token length:", token.length);

    const user = await prismadb.user.findFirst({
      where: {
        verificationToken: {
          not: null,
        },
        tokenExpiry: {
          gt: new Date(Date.now()),
        },
      },
    });

    if (!user) {
      console.error("No user found or token expired");
      return new NextResponse("Invalid token or token expired", {
        status: 400,
      });
    }

    console.log("User found:", user);

    if (!user.verificationToken) {
      console.error("User does not have a verification token");
      return new NextResponse("Invalid token", { status: 400 });
    }

    console.log("Stored hashed token:", user.verificationToken);
    console.log("Stored hashed token length:", user.verificationToken.length);

    const isTokenValid = await bcrypt.compare(token, user.verificationToken);

    if (!isTokenValid) {
      console.error("Token mismatch");
      return new NextResponse("Invalid token", { status: 400 });
    }

    await prismadb.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        tokenExpiry: null,
      },
    });

    console.log("Email verified successfully for user:", user.id);
    return new NextResponse("Email verified successfully", { status: 200 });
  } catch (error: any) {
    console.error("Error during verification:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
