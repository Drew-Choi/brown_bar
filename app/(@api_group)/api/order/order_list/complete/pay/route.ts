import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Order from '@/app/(@api_group)/api/_models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { tb_idx }: OrderCardProps = await req.json();

    if (!tb_idx)
      return NextResponse.json({ message: '테이블번호가 누락되었습니다.' }, { status: 400 });

    await connectDB();

    const result = await Order.updateMany({ tb_idx: tb_idx }, { $set: { pay: true } });

    if (result) {
      return NextResponse.json({ message: '결제완료' }, { status: 200 });
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
