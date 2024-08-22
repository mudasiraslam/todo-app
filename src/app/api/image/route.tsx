import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, imageBuffer } = reqBody;

        if (!email || !imageBuffer) {
            return NextResponse.json({ message: "Email and image are required" }, { status: 400 });
        }


        await prisma.user.update({
            where: { email },
            data: { image: Buffer.from(imageBuffer, "base64") },
        });

        return NextResponse.json({ message: "Profile picture updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
