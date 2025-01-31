'use client';

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { RegistrationModal } from "./components/RegistrationModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-blue-50 to-white",
          inter.className
        )}
        suppressHydrationWarning
      >
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="logo text-4xl">
                <span>Arabulucu</span>{" "}
                <span>Bul</span>
              </Link>
              <RegistrationModal />
            </div>
          </div>
        </nav>

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
                  olup, Türkiye Cumhuriyeti Barolar Birliği'nin ilgili
                  düzenlemeleri uyarınca reklam, teklif, hukuki öneri veya
                  danışmanlık teşkil etmez.
                </p>
                <p className="mb-2">
                  Sitede sunulan bilgiler hakkında Arabulucu-bul.com.tr sitesi
                  sorumluluk kabul etmez. Bu sitede paylaşılan bilgiler, ve sair
                  veriler Arabulucu-bul.com.tr'a ait olup, bütünün yazılı izni
                  olmaksızın kullanılamaz.
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
                  Sitemizde sunulan içerikler yalnızca bilgilendirme amaçlıdır ve
                  resmi Arabulucular Sicili verilerine dayanmaktadır. Sitede yer
                  alan arabulucuların kişisel bilgileri, 6698 sayılı Kişisel
                  Verilerin Korunması Kanunu (KVKK) hükümleri çerçevesinde,
                  kendilerinin açık rızası ile paylaşılmaktadır.
                </p>
                <p>
                  Kullanıcıların, burada yer alan bilgileri başka bir amaçla
                  kullanmamaları ve ticari faaliyetlerde bulunmamaları gerektiğini
                  önemle hatırlatırız.
                </p>
              </div>
            </div>
            <p className="text-center mt-8">
              {new Date().getFullYear()} Arabulucu-bul.com.tr. Tüm Hakları
              Saklıdır.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}