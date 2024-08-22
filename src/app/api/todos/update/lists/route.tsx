import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/prismadb";


export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { listId, title, theme } = reqBody;
        if (!title || !listId || !theme) {
            throw new Error("title , listId and theme required");
        }
        await prisma.list.update({
            where: {
                id: listId,
            },
            data: {
                title,
                theme,
            },
        });

        return NextResponse.json(
            {
                message: "List Updated successfully",
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating todo:', error);
        return NextResponse.json(
            {
                message: `Error ${error}`,
                success: false,
            },
            { status: 500 }
        );
    }
}


// import type { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../../libs/prismadb'; // Adjust the path according to your setup

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'PUT') {
//         const { listId, title, theme } = req.body;

//         try {
//             // Update the todo item in the database
//             const updatedTodo = await prisma.list.update({
//                 where: { id: listId },
//                 data: { title, theme },
//             });

//             return res.status(200).json(updatedTodo);
//         } catch (error) {
//             console.error('Error updating todo:', error); // Log detailed error for debugging
//             return res.status(500).json({ error: 'Error updating todo' });
//         }
//     } else {
//         res.setHeader('Allow', ['PUT']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
