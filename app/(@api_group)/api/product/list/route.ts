import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page');

    if (!page)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요' }, { status: 400 });

    await connectDB();

    const list = await Product.find()
      .sort({ updated_at: -1 })
      .skip((Number(page) - 1) * 10)
      .limit(10);

    return NextResponse.json({ message: '상품 리스트업 성공', data: list }, { status: 200 });
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
