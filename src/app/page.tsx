'use client';

import { useState, useEffect, useCallback } from "react";
import MediatorCard from "./components/MediatorCard";
import Pagination from "@/components/Pagination";
import "../app/globals.css";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface Arabulucu {
  id: number;
  name: string;
  registration_number: string;
  biography: string;
  website_url: string;
  email: string;
}

const TURKCE_HARFLER = ['Hepsi', 'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'];
const SAYFA_BOYUTU = 9;

export default function Home() {
  const [sayfa, setSayfa] = useState(1);
  const [toplamSayfa, setToplamSayfa] = useState(1);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [seciliHarf, setSeciliHarf] = useState('Hepsi');
  const [filtrelenmisArabulucular, setFiltrelenmisArabulucular] = useState<Arabulucu[]>([]);

  const arabuluculariGetir = useCallback(async () => {
    setYukleniyor(true);
    try {
      const secilenHarf = seciliHarf === 'Hepsi' ? 'hepsi' : seciliHarf.toLowerCase();
      
      const response = await fetch(
        `/api/arabulucu?sayfa=${sayfa}&limit=${SAYFA_BOYUTU}&harf=${secilenHarf}`
      );
      const data = await response.json();
      
      setFiltrelenmisArabulucular(data.arabulucular);
      setToplamSayfa(Math.ceil(data.toplam / SAYFA_BOYUTU));
    } catch (error) {
      console.error("Arabulucular yüklenirken hata oluştu:", error);
    } finally {
      setYukleniyor(false);
    }
  }, [sayfa, seciliHarf]);

  useEffect(() => {
    setSayfa(1);
  }, [seciliHarf]);

  useEffect(() => {
    arabuluculariGetir();
  }, [arabuluculariGetir]);

  const sayfaDegistir = (yeniSayfa: number) => {
    setSayfa(yeniSayfa);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-4">
            Arabulucu Listesi
          </h2>
          <p className="text-[var(--primary-color)] max-w-2xl mx-auto mb-8">
            Türkiye&apos;nin önde gelen arabulucularına buradan ulaşabilirsiniz. İletişim bilgileri ve web siteleri için kartların alt kısmındaki butonları kullanabilirsiniz.
          </p>

          {/* Mobil ve tablet için dropdown menü */}
          <div className="lg:hidden mb-8 px-4 w-full max-w-md mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full text-base py-6">
                  {seciliHarf === 'Hepsi' ? 'Tüm Arabulucular' : `${seciliHarf} ile Başlayanlar`}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-[var(--primary-color)] shadow-lg"
                align="center"
              >
                {TURKCE_HARFLER.map((harf) => (
                  <DropdownMenuItem
                    key={harf}
                    onClick={() => setSeciliHarf(harf)}
                    className={`py-3 text-base ${
                      seciliHarf === harf 
                        ? "bg-[var(--primary-color)] text-white"
                        : "hover:bg-[var(--primary-color)]/10"
                    }`}
                  >
                    {harf === 'Hepsi' ? 'Tüm Arabulucular' : `${harf} ile Başlayanlar`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Masaüstü için buton grubu */}
          <div className="hidden lg:flex flex-wrap justify-center gap-1 mb-8 max-w-6xl mx-auto">
            {TURKCE_HARFLER.map((harf) => (
              <Button
                key={harf}
                onClick={() => setSeciliHarf(harf)}
                variant={seciliHarf === harf ? "default" : "outline"}
                className={`min-w-[28px] h-[28px] text-sm ${
                  harf === 'Hepsi' ? 'px-3' : 'px-0'} ${
                  seciliHarf === harf 
                    ? "selected-letter hover:shadow-[0_2px_10px_rgb(0,0,0,0.15)]" 
                    : "border-[var(--primary-color)] text-[var(--primary-color)] hover:shadow-[0_2px_10px_rgb(0,0,0,0.15)]"
                }`}
              >
                {harf}
              </Button>
            ))}
          </div>
        </header>

        {yukleniyor ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
          </div>
        ) : !filtrelenmisArabulucular || filtrelenmisArabulucular.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center text-[var(--primary-color)]">
            Bu kriterlere uygun arabulucu bulunamadı.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
              {filtrelenmisArabulucular.map((arabulucu, index) => (
                <MediatorCard
                  key={arabulucu.id}
                  name={arabulucu.name}
                  credentials={arabulucu.biography}
                  licenseNo={arabulucu.registration_number}
                  contact={arabulucu.email}
                  website={arabulucu.website_url}
                  colorIndex={index}
                />
              ))}
            </div>

            {toplamSayfa > 1 && (
              <Pagination
                currentPage={sayfa}
                totalPages={toplamSayfa}
                onPageChange={sayfaDegistir}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
