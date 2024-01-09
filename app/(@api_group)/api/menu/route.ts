import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Menu from '@/app/(@api_group)/api/_models/Menu';
import { NextRequest, NextResponse } from 'next/server';
import redisClient from '../_lib/redis';

const cacheKey = 'menuList';

// 메뉴 카테고리 추가
export async function POST(req: NextRequest) {
  try {
    const { label } = await req.json();

    if (!label)
      return NextResponse.json({ message: '카테고리명을 입력해주세요.' }, { status: 400 });

    await connectDB();

    const newCategory = new Menu({
      label,
    });

    const result: MenuCategoryType = await newCategory.save();

    if (result) {
      const preCache = await redisClient.GET(cacheKey);

      // 캐싱데이터가 없음 그냥 진행
      if (!preCache) return NextResponse.json({ message: '저장성공' }, { status: 200 });

      // 있으면 배열에 추가하여 저장
      let parseCache: MenuCategoryType[] = JSON.parse(preCache);
      parseCache.push(result);
      await redisClient.SET(cacheKey, JSON.stringify(parseCache));
      return NextResponse.json({ message: '저장성공' }, { status: 200 });
    }
    return NextResponse.json({ message: 'DB Error' }, { status: 500 });
  } catch (error: any) {
    // Mongoose 유니크 인덱스 위반 에러 처리
    if (error.code === 11000) {
      return NextResponse.json({ message: '카테고리명이 존재합니다.' }, { status: 400 });
    } else {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// 메뉴 카테고리 리스트 불러오기
export async function GET() {
  try {
    const cacheMenuList = await redisClient.GET(cacheKey);

    if (!cacheMenuList) {
      await connectDB();

      const result: MenuCategoryType[] = await Menu.find();

      if (result) {
        await redisClient.SET(cacheKey, JSON.stringify(result));
        return NextResponse.json({ message: '메뉴 리스트업 성공', data: result }, { status: 200 });
      }
      return NextResponse.json({ message: 'DB Error' }, { status: 500 });
    }

    // 캐시데이터 있음 캐싱데이터 res
    return NextResponse.json(
      { message: '메뉴 리스트업 성공', data: JSON.parse(cacheMenuList) },
      { status: 200 },
    );
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
