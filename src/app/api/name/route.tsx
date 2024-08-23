import { NextRequest, NextResponse } from "next/server";
import prismadb from '../../../libs/prismadb'

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email } = reqBody;
        if (!name) {
            throw new Error("Name is required");
        }

        const user = await prismadb.user.update({
            where: {
                email,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(
            {
                message: user.name as string,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: `Error ${error}`,
                success: false,
            },
            { status: 500 }
        );
    }
}
