import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '../../_models/Order';

export async function GET(req: NextRequest) {
  try {
    const start_time = req.nextUrl.searchParams.get('start_time');
    const end_time = req.nextUrl.searchParams.get('end_time');

    if (!start_time)
      return NextResponse.json(
        { message: '범위가 누락되었습니다.다시 시도해주세요.' },
        { status: 400 },
      );

    if (!end_time)
      return NextResponse.json(
        { message: '범위가 누락되었습니다. 다시 시도해주세요.' },
        { status: 400 },
      );

    await connectDB();

    const result: OrderCardProps[] = await Order.find({
      complete: true,
      pay: true,
      created_at: {
        $gte: start_time,
        $lte: end_time,
      },
    }).select('-_id -__v -updated_at');

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