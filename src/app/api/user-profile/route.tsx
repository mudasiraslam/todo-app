import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prisma.config';

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;
        if (!email) {
            throw new Error("email password required");
        }
        const user = await prisma.user.findFirst({
            where: { email: email },
            select: {
                name: true,
                email: true,
                image: true,
            },
        });

        if (!user) {
            return NextResponse.json("User not found", { status: 404 });
        }
        return NextResponse.json({
            name: user.name,
            email: user.email,
            image: user.image ? user.image.toString("base64") : null,
        });

    } catch (error) {

        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

