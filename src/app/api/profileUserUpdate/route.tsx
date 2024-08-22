

import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, name, imageBuffer } = reqBody;


        if (!email) {
            throw new Error("Email is required");
        }


        const updateData: any = { name };

        if (imageBuffer) {
            updateData.image = Buffer.from(imageBuffer, "base64");
        }


        const updatedUser = await prisma.user.update({
            where: { email },
            data: updateData,
        });


        if (!updatedUser) {
            throw new Error("Failed to update user. User not found.");
        }

        return NextResponse.json("Profile updated successfully", { status: 200 });
    } catch (error: any) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });
    }
}
