import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/(@api_group)/api/_models/Order';

type FilterType = {
  pay: boolean;
  tb_idx?: number;
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.nextUrl.href);
    const searchParams = url.searchParams;
    const tb = searchParams.get('tb');

    let filter: FilterType = { pay: false };
    if (tb) {
      filter = { ...filter, tb_idx: Number(tb) };
    }

    const result: OrderCardProps[] = await Order.find(filter).select('-_id -__v');

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
