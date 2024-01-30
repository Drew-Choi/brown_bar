import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { saveS3 } from '@/app/(@api_group)/api/_lib/s3';
import { S3BUCKET_PATH } from '@/constant/PATH';
import { nowDayAndTimeOnlyNumber } from '@/utils/mometDayAndTime';

export async function POST(req: NextRequest) {
  try {
    const formData = req.formData();

    const img_file = (await formData).get('img_file');
    const pd_name = (await formData).get('pd_name');
    const price = Number((await formData).get('price'));
    const desc = (await formData).get('desc');
    const category_idx = Number((await formData).get('category_idx'));
    const option = (await formData).get('option_arr');

    if (category_idx === 0)
      return NextResponse.json({ message: '메뉴판 등록이 누락되었습니다.' }, { status: 400 });

    if (!img_file || !pd_name || !price || !category_idx || !desc)
      return NextResponse.json({ message: '상품정보가 누락되었습니다.' }, { status: 400 });

    if (img_file instanceof File) {
      const buffer = Buffer.from(await img_file.arrayBuffer());
      const contentType = img_file.type;
      // const contentName = img_file.name;
      const contentName = `${pd_name}_${nowDayAndTimeOnlyNumber({})}`;

      const response = await saveS3({
        buffer,
        contentType,
        contentName,
        path: S3BUCKET_PATH.BROWN_PRODUCT,
      });

      if (response?.status === 200) {
        const { img_url } = await response.json();

        if (img_url) {
          await connectDB();

          // 이미지 처리 모두 완료 후에 옵션 한목 추가
          // 옵션항목 있을 시 파싱, 없으면 [] 빈배열
          const optionParse = typeof option === 'string' ? JSON.parse(option) : null;
          const option_arr = optionParse
            ? [{ label: '- 옵션선택 -', value: 0, price: 0 }, ...optionParse]
            : [];

          const newProduct = new Product({
            pd_name,
            price,
            desc,
            img_url,
            option_arr,
            category_idx,
          });

          const result = await newProduct.save();

          if (result) {
            return NextResponse.json({ message: '상품등록 성공' }, { status: 200 });
          } else {
            return NextResponse.json({ message: 'DB fail' }, { status: 500 });
          }
        }
      }
      if (response?.status === 500) throw new Error('image information Error in Server');
    }
  } catch (error: any) {
    // Mongoose 유니크 인덱스 위반 에러 처리
    if (error.code === 11000) {
      return NextResponse.json({ message: '상품명이 존재합니다.' }, { status: 400 });
    } else {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
