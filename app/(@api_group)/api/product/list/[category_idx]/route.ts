import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';

// 카테고리별 상품 불러오기
export async function GET(_: null, { params }: { params: { category_idx: string } }) {
  try {
    const category_idx = Number(params.category_idx);

    if (!category_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const List = await Product.find({ category_idx }).sort({ updated_at: -1 });

    const data = {
      category_idx,
      pd_datas: List,
    };

    return NextResponse.json({ message: '성공', data }, { status: 200 });
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
