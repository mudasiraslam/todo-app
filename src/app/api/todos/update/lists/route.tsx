import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../libs/prisma.config";


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

