// import { NextRequest, NextResponse } from "next/server";
// import prismadb from "../../../libs/prismadb";
// import bcrypt from "bcrypt";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../../libs/AuthOptions";

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { newPassword } = reqBody;


//         const session = await getServerSession(authOptions);
//         if (!session || !session.user?.email) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         const user = await prismadb.user.findFirst({
//             where: { email: session.user.email },
//         });

//         if (!user) {
//             return new NextResponse("User not found", { status: 404 });
//         }

//         const hashedNewPassword = await bcrypt.hash(newPassword, 12);

//         await prismadb.user.update({
//             where: { id: user.id },
//             data: { passwordHash: hashedNewPassword },
//         });

//         return new NextResponse("Password changed successfully", { status: 200 });
//     } catch (error: any) {
//         console.error("CHANGE_PASSWORD_ERROR:", error);
//         return new NextResponse("An error occurred while changing the password", { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../libs/prismadb";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../libs/AuthOptions";

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
    } catch (error: any) {
        console.error("CHANGE_PASSWORD_ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
