import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import FindingIntro from '@/app/(@api_group)/api/_models/FindingIntro';

export async function GET(req: NextRequest) {
  try {
    const finding_idx = Number(req.nextUrl.searchParams.get('finding_idx'));

    if (!finding_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const result = (await FindingIntro.findOne({
      finding_idx,
    }).select('-_id -__v')) as FindingIntroType;

    if (!result) {
      const newFindingIntro = new FindingIntro({
        finding_idx,
        intro_text:
          finding_idx === 10
            ? '초심자 인트로 문구를 작성해주세요.'
            : finding_idx === 20
              ? '탐험가 문구를 작성해주세요.'
              : finding_idx === 30
                ? '고인물 문구를 작성해주세요.'
                : '잘못된 섹션입니다.',
      });

      const newFindingIntroResult: FindingIntroType = await newFindingIntro.save();

      const newFinalData = {
        finding_idx: newFindingIntroResult.finding_idx,
        intro_text: newFindingIntroResult.intro_text,
      };

      if (!newFindingIntroResult)
        return NextResponse.json({ message: 'DB Error' }, { status: 500 });

      return NextResponse.json(
        { message: '인트로 문구 불러오기 성공', data: newFinalData },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: '인트로 문구 불러오기 성공', data: result },
      { status: 200 },
    );
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

export async function POST(req: NextRequest) {
  try {
    const { finding_idx, intro_text } = await req.json();

    if (!finding_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    if (!intro_text)
      return NextResponse.json({ message: '인트로 문구를 입력해주세요.' }, { status: 400 });

    await connectDB();

    const result = await FindingIntro.updateOne(
      {
        finding_idx,
      },
      { $set: { intro_text } },
    );

    if (result.acknowledged && result.modifiedCount === 1)
      return NextResponse.json({ message: '인트로 문구 변경 성공' }, { status: 200 });

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
