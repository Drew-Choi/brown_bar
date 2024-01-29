import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import FindingSection from '@/app/(@api_group)/api/_models/FindingSection';

export async function POST(req: NextRequest) {
  try {
    const { finding_idx, sub_category_idx, title } = await req.json();

    if (!finding_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    if (!sub_category_idx)
      return NextResponse.json({ message: '주류 항목이 선택되지 않았습니다.' }, { status: 400 });

    if (!title)
      return NextResponse.json({ message: '섹션 타이틀이 입력되지 않았습니다.' }, { status: 400 });

    await connectDB();

    const result = await FindingSection.updateOne(
      { finding_idx, sub_category_idx },
      { $push: { section_list: { title } } },
    );

    if (result.acknowledged && result.modifiedCount === 1)
      return NextResponse.json({ message: '섹션 추가 성공' }, { status: 200 });

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
