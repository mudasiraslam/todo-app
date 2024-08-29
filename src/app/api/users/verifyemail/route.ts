import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

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
      return new NextResponse("Invalid token or token expired", {
        status: 400,
      });
    }

    if (!user.verificationToken) {
      return new NextResponse("Invalid token", { status: 400 });
    }

    const isTokenValid = await bcrypt.compare(token, user.verificationToken);
    if (!user.verificationToken) {
      return new NextResponse(
        JSON.stringify({ error: "Token missing for user" }),
        { status: 400 }
      );
    }
    if (!isTokenValid) {
      return new NextResponse("Invalid token", { status: 400 });
    }
    if (!isTokenValid) {
      return new NextResponse(JSON.stringify({ error: "Token mismatch" }), {
        status: 400,
      });
    }
    await prismadb.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        tokenExpiry: null,
      },
    });

    return new NextResponse("Email verified successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
