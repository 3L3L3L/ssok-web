// app/api/apply/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, age, gender, phone, kakaoId } = body;

    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || '1차신청';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('❌ 에러: .env.local 파일에 에어테이블 API 키나 BASE ID가 없습니다!');
      return NextResponse.json({ success: false, message: '환경변수 누락' }, { status: 500 });
    }

    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "이름": name,
              "나이": Number(age), // 💡 해결 완료! 에어테이블의 숫자(Number) 속성에 맞춰 숫자로 꽂아 넣습니다.
              "성별": gender === 'male' ? '남성' : '여성',
              "휴대폰 번호": phone,
              "카카오톡 아이디": kakaoId || "미입력",
            }
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ 에어테이블 전송 거절 상세 이유:', JSON.stringify(errorData, null, 2));
      throw new Error('Airtable API 거절');
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('❌ 서버 내부 에러:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}