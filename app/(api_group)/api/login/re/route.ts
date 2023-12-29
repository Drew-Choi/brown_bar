import bcrypt from 'bcrypt';
import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Member from '@/app/(api_group)/api/_models/Member';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { id } = await req.json();
    const type = req.nextUrl.searchParams.get('type');
    console.log(type);
    console.log(id);

    if (!type) return console.log('기달');

    if (type === 'co') {
      // 최초 로그인시 쿠키 발행
      const refreshTokenBrower = jwt.sign(
        { id: id, type: 'resh' },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '5m',
        },
      );
      console.log(refreshTokenBrower);

      cookies().set({
        name: 'rt',
        value: refreshTokenBrower,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // const cookie = serialize('rt', refreshTokenBrower, {
      //   maxAge: 5 * 60,
      //   path: '/',
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'lax',
      // });
      // NextResponse.next().cookies.set('rt', cookie);
      return NextResponse.json({ message: '성공' }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }));
    } else {
      return new Response(JSON.stringify({ message: 'server error' }));
    }
  }
}
