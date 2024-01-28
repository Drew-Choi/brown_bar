import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/(@api_group)/api/_models/Order';

export async function POST(req: NextRequest) {
  try {
    const { order_idx }: OrderCardProps = await req.json();

    if (!order_idx)
      return NextResponse.json({ message: '주문번호가 누락되었습니다.' }, { status: 400 });

    await connectDB();

    const result = await Order.updateOne({ order_idx }, { $set: { complete: true } });

    if (result.acknowledged && result.modifiedCount === 1) {
      return NextResponse.json({ message: '제조 완료' }, { status: 200 });
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
