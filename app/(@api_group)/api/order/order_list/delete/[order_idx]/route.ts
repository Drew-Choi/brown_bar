import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Order from '@/app/(@api_group)/api/_models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { order_idx: string } }) {
  try {
    const { order_idx } = params;

    if (!order_idx)
      return NextResponse.json({ message: '새로고침 후 다시 시도해주세요.' }, { status: 400 });

    await connectDB();

    const result = await Order.deleteOne({ order_idx });

    if (result.acknowledged && result.deletedCount > 0) {
      return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
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
