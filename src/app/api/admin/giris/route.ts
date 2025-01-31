import { NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Gelen istek:', body);

    const { username, password } = body;

    console.log('Gelen bilgiler:', { username, password });

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('Giriş başarılı');
      return NextResponse.json({ success: true });
    }

    console.log('Giriş başarısız');
    return NextResponse.json(
      { error: 'Geçersiz kullanıcı adı veya şifre' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}
