import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sayfa = parseInt(searchParams.get("sayfa") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const offset = (sayfa - 1) * limit;

    const query = `
      SELECT * FROM "arabulucubul-arabulucu" 
      WHERE active = true 
      ORDER BY 
        CASE 
          WHEN name = 'Öznur İlhan Karabulut' THEN 0 
          ELSE 1 
        END,
        name ASC 
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(query, [limit, offset]);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Arabulucular listelenirken detaylı hata:", error);
    
    // Hata detaylarını da döndür
    return NextResponse.json(
      { 
        error: "Arabulucular listelenirken bir hata oluştu", 
        details: error instanceof Error ? error.message : "Bilinmeyen hata"
      },
      { status: 500 }
    );
  }
}
