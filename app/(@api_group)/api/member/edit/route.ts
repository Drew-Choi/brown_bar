import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Member from '@/app/(@api_group)/api/_models/Member';

export async function POST(req: NextRequest) {
  try {
    const { id, is_admin } = await req.json();

    if (!id) return NextResponse.json({ message: '아이디가 누락' }, { status: 400 });

    await connectDB();

    const result = await Member.findOneAndUpdate({ id }, { $set: { is_admin } }, { new: true });

    if (!result) return NextResponse.json({ message: 'server error' }, { status: 500 });

    return NextResponse.json(
      { message: '맴버 권한설정 완료' },
      {
        status: 200,
      },
    );
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
