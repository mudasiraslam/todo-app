import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../libs/prismadb"


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { listId } = reqBody;
        if (!listId) {
            throw new Error("task id required");
        }

        const tasks = await prismadb.task.findMany({ where: { listId } });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {

        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
