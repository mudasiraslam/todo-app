import { NextRequest, NextResponse } from "next/server";
import prismadb from '../../../../../libs/prismadb'

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { taskId } = reqBody;
        if (!taskId) {
            throw new Error("task id required");
        }

        await prismadb.task.delete({
            where: {
                id: taskId,
            },
        });

        return NextResponse.json("Task Successfully delete", { status: 200 })
    } catch (error) {

        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
