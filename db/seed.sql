-- Admin kullanıcısı ekleme (şifre: admin123)
INSERT INTO "arabulucubul-admin" (email, password) 
VALUES ('admin@arabulucubul.com', '$2b$10$O5SYDXK8O11u.T6/pnm4s.5QagmWbTVrxWij.DlqXr51wJ9Ah.gSm');

-- Örnek arabulucular
INSERT INTO "arabulucubul-arabulucu" 
(name, registration_number, biography, website_url, email, profile_image_url, status, active) 
VALUES 
-- Aktif arabulucular
('Ayşe Yılmaz', 'ARB001', 'İstanbul Üniversitesi Hukuk Fakültesi mezunu. 15 yıllık avukatlık ve 5 yıllık arabuluculuk deneyimi.', 'https://ayseyilmaz.av.tr', 'ayse.yilmaz@email.com', 'https://randomuser.me/api/portraits/women/1.jpg', 'approved', true),

('Mehmet Kaya', 'ARB002', 'Ankara Üniversitesi Hukuk Fakültesi mezunu. İş hukuku ve ticaret hukuku alanlarında uzman.', 'https://mehmetkaya.av.tr', 'mehmet.kaya@email.com', 'https://randomuser.me/api/portraits/men/1.jpg', 'approved', true),

('Zeynep Demir', 'ARB003', '10 yıllık arabuluculuk deneyimi. Aile hukuku ve iş hukuku alanlarında uzman.', 'https://zeynepdemir.av.tr', 'zeynep.demir@email.com', 'https://randomuser.me/api/portraits/women/2.jpg', 'approved', true),

-- Bekleyen arabulucular
('Ali Öztürk', 'ARB004', 'Galatasaray Üniversitesi Hukuk Fakültesi mezunu. Ticaret ve şirketler hukuku uzmanı.', 'https://aliozturk.av.tr', 'ali.ozturk@email.com', 'https://randomuser.me/api/portraits/men/2.jpg', 'pending', false),

('Selin Arslan', 'ARB005', 'Marmara Üniversitesi Hukuk Fakültesi mezunu. Uluslararası ticaret hukuku uzmanı.', 'https://selinarslan.av.tr', 'selin.arslan@email.com', 'https://randomuser.me/api/portraits/women/3.jpg', 'pending', false),

-- Yeni başvuran arabulucular
('Can Yıldız', 'ARB006', 'İzmir Ekonomi Üniversitesi Hukuk Fakültesi mezunu. Tüketici hukuku uzmanı.', 'https://canyildiz.av.tr', 'can.yildiz@email.com', 'https://randomuser.me/api/portraits/men/3.jpg', 'pending', false),

('Deniz Şahin', 'ARB007', 'Koç Üniversitesi Hukuk Fakültesi mezunu. Fikri mülkiyet hukuku uzmanı.', 'https://denizsahin.av.tr', 'deniz.sahin@email.com', 'https://randomuser.me/api/portraits/women/4.jpg', 'pending', false),

('Burak Aydın', 'ARB008', 'Hacettepe Üniversitesi Hukuk Fakültesi mezunu. Spor hukuku ve iş hukuku uzmanı.', 'https://burakydin.av.tr', 'burak.aydin@email.com', 'https://randomuser.me/api/portraits/men/4.jpg', 'pending', false),

('Elif Çelik', 'ARB009', 'ODTÜ Hukuk Fakültesi mezunu. Bilişim hukuku ve e-ticaret hukuku uzmanı.', 'https://elifcelik.av.tr', 'elif.celik@email.com', 'https://randomuser.me/api/portraits/women/5.jpg', 'pending', false);
