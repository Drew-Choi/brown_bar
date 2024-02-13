import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Member from '@/app/(@api_group)/api/_models/Member';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) return NextResponse.json({ message: '아이디를 입력해주세요.' }, { status: 400 });

    const user = await Member.findOne({ id });

    if (!user) {
      const newUser = new Member({ id });
      const result = await newUser.save();

      if (result)
        return NextResponse.json(
          { message: '관리자 계정이 아닙니다.' },
          {
            status: 403,
          },
        );

      return NextResponse.json({ message: 'server error' }, { status: 500 });
    }

    if (user.is_admin)
      return NextResponse.json(
        { message: '로그인 성공' },
        {
          status: 200,
        },
      );

    return NextResponse.json({ message: '관리자 계정이 아닙니다.' }, { status: 403 });
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
