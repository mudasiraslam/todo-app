import { NextRequest, NextResponse } from "next/server";
import prismadb from '../../../libs/prismadb';

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, newEmail } = reqBody;

        if (!email || !newEmail) {
            return NextResponse.json({ error: "Both current and new email are required." }, { status: 400 });
        }

        const existingUser = await prismadb.user.findUnique({ where: { email } });

        if (!existingUser) {
            return NextResponse.json({ error: "User does not exist." }, { status: 404 });
        }

        const emailAlreadyExists = await prismadb.user.findUnique({ where: { email: newEmail } });

        if (emailAlreadyExists) {
            return NextResponse.json({ error: "New email already in use." }, { status: 409 });
        }

        const updatedUser = await prismadb.user.update({
            where: { email },
            data: { email: newEmail },
        });

        return NextResponse.json("Email updated successfully", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
