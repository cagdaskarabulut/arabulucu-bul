-- Admin tablosunu oluştur
CREATE TABLE IF NOT EXISTS "arabulucubul-admin" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Varsayılan admin hesabını ekle (şifre: admin123)
INSERT INTO "arabulucubul-admin" (email, password) 
VALUES ('admin@arabulucubul.com', '$2b$10$8jQg3mXBLiUzQzlYFVEz2.Qz8Wqn6T5XpXg5PQz5K5X5X5X5X5X5X');
