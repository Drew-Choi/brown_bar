import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Member from '@/app/(@api_group)/api/_models/Member';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { id, device_token } = await req.json();

    if (!id) return NextResponse.json({ message: '아이디를 입력해주세요.' }, { status: 400 });

    if (!device_token) return NextResponse.json({ message: '디바이스 토큰 오류' }, { status: 400 });

    const result = await Member.updateOne({ id }, { $addToSet: { fcm: device_token } });

    if (result.acknowledged)
      return NextResponse.json(
        { message: '성공' },
        {
          status: 200,
        },
      );

    return NextResponse.json({ message: 'DB Error' }, { status: 500 });
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
