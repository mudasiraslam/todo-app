import { NextRequest, NextResponse } from 'next/server';
import prismadb from '../../../../../libs/prismadb';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log('Request Body:', reqBody);

    const { title, email, theme } = reqBody;

    if (!title || !email) {
      console.error('Title and email are required');
      return new NextResponse('Title & Email is required', { status: 400 });
    }

    const newList = await prismadb.list.create({
      data: {
        title,
        email,
        theme,
      },
    });

    console.log('New List Created:', newList);

    return new NextResponse(JSON.stringify({ message: 'List created successfully' }), { status: 201 });
  } catch (error: any) {
    console.error('AddTodo API Error:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
