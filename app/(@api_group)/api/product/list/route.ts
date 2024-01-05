import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const skip = searchParams.get('skip');
    const limit = searchParams.get('limit');

    if (skip === null || skip === undefined || !limit)
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });

    await connectDB();

    const list = await Product.find()
      .sort({ updated_at: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    return NextResponse.json({ message: '리스트업 성공', data: list }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error(error);
      return NextResponse.json({ message: 'Unknown server error' }, { status: 500 });
    }
  }
}
