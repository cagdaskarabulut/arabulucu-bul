import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phoneNumber } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'cagdas.karabulut@gmail.com',
      subject: 'Arabulucu Bul - Yeni Arabulucu Başvurusu',
      html: `
        <h3>Yeni bir arabulucu başvurusu alındı</h3>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phoneNumber}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('E-posta gönderim hatası:', error);
    return NextResponse.json(
      { success: false, error: 'E-posta gönderilemedi' },
      { status: 500 }
    );
  }
}
