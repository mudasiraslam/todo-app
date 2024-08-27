import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import prisma from './prismadb';

export const mailer = async ({ email, emailType, userId, token }: any) => {
    try {
        const hashToken = await bcrypt.hash(token, 10);

        await prisma.user.update({
            where: { id: userId },
            data: {
                verificationToken: hashToken,
                tokenExpiry: new Date(Date.now() + 3600000),
            },
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const verificationLink = `${process.env.NEXTAUTH_URL}/verifyEmail?token=${token}`;


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${verificationLink}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {

        throw new Error(error.message);
    }
}
