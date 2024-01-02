import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Member from '@/app/(api_group)/api/_models/Member';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// 검증 비동기 제어
const verifyJwt = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { JWT_SECRET } = process.env;
    await connectDB();
    const type = req.nextUrl.searchParams.get('type');

    if (!type) {
      const rt = req.cookies.get('rt')?.value;

      if (!rt) return NextResponse.json({ message: '로그인을 해주세요.' }, { status: 403 });

      const decoded: any = await verifyJwt(rt, JWT_SECRET as string);

      if (!decoded || typeof decoded === 'string')
        return NextResponse.json({ message: '로그인을 해주세요.' }, { status: 403 });

      const user = await Member.findOne({ id: decoded.id as string });

      if (!user.auth) return NextResponse.json({ message: '로그인을 해주세요.' }, { status: 403 });

      const decodedTwo: any = await verifyJwt(user.auth, JWT_SECRET as string);

      if (!decodedTwo || typeof decodedTwo === 'string')
        return NextResponse.json({ message: '로그인을 해주세요.' }, { status: 403 });

      if (decodedTwo.type + decoded.type === 'refresh' && decodedTwo.id === decoded.id) {
        return NextResponse.json({ message: '인증완료', id: user.id }, { status: 200 });
      } else {
        return NextResponse.json({ message: '로그인을 해주세요.' }, { status: 403 });
      }
    } else if (type === 'co') {
      const { id } = await req.json();
      // 최초 로그인시 쿠키 발행
      const refreshTokenBrower = jwt.sign({ id: id, type: 'resh' }, JWT_SECRET as string, {
        expiresIn: '1d',
      });

      cookies().set({
        name: 'rt',
        value: refreshTokenBrower,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60,
      });

      return NextResponse.json({ message: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'server error' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: 'server error' });
    }
  }
}
