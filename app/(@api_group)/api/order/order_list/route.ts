import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '../../_models/Order';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const result: OrderCardProps[] = await Order.find({
      pay: false,
    }).select('-_id -__v');

    if (!result) return NextResponse.json({ message: 'DB Error' }, { status: 500 });

    return NextResponse.json({ message: '주문내역 불러오기 성공', data: result }, { status: 200 });
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
