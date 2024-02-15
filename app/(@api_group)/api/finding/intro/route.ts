import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import FindingIntro from '@/app/(@api_group)/api/_models/FindingIntro';
// import { getRedisClient } from '@/app/(@api_group)/api/_lib/redis';
import { REDIS_CACHE_KEY } from '../../_constant/KEY';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl.href);

    const finding_idx = Number(url.searchParams.get('finding_idx'));

    if (!finding_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    // const redisClient = await getRedisClient();
    const cacheFindingIntro: string | null = await kv.get(
      `${REDIS_CACHE_KEY.FINDING_INTRO}${finding_idx}`,
    );
    console.log('기존에 있음?', cacheFindingIntro);

    if (!cacheFindingIntro) {
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

        await kv.set(
          `${REDIS_CACHE_KEY.FINDING_INTRO}${finding_idx}`,
          JSON.stringify(newFinalData),
        );

        return NextResponse.json(
          { message: '인트로 문구 불러오기 성공', data: newFinalData },
          { status: 200 },
        );
      }

      await kv.set(`${REDIS_CACHE_KEY.FINDING_INTRO}${finding_idx}`, JSON.stringify(result));

      return NextResponse.json(
        { message: '인트로 문구 불러오기 성공', data: result },
        { status: 200 },
      );
    }

    // 캐시데이터 있음 캐싱데이터 res
    return NextResponse.json(
      { message: '메뉴 리스트업 성공', data: JSON.parse(cacheFindingIntro) },
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

// 인트로 문구 수정
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

    if (result.acknowledged && result.modifiedCount === 1) {
      // const redisClient = await getRedisClient();
      const cacheFindingIntro: string | null = await kv.get(
        `${REDIS_CACHE_KEY.FINDING_INTRO}${finding_idx}`,
      );

      // 캐시 없음 바로 200
      if (!cacheFindingIntro)
        return NextResponse.json({ message: '인트로 문구 변경 성공' }, { status: 200 });

      // 있다면 캐시 업데이트
      const parseFindingIntro: FindingIntroType = JSON.parse(cacheFindingIntro);
      const newFindingIntro = { ...parseFindingIntro, intro_text };

      await kv.set(
        `${REDIS_CACHE_KEY.FINDING_INTRO}${finding_idx}`,
        JSON.stringify(newFindingIntro),
      );

      return NextResponse.json({ message: '인트로 문구 변경 성공' }, { status: 200 });
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
