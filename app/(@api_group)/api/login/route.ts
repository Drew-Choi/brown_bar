import bcrypt from 'bcrypt';
import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Member from '@/app/(@api_group)/api/_models/Member';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { id, password } = await req.json();

    if (!id) return NextResponse.json({ message: '아이디를 입력해주세요.' }, { status: 400 });

    if (!password)
      return NextResponse.json({ message: '비밀번호를 입력해주세요.' }, { status: 400 });

    const user = await Member.findOne({ id: id });

    if (!user)
      return NextResponse.json(
        { message: '등록된 아이디가 없습니다.\n회원가입을 해주세요.' },
        { status: 401 },
      );

    // pw체크
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return NextResponse.json(
        { message: '비밀번호가 일치하지 않습니다.' },
        {
          status: 401,
        },
      );

    const refreshToken = jwt.sign({ id: user.id, type: 'ref' }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    user.auth = refreshToken;

    const result = await user.save();

    if (result) {
      return NextResponse.json(
        { message: '로그인 성공', id: result.id },
        {
          status: 200,
        },
      );
    }
    // 저장실패시 처리
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: 'server error' });
    }
  }
}
