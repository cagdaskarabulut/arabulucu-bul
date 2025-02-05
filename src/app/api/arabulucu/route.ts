import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { RateLimiter } from 'limiter';
import { headers } from 'next/headers';

// Her IP için dakikada maksimum 5 istek
const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: 'minute',
  fireImmediately: true
});

// IP bazlı rate limiter map
const ipLimiters = new Map<string, RateLimiter>();

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return 'unknown';
}

export async function POST(request: Request) {
  try {
    // IP bazlı rate limiting kontrolü
    const clientIp = await getClientIp();
    
    if (!ipLimiters.has(clientIp)) {
      ipLimiters.set(clientIp, new RateLimiter({
        tokensPerInterval: 5,
        interval: 'minute',
        fireImmediately: true
      }));
    }
    
    const ipLimiter = ipLimiters.get(clientIp)!;
    const hasTokens = await ipLimiter.tryRemoveTokens(1);
    
    if (!hasTokens) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyin.' },
        { status: 429 }
      );
    }
    const body = await request.json();
    const { name, credentials, licenseNo, contact, website, cities, expertise } = body;

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
        active,
        cities,
        expertise
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, credentials, licenseNo, contact, website || null, null, cities, expertise]
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
    const harf = (searchParams.get('harf') || 'hepsi').toLowerCase();
    const sehirlerParam = searchParams.get('sehirler') || 'hepsi';
    const sehirler = sehirlerParam === 'hepsi' ? ['hepsi'] : sehirlerParam.split(',').map(s => {
      // İlk harfi büyük, diğerleri küçük yap
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    });
    let uzmanlik = decodeURIComponent((searchParams.get('uzmanlik') || 'hepsi'));
    if (uzmanlik !== 'hepsi') {
      // İlk harfi büyük, diğerleri küçük yap, "ve" kelimesini küçük bırak
      uzmanlik = uzmanlik.split(' ').map(word => {
        const lowerWord = word.toLowerCase();
        return lowerWord === 've' ? 've' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
    }
    const offset = (sayfa - 1) * limit;

    let query = `SELECT * FROM "arabulucubul-arabulucu" WHERE active IS TRUE`;
    const queryParams = [];
    let paramCount = 1;
    let pattern = '';

    if (!sehirler.includes('hepsi') && sehirler.length > 0) {
      const sehirKosulu = sehirler.map(() => `$${paramCount} = ANY(cities)`).join(' OR ');
      query += ` AND (${sehirKosulu})`;
      sehirler.forEach(sehir => {
        queryParams.push(sehir);
        paramCount++;
      });
    }

    if (uzmanlik !== 'hepsi') {
      query += ` AND $${paramCount} = ANY(expertise)`;
      queryParams.push(uzmanlik);
      paramCount++;
    }

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
    queryParams.push(Number(limit), Number(offset));

    console.log('Final query:', query);
    console.log('Final params:', queryParams);
    const result = await pool.query(query, queryParams);

    // Sayım sorgusu için yeni parametre dizisi oluştur
    const countQueryParams = [];
    let countParamCount = 1;
    let countQuery = 'SELECT COUNT(*) FROM "arabulucubul-arabulucu" WHERE active IS TRUE';

    if (!sehirler.includes('hepsi')) {
      const sehirKosulu = sehirler.map((_, idx) => `$${countParamCount + idx} = ANY(cities)`).join(' OR ');
      countQuery += ` AND (${sehirKosulu})`;
      sehirler.forEach(sehir => {
        countQueryParams.push(sehir);
        countParamCount++;
      });
    }

    if (uzmanlik !== 'hepsi') {
      countQuery += ` AND $${countParamCount} = ANY(expertise)`;
      countQueryParams.push(uzmanlik);
      countParamCount++;
    }

    if (harf !== 'hepsi') {
      countQuery += ` AND LEFT(name, 1) SIMILAR TO '${pattern}'`;
    }

    console.log('Count query:', countQuery);
    console.log('Count params:', countQueryParams);
    const totalCount = await pool.query(countQuery, countQueryParams);

    const response = {
      arabulucular: result.rows,
      toplam: parseInt(totalCount.rows[0].count)
    };
    
    console.log('Final response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Arabulucular listelenirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Arabulucular listelenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
