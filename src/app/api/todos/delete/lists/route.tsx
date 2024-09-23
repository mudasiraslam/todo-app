import { NextRequest, NextResponse } from "next/server";
import prismadb from '../../../../../libs/prisma.config'

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { listId } = reqBody;
        if (!listId) {
            throw new Error("task id required");
        }

        await prismadb.list.delete({
            where: {
                id: listId,
            },
        });
        return NextResponse.json("List delete successfully")
    } catch (error) {

        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}