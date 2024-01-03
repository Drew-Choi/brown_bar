import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Product from '@/app/(api_group)/api/_models/Product';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const saveS3 = async (buffer: Buffer, fileName: string, contentType: string) => {
  const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
    },
  });

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: fileName, // 넣어야함
    Body: buffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);

    console.log('s3반환값', response);
    return NextResponse.json({ message: 's3 success', data: response }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: 's3 error' });
    }
  }
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    console.log('들어옴?');

    const { pd_idx, pd_name, price, desc, img_file } = await req.json();

    console.log(pd_idx);
    console.log(pd_name);
    console.log(price);
    console.log(desc);

    const buffer = Buffer.from(await img_file.arrayBuffer());
    const contentType = img_file.type;

    const response = await saveS3(buffer, contentType, 'test');

    console.log('s3이후', response);

    if (response.status === 200) {
      return NextResponse.json(
        { message: '로그인 성공' },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { message: '알 수 없는 오류' },
      {
        status: 500,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message });
    } else {
      return NextResponse.json({ message: 'server error' });
    }
  }
}
