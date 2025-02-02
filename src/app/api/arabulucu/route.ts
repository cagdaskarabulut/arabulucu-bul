import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, credentials, licenseNo, contact, website } = body;

    // Sicil numarası kontrolü
    const existingMediatorResult = await pool.query(
      `SELECT id FROM "arabulucubul-arabulucu" WHERE registration_number = $1`,
      [licenseNo]
    );

    if (existingMediatorResult.rows.length > 0) {
      return NextResponse.json(
        { error: "Daha önce bu sicil numarası için kayıt yapılmıştır." },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO "arabulucubul-arabulucu" (
        name, 
        biography, 
        registration_number, 
        email, 
        website_url,
        active
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, credentials, licenseNo, contact, website || null, null]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Arabulucu kaydedilirken hata:', error);
    return NextResponse.json(
      { error: 'Arabulucu kaydedilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sayfa = parseInt(searchParams.get('sayfa') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const harf = searchParams.get('harf') || 'hepsi';
    const offset = (sayfa - 1) * limit;

    let query = `SELECT * FROM "arabulucubul-arabulucu" WHERE active = true`;
    const queryParams = [];
    const paramCount = 1;
    let pattern = '';

    if (harf !== 'hepsi') {
      // Türkçe karakter eşleştirmesi için pattern oluşturuyoruz
      switch(harf.toLowerCase()) {
        case 'o':
          pattern = '(O|Ö|o|ö)';
          break;
        case 'i':
          pattern = '(I|İ|i|ı)';
          break;
        case 'u':
          pattern = '(U|Ü|u|ü)';
          break;
        case 's':
          pattern = '(S|Ş|s|ş)';
          break;
        case 'c':
          pattern = '(C|Ç|c|ç)';
          break;
        case 'g':
          pattern = '(G|Ğ|g|ğ)';
          break;
        default:
          pattern = `[${harf.toUpperCase()}${harf.toLowerCase()}]`;
      }
      
      query += ` AND LEFT(name, 1) SIMILAR TO '${pattern}'`;
    }

    query += harf === 'hepsi' 
      ? ` ORDER BY id DESC` 
      : ` ORDER BY name ASC`;

    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    const countQuery = `SELECT COUNT(*) FROM "arabulucubul-arabulucu" WHERE active = true${
      harf !== 'hepsi' ? ` AND LEFT(name, 1) SIMILAR TO '${pattern}'` : ''
    }`;
    
    const totalCount = await pool.query(
      countQuery,
      harf !== 'hepsi' ? [] : []
    );

    return NextResponse.json({
      arabulucular: result.rows,
      toplam: parseInt(totalCount.rows[0].count),
      sayfa,
      limit
    });
  } catch (error) {
    console.error('Arabulucular listelenirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Arabulucular listelenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
