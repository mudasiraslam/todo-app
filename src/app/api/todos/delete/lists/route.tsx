import { NextRequest, NextResponse } from "next/server";
import prismadb from './../../../../../libs/prismadb'

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
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}