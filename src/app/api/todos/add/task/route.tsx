import { NextRequest, NextResponse } from "next/server";
import prismadb from '../../../../../libs/prisma.config'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { listId, title } = reqBody
        if (!listId && !title) {
            throw new Error("title and id required");
        }
        await prismadb.task.create({ data: { title, listId } })

        return NextResponse.json("Task created Successfully", { status: 201 })

    } catch (error) {

        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}