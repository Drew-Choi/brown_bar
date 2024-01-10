import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

interface SaveS3Props {
  buffer: Buffer;
  path: string | '';
  contentName: string;
  contentType: string;
}

export const saveS3 = async ({ buffer, path = '', contentName, contentType }: SaveS3Props) => {
  if (!buffer || !contentName || !contentType)
    return NextResponse.json({ message: '사진 정보 누락' }, { status: 500 });

  const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    },
  });

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${path}/${contentName}`,
    Body: buffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);

    if (response.$metadata.httpStatusCode === 200) {
      const imgURL =
        path !== ''
          ? `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${path}/${contentName}`
          : `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${contentName}`;

      return NextResponse.json({ message: 's3 success', img_url: imgURL }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error(error);
      return NextResponse.json({ message: 's3 error' }, { status: 500 });
    }
  }
};

export const deleteS3 = async ({ pre_img_url }: { pre_img_url: string }) => {
  if (!pre_img_url)
    return NextResponse.json({ message: '삭제 할 사진 정보 누락' }, { status: 500 });

  const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    },
  });

  const key = pre_img_url?.split(
    process.env.NEXT_AWS_S3_BUCKET_NAME + '.s3.ap-northeast-2.amazonaws.com/',
  )[1];

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);

  try {
    const response = await s3Client.send(command);

    if (response.$metadata.httpStatusCode === 204) {
      return NextResponse.json({ message: 's3 success' }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error(error);
      return NextResponse.json({ message: 's3 error' }, { status: 500 });
    }
  }
};
