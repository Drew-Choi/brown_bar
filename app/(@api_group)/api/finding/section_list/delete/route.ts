import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import FindingSection from '@/app/(@api_group)/api/_models/FindingSection';
import Product from '@/app/(@api_group)/api/_models/Product';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    // URL에서 전체 경로 추출
    const url = new URL(req.nextUrl.href);

    // URL 쿼리 스트링에서 파라미터 추출
    const finding_idx = url.searchParams.get('finding_idx');
    const sub_category_idx = url.searchParams.get('sub_category_idx');
    const section_id = url.searchParams.get('section_id');

    if (!finding_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    if (!sub_category_idx)
      return NextResponse.json({ message: '주류 항목이 선택되지 않았습니다.' }, { status: 400 });

    if (!section_id)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const productRemove = await Product.updateMany({}, { $pull: { finding_section: section_id } });

    const { ObjectId } = mongoose.Types;

    if (productRemove.acknowledged) {
      const result = await FindingSection.updateOne(
        {
          finding_idx,
          sub_category_idx,
        },
        { $pull: { section_list: { _id: new ObjectId(section_id) } } },
      );

      if (result.acknowledged) {
        return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
      }
      return NextResponse.json({ message: 'DB Error' }, { status: 500 });
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
