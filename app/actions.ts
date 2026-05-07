// app/actions.ts
'use server'

export async function sendVerificationCode(phoneNumber: string) {
  // 1. SMS API(예: Solapi)를 호출하여 인증번호 발송 로직 작성
  // 2. 생성된 인증번호를 서버 메모리나 DB에 잠시 저장
  console.log(`${phoneNumber}로 인증번호 발송`);
}

export async function saveToAirtable(formData: any) {
  // Airtable API 호출 로직
  const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: formData }),
  });
  return response.ok;
}