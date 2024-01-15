import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Order from '@/app/(@api_group)/api/_models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { tb_idx }: OrderCardProps = await req.json();

    if (!tb_idx)
      return NextResponse.json({ message: '테이블번호가 누락되었습니다.' }, { status: 400 });

    await connectDB();

    const latestOrder = await Order.findOne({
      tb_idx: tb_idx,
      complete: true,
    }).sort({ updatedAt: -1 });

    if (latestOrder) {
      // 찾은 문서를 업데이트
      const result = await Order.updateOne({ _id: latestOrder._id }, { $set: { complete: false } });

      if (result.acknowledged && result.modifiedCount === 1) {
        return NextResponse.json({ message: '롤백 완료' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'DB Error' }, { status: 500 });
      }
    }
    return NextResponse.json({ message: '히스토리가 없습니다.' }, { status: 400 });
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
