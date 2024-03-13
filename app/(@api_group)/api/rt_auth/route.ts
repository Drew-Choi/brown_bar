import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Member from '@/app/(@api_group)/api/_models/Member';
import JWT, { JwtPayload } from 'jsonwebtoken';
import { generateSignJWT } from '@/utils/generateJWT';

interface TokenPayloadCustom extends JwtPayload {
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const { rt } = await req.json();

    if (!rt) return NextResponse.json({ message: 'empty rt' }, { status: 400 });

    console.log('rt?', rt);

    const result = JWT.verify(rt, process.env.JWT_SECRET as string) as TokenPayloadCustom;

    if (result.id) {
      await connectDB();

      const findToken: MemberType | null = await Member.findOne({ rt, id: result.id });

      if (findToken && findToken?.rt) {
        const newAccessToken = generateSignJWT({ value: { id: findToken.id }, expiresIn: '1h' });
        const newRefreshToken = generateSignJWT({ value: { id: findToken.id }, expiresIn: '60d' });

        console.log('db토큰', findToken);

        const updateResult = await Member.updateOne(
          { id: findToken.id },
          {
            $set: {
              rt: newRefreshToken,
            },
          },
        );

        return updateResult.acknowledged
          ? NextResponse.json(
              {
                message: 'rt인증 at발급완료',
                data: { result: true, accessToken: newAccessToken, refreshToken: newRefreshToken },
              },
              { status: 200 },
            )
          : NextResponse.json({ message: 'rt재발급 오류', data: false }, { status: 500 });
      }

      return NextResponse.json({ message: '올바르지 않은 로그인', data: false }, { status: 400 });
    }

    return NextResponse.json({ message: '토큰 미인증' }, { status: 401 });
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
