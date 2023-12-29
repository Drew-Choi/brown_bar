import bcrypt from 'bcrypt';
import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Member from '@/app/(api_group)/api/_models/Member';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { id, password, name } = await req.json();

    if (!name) return NextResponse.json({ message: '이름을 입력해주세요.' }, { status: 400 });

    if (!id) return NextResponse.json({ message: '아이디를 입력해주세요.' }, { status: 400 });

    if (!password)
      return NextResponse.json(
        { message: '비밀번호를 입력해주세요.' },
        {
          status: 400,
        },
      );

    // 중복회원인지 체크
    const checkId = await Member.findOne({ id: id });

    if (!checkId) {
      const pw = await bcrypt.hash(password, 10);

      const newMember = new Member({
        id,
        password: pw,
        name,
      });

      await newMember.save();

      //회원저장완료
      return NextResponse.json({ message: '회원가입 완료' }, { status: 200 });
    } else {
      // 중복회원일때 처리
      return NextResponse.json(
        { message: '이미 가입된 아이디입니다.' },
        {
          status: 409,
        },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: 'server error' });
    }
  }
}
