import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../libs/prisma.config";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../libs/AuthOptions";
import { ApiResponse } from "@/type/type";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { newPassword } = reqBody;

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const user = await prismadb.user.findFirst({
            where: { email: session.user.email },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        await prismadb.user.update({
            where: { id: user.id },
            data: { passwordHash: hashedNewPassword },
        });

        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json<ApiResponse>(
            {
                message: `Error ${error}`,
                success: false,
            },
            { status: 500 }
        );
    }
}
