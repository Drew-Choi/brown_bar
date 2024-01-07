import connectDB from '@/app/(@api_group)/api/_lib/mongodb';
import Menu from '@/app/(@api_group)/api/_models/Menu';
import mongoose, { MongooseError } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

function isMongoError(error: any): error is MongooseError {
  return error && typeof error.code === 'number';
}

export async function POST(req: NextRequest) {
  try {
    const { label } = await req.json();

    if (!label)
      return NextResponse.json({ message: '메뉴판 카테고리명이 없습니다.' }, { status: 400 });

    await connectDB();

    const newCategory = new Menu({
      label,
    });

    const result = await newCategory.save();

    if (result) {
      return NextResponse.json({ message: '저장성공' }, { status: 200 });
    }
    return NextResponse.json({ message: 'DB Error' }, { status: 500 });
  } catch (error: any) {
    // Mongoose 유니크 인덱스 위반 에러 처리
    if (error.code === 11000) {
      return NextResponse.json({ message: '카테고리명이 존재합니다.' }, { status: 400 });
    } else {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
