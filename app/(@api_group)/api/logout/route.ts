import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Member from '@/app/(@api_group)/api/_models/Member';
import { generateCookie } from '@/utils/generateCookie';
import { COOKIE_TIME } from '@/constant/NUMBER';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) return NextResponse.json({ message: '아이디 오류' }, { status: 400 });

    await connectDB();

    const deleteToken: MemberType | null = await Member.findOneAndUpdate(
      { id },
      { $set: { rt: '' } },
      { new: true },
    );

    // API라우트는 set으로만 삭제 가능
    if (!deleteToken?.rt) {
      generateCookie({
        name: 'at',
        value: '',
        maxAge: COOKIE_TIME.DELETE,
      });

      generateCookie({
        name: 'rt',
        value: '',
        maxAge: COOKIE_TIME.DELETE,
      });

      return NextResponse.json({ message: 'rt삭제완료' }, { status: 200 });
    }
    return NextResponse.json({ message: '서버 삭제 오류' }, { status: 500 });
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
