import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Order from '@/app/(@api_group)/api/_models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { tb_idx, menu }: { tb_idx: number; menu: MenuType[] } = await req.json();

    if (!tb_idx)
      return NextResponse.json(
        { message: '테이블번호가 누락되었습니다. 새로고침을 해주세요.' },
        { status: 400 },
      );

    if (menu?.length === 0)
      return NextResponse.json(
        { message: '주문내역이 없습니다. 새로고침을 해주세요.' },
        { status: 400 },
      );

    await connectDB();

    const newPayCompleteObj = new Order({
      tb_idx,
      menu,
      complete: true,
      pay: true,
    });

    const result: OrderCardProps = await newPayCompleteObj.save();

    if (result) {
      // 이전 데이터삭제
      const removeResult = await Order.deleteMany({
        tb_idx,
        complete: true,
        pay: false,
      });

      if (removeResult.acknowledged)
        return NextResponse.json({ message: '결제완료' }, { status: 200 });

      return NextResponse.json({ message: 'DB Error' }, { status: 500 });
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
