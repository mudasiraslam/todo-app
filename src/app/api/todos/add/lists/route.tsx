import { NextRequest, NextResponse } from 'next/server';
import prismadb from '../../../../../libs/prisma.config';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { title, email, theme } = reqBody;

    if (!title || !email) {
      console.error('Title and email are required');
      return new NextResponse('Title & Email is required', { status: 400 });
    }

    await prismadb.list.create({
      data: {
        title,
        email,
        theme,
      },
    });

    return NextResponse.json({ message: "List created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
