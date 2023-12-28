import bcrypt from 'bcrypt';
import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Member from '@/app/(api_group)/api/_models/Member';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id, password } = await req.json();

    if (!id)
      return new Response(JSON.stringify({ message: '아이디를 입력해주세요.' }), { status: 400 });

    if (!password)
      return new Response(JSON.stringify({ message: '비밀번호를 입력해주세요.' }), { status: 400 });

    const user = await Member.findOne({ id: id });

    if (!user)
      return new Response(
        JSON.stringify({ message: '등록된 아이디가 없습니다.\n회원가입을 해주세요.' }),
        { status: 401 },
      );

    // pw체크
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return new Response(JSON.stringify({ message: '비밀번호가 일치하지 않습니다.' }), {
        status: 401,
      });

    return new Response(JSON.stringify({ message: '로그인 성공', data: { id: user.id } }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }));
    } else {
      return new Response(JSON.stringify({ message: 'server error' }));
    }
  }
}
