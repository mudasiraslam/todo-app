import { NextRequest, NextResponse } from 'next/server';
import prismadb from '../../../../libs/prisma.config';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      throw new Error('Email is required');
    }

    const lists = await prismadb.list.findMany({ where: { email } });
    return NextResponse.json(lists, { status: 200 });
  } catch (error) {

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
