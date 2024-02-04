import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const { product_list, section_id } = await req.json();

    if (!product_list || !section_id)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const { ObjectId } = mongoose.Types;

    const productList = product_list.map((el: string) => new ObjectId(el));

    const result = await Product.updateMany(
      { _id: { $in: productList } },
      { $addToSet: { finding_section: section_id } },
    );

    if (result.acknowledged) {
      return NextResponse.json({ message: '섹션 상품추가 완료' });
    }
    return NextResponse.json({ message: 'DB Error' }, { status: 500 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error(error);
      return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
  }
}
