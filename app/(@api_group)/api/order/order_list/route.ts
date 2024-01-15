import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '../../_models/Order';
import { changeFlatFormat, pointChangeToUTC } from '@/utils/mometDayAndTime';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const day: string | null = searchParams.get('day');

    if (!day) return NextResponse.json({ message: '날짜 정보가 없습니다.' }, { status: 400 });

    const dayFormat = changeFlatFormat({ day });

    await connectDB();

    const { start, end } = pointChangeToUTC({
      day: dayFormat,
      startTime: '00:00',
      endTime: '23:59',
    });

    const result: OrderCardProps[] = await Order.find({
      created_at: { $gte: new Date(start), $lte: new Date(end) },
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
