import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '../_models/Order';

export async function POST(req: NextRequest) {
  try {
    const { tb_idx, menu }: OrderCardProps = await req.json();

    if (!menu || menu?.length === 0)
      return NextResponse.json({ message: '메뉴정보가 없습니다.' }, { status: 400 });

    if (!tb_idx) return NextResponse.json({ message: '테이블정보가 없습니다.' }, { status: 400 });

    await connectDB();

    const newOrder = new Order({
      tb_idx,
      menu,
    });

    const result: OrderCardProps = await newOrder.save();

    if (!result) return NextResponse.json({ message: 'DB Error' }, { status: 500 });

    return NextResponse.json({ message: '주문 성공', data: result }, { status: 200 });
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
