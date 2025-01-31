import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const { id, active } = await request.json();

    const result = await pool.query(
      `UPDATE "arabulucubul-arabulucu" SET active = $1 WHERE id = $2 RETURNING *`,
      [active, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Arabulucu bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Arabulucu durumu güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Arabulucu durumu güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
