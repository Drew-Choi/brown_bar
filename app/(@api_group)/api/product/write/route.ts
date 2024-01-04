import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { saveS3 } from '../../_lib/s3';
import { S3BUCKET_PATH } from '@/constant/PATH';
import { dayAndTimeOnlyNumber } from '@/utils/nowDayAndTime';

export async function POST(req: NextRequest) {
  try {
    const formData = req.formData();

    const img_file = (await formData).get('img_file');
    const pd_name = (await formData).get('pd_name');
    const price = Number((await formData).get('price'));
    const desc = (await formData).get('desc');

    if (!img_file || !pd_name || !price)
      return NextResponse.json({ message: '상품정보가 누락되었습니다.' }, { status: 400 });

    if (img_file instanceof File) {
      const buffer = Buffer.from(await img_file.arrayBuffer());
      const contentType = img_file.type;
      // const contentName = img_file.name;
      const contentName = `${pd_name}_${dayAndTimeOnlyNumber()}`;

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

          const newProduct = new Product({
            pd_name,
            price,
            desc,
            img_url,
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
