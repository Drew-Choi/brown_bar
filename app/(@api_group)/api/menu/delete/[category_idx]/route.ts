import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Menu from '@/app/(@api_group)/api/_models/Menu';
import { NextRequest, NextResponse } from 'next/server';
import Product from '../../../_models/Product';
import { REDIS_CACHE_KEY } from '../../../_constant/KEY';
import { getRedisClient } from '../../../_lib/redis';

// 메뉴 카테고리 삭제
export async function DELETE(req: NextRequest, { params }: { params: { category_idx: string } }) {
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

    if (result.acknowledged && result.deletedCount === 1) {
      const redisClient = await getRedisClient();
      const cacheMenuList = await redisClient.GET(REDIS_CACHE_KEY.MENU_LIST);

      // 캐싱 데이터 없음 그냥 진행
      if (!cacheMenuList) return NextResponse.json({ message: '삭제 성공' }, { status: 200 });

      // 있으면 배열에서 삭제
      // 1개 남았을 경우는 모두 삭제
      const parseMenuList: MenuCategoryType[] = JSON.parse(cacheMenuList);

      if (parseMenuList?.length <= 1) {
        await redisClient.DEL(REDIS_CACHE_KEY.MENU_LIST);
        return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
      }

      const filterMenuList = parseMenuList.filter((el) => el.category_idx !== category_idx);
      await redisClient.SET(REDIS_CACHE_KEY.MENU_LIST, JSON.stringify(filterMenuList));
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
