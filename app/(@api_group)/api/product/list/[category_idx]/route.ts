import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';

// 카테고리별 상품 불러오기
export async function GET(req: NextRequest, { params }: { params: { category_idx: string } }) {
  try {
    const category_idx = Number(params.category_idx);
    const searchParams = req.nextUrl.searchParams;
    const is_client = Number(searchParams.get('is_client'));
    const page = Number(searchParams.get('page'));

    if (!category_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    // 프로젝션 구성
    let exception = `-created_at -updated_at -__v`;
    if (is_client === 1) {
      exception += ` -img_url -finding_section`;
    }

    const List: ProductNewListType[] = await Product.find({ category_idx })
      .sort({ updated_at: -1 })
      .skip(is_client === 1 ? (page - 1) * 10 : 0)
      .limit(is_client === 1 ? 10 : 0)
      .select(exception);

    return NextResponse.json({ message: '성공', data: List }, { status: 200 });
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
