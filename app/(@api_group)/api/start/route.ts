import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Start from '@/app/(@api_group)/api/_models/Start';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { is_start } = await req.json();

    const result: { is_start: boolean } | null = await Start.findOneAndUpdate(
      { is_start: { $exists: true } },
      { $set: { is_start } },
      { new: true },
    );

    if (!result) return NextResponse.json({ message: 'DB Error' }, { status: 500 });

    return NextResponse.json(
      { message: '영업상태 저장 완료', data: result.is_start },
      { status: 200 },
    );
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

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const result = await Start.findOne({ is_start: { $exists: true } });

    if (!result) return NextResponse.json({ message: 'DB Error' }, { status: 500 });

    return NextResponse.json(
      { message: '영업상태 불러오기 성공', data: result.is_start },
      { status: 200 },
    );
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
