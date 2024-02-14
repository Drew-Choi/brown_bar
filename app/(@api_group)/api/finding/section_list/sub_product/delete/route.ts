import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Product from '@/app/(@api_group)/api/_models/Product';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl.href);

    const product_id = url.searchParams.get('product_id');
    const section_id = url.searchParams.get('section_id');

    if (!product_id || !section_id)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const { ObjectId } = mongoose.Types;

    const productRemove: ProductInfoType | null = await Product.findByIdAndUpdate(
      new ObjectId(product_id),
      {
        $pull: { finding_section: section_id },
      },
      { new: true },
    );

    if (
      productRemove &&
      productRemove.finding_section &&
      !productRemove.finding_section.includes(section_id)
    ) {
      return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
    }
    return NextResponse.json({ message: 'DB Error' }, { status: 500 });
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
