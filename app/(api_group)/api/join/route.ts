import bcrypt from 'bcrypt';
import connectDB from '@/app/(api_group)/api/_lib/mongodb';
import Member from '@/app/(api_group)/api/_models/Member';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id, password, name } = await req.json();

    if (!name)
      return new Response(JSON.stringify({ message: '이름을 입력해주세요.' }), { status: 400 });

    if (!id)
      return new Response(JSON.stringify({ message: '아이디를 입력해주세요.' }), { status: 400 });

    if (!password)
      return new Response(JSON.stringify({ message: '비밀번호를 입력해주세요.' }), { status: 400 });

    // 중복회원인지 체크
    const checkId = await Member.findOne({ id: id });

    if (!checkId) {
      const pw = await bcrypt.hash(password, 10);

      const newMember = new Member({
        id,
        password: pw,
        name,
      });

      await newMember.save();

      return new Response(JSON.stringify({ message: '회원가입 완료' }), { status: 200 });
    } else {
      // 중복회원일때 처리
      return new Response(JSON.stringify({ message: '이미 가입된 아이디입니다.' }), {
        status: 409,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }));
    } else {
      return new Response(JSON.stringify({ message: 'server error' }));
    }
  }
}
