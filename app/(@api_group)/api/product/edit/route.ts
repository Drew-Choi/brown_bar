import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { deleteS3, saveS3 } from '@/app/(@api_group)/api/_lib/s3';
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
    const id = (await formData).get('id');
    const pre_img_url = (await formData).get('pre_img_url');
    const pre_pd_name = (await formData).get('pre_pd_name');

    if (img_file instanceof File && pre_img_url && pre_pd_name) {
      const deleteResponse = await deleteS3({
        pre_img_url: String(pre_img_url),
      });

      if (deleteResponse?.status === 200) {
        const buffer = Buffer.from(await img_file.arrayBuffer());
        const contentType = img_file.type;
        // const contentName = img_file.name;
        const contentName = `${
          pd_name && pd_name !== '' ? pd_name : pre_pd_name
        }_${nowDayAndTimeOnlyNumber({})}`;

        const response = await saveS3({
          buffer,
          contentType,
          contentName,
          path: S3BUCKET_PATH.BROWN_PRODUCT,
        });

        if (response?.status === 200) {
          const { img_url } = await response.json();

          // 업데이트할 필드만 분리
          if (img_url) {
            let updateData: { [key: string]: any } = {};
            if (pd_name && pd_name !== '') updateData.pd_name = pd_name;
            if (price !== 0) updateData.price = price;
            if (desc && desc !== '') updateData.desc = desc;
            if (img_url && img_url !== '') updateData.img_url = img_url;
            if (category_idx !== 0) updateData.category_idx = category_idx;
            // 이미지 처리 모두 완료 후에 옵션 한목 추가
            // 옵션항목 있을 시 파싱, 없으면 [] 빈배열
            if (option && option !== '') {
              const optionParse = typeof option === 'string' ? JSON.parse(option) : null;
              updateData.option_arr = optionParse
                ? [{ label: '- 옵션선택 -', value: 0, price: 0 }, ...optionParse]
                : [];
            }
            await connectDB();

            const result = await Product.findByIdAndUpdate(
              id,
              {
                $set: updateData,
              },
              { new: true },
            );

            if (result) {
              return NextResponse.json({ message: '상품수정 성공' }, { status: 200 });
            } else {
              return NextResponse.json({ message: 'DB fail' }, { status: 500 });
            }
          }
        }
        if (response?.status === 500) throw new Error('image information Error in Server');
      }
      if (deleteResponse?.status === 500) throw new Error('image information Error in Server');
    } else {
      let updateData: { [key: string]: any } = {};
      if (pd_name && pd_name !== '') updateData.pd_name = pd_name;
      if (price !== 0) updateData.price = price;
      if (desc && desc !== '') updateData.desc = desc;
      if (category_idx !== 0) updateData.category_idx = category_idx;
      // 이미지 처리 모두 완료 후에 옵션 한목 추가
      // 옵션항목 있을 시 파싱, 없으면 [] 빈배열
      if (option && option !== '') {
        const optionParse = typeof option === 'string' ? JSON.parse(option) : null;
        updateData.option_arr = optionParse
          ? [{ label: '- 옵션선택 -', value: 0, price: 0 }, ...optionParse]
          : [];
      }
      await connectDB();

      const result = await Product.findByIdAndUpdate(
        id,
        {
          $set: updateData,
        },
        { new: true },
      );

      if (result) {
        return NextResponse.json({ message: '상품수정 성공' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'DB fail' }, { status: 500 });
      }
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
