"use client";

import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "./components/Header";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>
          Arabulucu Bul - Türkiye'nin En Kapsamlı Arabulucu Arama Platformu
        </title>
        <meta
          name="description"
          content="Türkiye'nin en kapsamlı arabulucu arama ve arabulucu liste platformu. Sicil numarası ile arabulucu sorgulama, arabulucu özgeçmiş ve iletişim bilgilerine hızlı erişim."
        />
        <meta
          name="keywords"
          content="arabulucu, arabulucu bul, arabulucu liste, arabulucu sorgula, arabulucu sicil no, arabuluculuk, hukuki arabulucu, ticari arabulucu, işçi arabulucu, tüketici arabulucu"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="ArabulucuBul.com" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Arabulucu Bul - Türkiye'nin En Kapsamlı Arabulucu Arama Platformu"
        />
        <meta
          property="og:description"
          content="Türkiye'nin en kapsamlı arabulucu arama ve arabulucu liste platformu. Sicil numarası ile arabulucu sorgulama, arabulucu özgeçmiş ve iletişim bilgilerine hızlı erişim."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-blue-50 to-white",
          outfit.className
        )}
        suppressHydrationWarning
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-8KTDF3483E" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-8KTDF3483E');
        `}
        </Script>

        <meta
          name="google-site-verification"
          content="mcF3__vXdmLl7JaonN29Ku4IIeQs5oH_MWokPa8p6U8"
        />
        {/* Navigation Bar */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-white mt-16 py-12 border-t border-blue-100">
          <div className="container mx-auto px-4 text-sm text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Yasal Uyarı ve Bilgilendirme
                </h3>
                <p className="mb-2">
                  Bu sitede paylaşılan bilgiler yalnızca bilgilendirme amaçlı
                  olup, Türkiye Cumhuriyeti Barolar Birliği&apos;nin ilgili
                  düzenlemeleri uyarınca reklam, teklif, hukuki öneri veya
                  danışmanlık teşkil etmez.
                </p>
                <p className="mb-2">
                  Sitede sunulan bilgiler hakkında Arabulucu-bul.com.tr sitesi
                  sorumluluk kabul etmez. Bu sitede paylaşılan bilgiler, ve sair
                  veriler Arabulucu-bul.com.tr&apos;a ait olup, bütünün yazılı
                  izni olmaksızın kullanılamaz.
                </p>
                <p>
                  Bu internet sitesinde yer alan tüm bilgiler, 6325 sayılı Hukuk
                  Uyuşmazlıklarında Arabuluculuk Kanunu ve ilgili yönetmeliklere
                  uygun olarak hazırlanmıştır.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Kişisel Verilerin Korunması
                </h3>
                <p className="mb-2">
                  Sitemizde sunulan içerikler yalnızca bilgilendirme amaçlıdır
                  ve resmi Arabulucular Sicili verilerine dayanmaktadır. Sitede
                  yer alan arabulucuların kişisel bilgileri, 6698 sayılı Kişisel
                  Verilerin Korunması Kanunu (KVKK) hükümleri çerçevesinde,
                  kendilerinin açık rızası ile paylaşılmaktadır.
                </p>
                <p>
                  Kullanıcıların, burada yer alan bilgileri başka bir amaçla
                  kullanmamaları ve ticari faaliyetlerde bulunmamaları
                  gerektiğini önemle hatırlatırız.
                </p>
              </div>
            </div>
            <p className="text-center mt-8">
              {new Date().getFullYear()} Arabulucu-bul.com.tr. Tüm Hakları
              Saklıdır.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
