import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Menu from '@/app/(@api_group)/api/_models/Menu';
import { NextResponse } from 'next/server';
import Product from '../../../_models/Product';

// 메뉴 카테고리 삭제
export async function DELETE(_: null, { params }: { params: { category_idx: string } }) {
  try {
    const category_idx = Number(params.category_idx);

    if (!category_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const check = await Product.findOne({ category_idx });

    if (check)
      return NextResponse.json(
        { message: '해당 카테고리에 상품이 있어 삭제가 불가합니다.' },
        { status: 400 },
      );

    const result = await Menu.deleteOne({ category_idx });

    if (result.acknowledged && result.deletedCount > 0) {
      return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'DB error' }, { status: 500 });
    }
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
