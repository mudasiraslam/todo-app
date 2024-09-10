

import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb';
import { UserData } from "@/type/type";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json() as UserData;
        const { email, name, imageBuffer } = reqBody;


        if (!email) {
            throw new Error("Email is required");
        }



        const updateData: { name?: string; image?: Buffer } = { name };

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
    } catch (error) {

        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
