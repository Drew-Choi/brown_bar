import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import FindingSection from '@/app/(@api_group)/api/_models/FindingSection';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl.href);

    const finding_idx = Number(url.searchParams.get('finding_idx'));
    const sub_category_idx = Number(url.searchParams.get('sub_category_idx'));

    if (!finding_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    if (!sub_category_idx)
      return NextResponse.json({ message: '주류 항목이 선택되지 않았습니다.' }, { status: 400 });

    await connectDB();

    const result = (await FindingSection.findOne({
      finding_idx,
      sub_category_idx,
    }).select('-_id -__v')) as FindingSectionType;

    if (!result) {
      const newFindingSection = new FindingSection({
        finding_idx,
        sub_category_idx,
      });

      const newFindingSectionResult: FindingSectionType = await newFindingSection.save();

      const newFinalData = {
        finding_idx: newFindingSectionResult.finding_idx,
        sub_category_idx: newFindingSectionResult.sub_category_idx,
        section_list: newFindingSectionResult.section_list,
      };

      if (!newFindingSectionResult)
        return NextResponse.json({ message: 'DB Error' }, { status: 500 });

      return NextResponse.json(
        { message: '섹션 불러오기 성공', data: newFinalData },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: '섹션 불러오기 성공', data: result }, { status: 200 });
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
