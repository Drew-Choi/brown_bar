import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';
import Menu from '@/app/(@api_group)/api/_models/Menu';
import { Document } from 'mongoose';
import { REDIS_CACHE_KEY } from '@/app/(@api_group)/api/_constant/KEY';
import { getRedisClient } from '@/app/(@api_group)/api/_lib/redis';
import mongoose from 'mongoose';

const newListGenerate = (
  productList: ProductInfoType[],
  menuList: MenuCategoryType[],
): ProductNewListType[] => {
  return productList.map((product) => {
    // 타입 캐스팅을 사용하여 Mongoose 문서 객체로 취급
    const productDoc = product as unknown as Document;

    // Mongoose 문서 객체를 JavaScript 객체로 변환
    const productObj = productDoc.toObject();

    // 키벨류가 일치하는 객체 추출
    const findCategoryLabel = menuList.find(
      (menu) => menu.category_idx === productObj.category_idx,
    );

    return {
      ...productObj,
      category: String(findCategoryLabel ? findCategoryLabel.label : undefined),
    };
  });
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const section_id = searchParams.get('section_id');
    const type = searchParams.get('type');

    if (!page && !type)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요' }, { status: 400 });

    await connectDB();

    const { ObjectId } = mongoose.Types;

    // 검색어 구분
    let query = {};
    // 제외할 항목 구분
    let exception = '';

    if (search && !section_id && !type) {
      query = { pd_name: { $regex: search, $options: 'i' } };
    } else if (search && section_id) {
      const objId = new ObjectId(section_id);
      query = {
        pd_name: { $regex: search, $options: 'i' },
        $or: [{ finding_section: { $exists: false } }, { finding_section: { $nin: [objId] } }],
      };
      exception = '-desc -img_url -option_arr -category_idx -category -finding_section';
    } else if (!search && section_id && !type) {
      const objId = new ObjectId(section_id);
      query = {
        $or: [{ finding_section: { $exists: false } }, { finding_section: { $nin: [objId] } }],
      };
      exception = '-desc -img_url -option_arr -category_idx -category -finding_section';
    } else if (!search && section_id && type) {
      const typeNumber = Number(type);
      const objId = new ObjectId(section_id);
      query = { finding_section: objId };
      exception = typeNumber === 2 ? '' : '-desc -img_url -option_arr -finding_section';
    } else {
      query = {};
    }

    const list: ProductInfoType[] = await Product.find(query)
      .sort({ updated_at: -1 })
      .skip(!type ? (Number(page) - 1) * 10 : 0)
      .limit(!type ? 10 : 0)
      .select(`-created_at -updated_at -__v ${exception}`);

    // 아이디가 있다면 하위 섹션 리스트 이므로 바로 종료
    if (section_id && !type) {
      return NextResponse.json({ message: '상품 리스트업 성공', data: list }, { status: 200 });
    }

    const redisClient = await getRedisClient();
    // 메뉴카테고리 캐싱 확인
    const cacheMenuList: string | null = await redisClient.GET(REDIS_CACHE_KEY.MENU_LIST);

    //캐시 없을시
    if (!cacheMenuList) {
      const menuList: MenuCategoryType[] = await Menu.find();

      if (menuList.length !== 0) {
        const newList = newListGenerate(list, menuList);

        await redisClient.SET(REDIS_CACHE_KEY.MENU_LIST, JSON.stringify(menuList));

        return NextResponse.json({ message: '상품 리스트업 성공', data: newList }, { status: 200 });
      } else {
        return NextResponse.json(
          {
            message:
              '메뉴 카테고리가 비어있습니다. \n 메뉴판과 상품목록을 확인하여 카테고리를 등록해주세요.',
          },
          { status: 400 },
        );
      }
    }

    // 캐시 있을 시
    const newListCache = newListGenerate(list, JSON.parse(cacheMenuList));

    return NextResponse.json(
      { message: '상품 리스트업 성공', data: newListCache },
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
