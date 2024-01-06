import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Product from '@/app/(@api_group)/api/_models/Product';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) return NextResponse.json({ message: 'Bad Request' }, { status: 400 });

    await connectDB();

    const { ObjectId } = mongoose.Types;

    const result = await Product.deleteOne({ _id: new ObjectId(id) });

    if (result.acknowledged && result.deletedCount > 0) {
      return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'DB error' }, { status: 500 });
    }
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
