import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, currentPassword, newPassword, resetToken } = reqBody;

        if (resetToken) {
            const user = await prisma.user.findFirst({
                where: { passwordResetToken: resetToken, passwordResetTokenExpiry: { gt: new Date() } },
            });

            if (!user) {
                return new NextResponse("Invalid or expired reset token", { status: 400 });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 12);

            await prisma.user.update({
                where: { id: user.id },
                data: { passwordHash: hashedNewPassword, passwordResetToken: null, passwordResetTokenExpiry: null },
            });

            return new NextResponse("Password has been reset successfully", { status: 200 });

        } else if (email && currentPassword && newPassword) {

            const user = await prisma.user.findFirst({ where: { email } });

            if (!user) {
                return new NextResponse("User not found", { status: 404 });
            }

            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

            if (!isCurrentPasswordValid) {
                return new NextResponse("Incorrect current password", { status: 403 });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 12);

            await prisma.user.update({
                where: { id: user.id },
                data: { passwordHash: hashedNewPassword },
            });

            return new NextResponse("Password changed successfully", { status: 200 });
        } else {
            return new NextResponse("Invalid request", { status: 400 });
        }
    } catch (error: any) {
        return new NextResponse("An error occurred while updating the password", { status: 500 });
    }
}
