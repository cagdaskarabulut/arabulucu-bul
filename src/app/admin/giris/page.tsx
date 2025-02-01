'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import "../../../app/globals.css";

export default function AdminGiris() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  const girisYap = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");
    setYukleniyor(true);

    try {
      const response = await fetch("/api/admin/giris", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/panel");
        router.refresh();
      } else {
        setHata(data.error || "Giriş yapılırken bir hata oluştu");
      }
    } catch (err) {
      console.error(err);
      setHata("Giriş yapılırken bir hata oluştu");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)]">
      <div className="w-full max-w-md px-4">
        <Card className="p-8 shadow-2xl bg-white/95 backdrop-blur">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Girişi</h1>
            <p className="text-gray-500 mt-2">Arabulucu Bul Yönetim Paneli</p>
          </div>

          <form onSubmit={girisYap} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Kullanıcı Adı
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12"
                placeholder="Kullanıcı adınızı girin"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
                placeholder="Şifrenizi girin"
              />
            </div>

            {hata && (
              <div className="p-3 rounded bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 text-center">{hata}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 transition-colors"
              disabled={yukleniyor}
            >
              {yukleniyor ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Giriş Yapılıyor...
                </div>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
