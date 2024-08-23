// import { NextRequest, NextResponse } from "next/server";
// import prisma from '../../../libs/prismadb';


// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { token, email } = reqBody;
//         if (!token || !email) {
//             return NextResponse.json("Email missing", { status: 400 });
//         }

//         const user = await prisma.user.findFirst({
//             where: {
//                 emailChangeToken: token,
//                 emailChangeExpiry: {
//                     gt: new Date(Date.now()),
//                 },
//             },
//         });
//         if (!user) {
//             return NextResponse.json('Invaild Token', { status: 400 });
//         }

//         await prisma.user.update({
//             where: { id: user.id },
//             data: {
//                 email: email,
//                 emailChangeToken: null,
//                 emailChangeExpiry: null,
//             },
//         });

//         return NextResponse.json("Email Change succefully", {
//             status: 201,
//         },
//         );
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
