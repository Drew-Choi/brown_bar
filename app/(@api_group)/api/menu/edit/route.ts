import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Menu from '@/app/(@api_group)/api/_models/Menu';
import { NextRequest, NextResponse } from 'next/server';
import { REDIS_CACHE_KEY } from '@/app/(@api_group)/api/_constant/KEY';
import { kv } from '@vercel/kv';

// 메뉴 카테고리 변경
export async function POST(req: NextRequest) {
  try {
    const { category_idx, new_label } = await req.json();

    if (!category_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    if (!new_label)
      return NextResponse.json(
        { message: '변경 카테고리명이 없습니다. 다시 입력해주세요.' },
        { status: 400 },
      );

    await connectDB();

    const result = await Menu.updateOne({ category_idx }, { $set: { label: new_label } });

    if (result.acknowledged && result.modifiedCount === 1) {
      const cacheMenuList: MenuCategoryType[] | null = await kv.get(REDIS_CACHE_KEY.MENU_LIST);

      // 캐싱 데이터 없음 그냥 진행
      if (!cacheMenuList)
        return NextResponse.json({ message: '업데이트 성공', category_idx }, { status: 200 });

      // 있으면 배열에서 같은 idx찾아 업데이트
      const parseMenuList: MenuCategoryType[] = cacheMenuList;

      const updateMenuList = parseMenuList.map((el) =>
        el.category_idx === category_idx ? { ...el, label: new_label } : el,
      );
      await kv.set(REDIS_CACHE_KEY.MENU_LIST, updateMenuList);
      return NextResponse.json({ message: '업데이트 성공', category_idx }, { status: 200 });
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
