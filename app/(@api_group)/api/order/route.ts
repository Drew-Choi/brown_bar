import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/app/(@api_group)/api/_models/Order';
import * as admin from 'firebase-admin';
import Member from '@/app/(@api_group)/api/_models/Member';

// Firebase Admin 초기화
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tb_idx, menu }: OrderCardProps = await req.json();

    if (!menu || menu?.length === 0)
      return NextResponse.json({ message: '메뉴정보가 없습니다.' }, { status: 400 });

    if (!tb_idx) return NextResponse.json({ message: '테이블정보가 없습니다.' }, { status: 400 });

    await connectDB();

    const newOrder = new Order({
      tb_idx,
      menu,
    });

    const result: OrderCardProps = await newOrder.save();

    if (!result) return NextResponse.json({ message: 'DB Error' }, { status: 500 });

    const deviceToken = await Member.find({ is_admin: true }).select('+deviceToken');
    const newArr = deviceToken.map((el) => el.fcm).flat();

    console.log(deviceToken);

    if (newArr?.length === 0) return NextResponse.json({ message: '주문 성공' }, { status: 200 });

    const message = {
      notification: {
        title: '!주문!',
        body: '주문이 들어왔습니다.',
        image: '/pwa_icon/icon-192x192.png',
      },
      // Android용 설정
      android: {
        notification: {
          sound: 'default', // 기본 소리
        },
      },
      // iOS용 설정
      apns: {
        payload: {
          aps: {
            sound: 'default', // 기본 소리
          },
        },
      },
      tokens: newArr,
    };

    const response = await admin.messaging().sendMulticast(message);

    if (response.responses.some((el) => el.success === true)) {
      return NextResponse.json({ message: '주문 성공' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error(error);
      return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
  }
}
