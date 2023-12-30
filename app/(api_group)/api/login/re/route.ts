import bcrypt from 'bcrypt';
import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Member from '@/app/(api_group)/api/_models/Member';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { setCookie } from 'nookies';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { id } = await req.json();
    const type = req.nextUrl.searchParams.get('type');

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

      cookies().set({
        name: 'rt',
        value: refreshTokenBrower,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 5 * 60,
      });

      return NextResponse.json({ message: true });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: 'server error' });
    }
  }
}
