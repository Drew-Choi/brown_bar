import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { deleteS3 } from '@/app/(@api_group)/api/_lib/s3';

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl.href);

    const id = url.searchParams.get('id');
    const img_url = url.searchParams.get('img_url');

    if (!id)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const { ObjectId } = mongoose.Types;

    const result = await Product.deleteOne({ _id: new ObjectId(id) });

    if (result.acknowledged && result.deletedCount > 0) {
      const deleteResponse = await deleteS3({
        pre_img_url: String(img_url),
      });

      if (deleteResponse?.status === 200) {
        return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 's3 error' }, { status: 500 });
      }
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
