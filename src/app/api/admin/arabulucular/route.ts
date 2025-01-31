import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM "arabulucubul-arabulucu" ORDER BY created_at DESC`
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Arabulucular listelenirken hata:", error);
    return NextResponse.json(
      { error: "Arabulucular listelenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, active } = body;

    const result = await pool.query(
      `UPDATE "arabulucubul-arabulucu" 
       SET active = $1 
       WHERE id = $2 
       RETURNING *`,
      [active, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Arabulucu bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Arabulucu güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Arabulucu güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
