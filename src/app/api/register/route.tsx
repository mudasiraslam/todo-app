import { NextResponse } from "next/server";
import prismadb from '../../../libs/prismadb';
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { mailer } from "../../../libs/mailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return new NextResponse("Missing data", { status: 400 });
        }

        const userAlreadyExist = await prismadb.user.findFirst({
            where: { email }
        });

        if (userAlreadyExist) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);
        const tokenExpiry = new Date(Date.now() + 3600000);

        const newUser = await prismadb.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                provider: 'local',
                verificationToken: hashedVerificationToken,
                tokenExpiry,
                name
            }
        });

        const emailResponse = await mailer({ email, emailType: 'VERIFY', userId: newUser.id, token: verificationToken });


        if (emailResponse) {
            return NextResponse.json({ message: 'Verification email sent' });
        } else {
            return new NextResponse("Error sending verification email", { status: 500 });
        }

    } catch (error: any) {
        console.log("Register_User", error);
        return new NextResponse(error.message, { status: 500 });
    }
}

