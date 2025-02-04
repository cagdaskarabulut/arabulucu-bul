'use client';

import { useState, useEffect, useCallback } from "react";
import MediatorCard from "./components/MediatorCard";
import Pagination from "@/components/Pagination";
import "../app/globals.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
  cities: string[];
  expertise: string[];
}

import { SEHIRLER, TUM_UZMANLIKLAR } from '@/constants';

const TURKCE_HARFLER = ['Hepsi', 'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'];
const SAYFA_BOYUTU = 9;

export default function Home() {
  const router = useRouter();
  const [sayfa, setSayfa] = useState(1);
  const [toplamSayfa, setToplamSayfa] = useState(1);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [seciliHarf, setSeciliHarf] = useState('Hepsi');
  const [seciliSehirler, setSeciliSehirler] = useState<string[]>(['Hepsi']);
  const [seciliUzmanlik, setSeciliUzmanlik] = useState('Hepsi');
  const [filtrelenmisArabulucular, setFiltrelenmisArabulucular] = useState<Arabulucu[]>([]);

  const arabuluculariGetir = useCallback(async () => {
    setYukleniyor(true);
    try {
      const secilenHarf = seciliHarf === 'Hepsi' ? 'hepsi' : seciliHarf.toLowerCase();
      const secilenSehirler = seciliSehirler.includes('Hepsi') ? 'hepsi' : seciliSehirler.join(',');
      const secilenUzmanlik = seciliUzmanlik === 'Hepsi' ? 'hepsi' : encodeURIComponent(seciliUzmanlik);
      
      const response = await fetch(
        `/api/arabulucu?sayfa=${sayfa}&limit=${SAYFA_BOYUTU}&harf=${secilenHarf}&sehirler=${secilenSehirler}&uzmanlik=${secilenUzmanlik}`
      );
      const data = await response.json();
      
      setFiltrelenmisArabulucular(data.arabulucular);
      setToplamSayfa(Math.ceil(data.toplam / SAYFA_BOYUTU));
    } catch (error) {
      console.error("Arabulucular yüklenirken hata oluştu:", error);
    } finally {
      setYukleniyor(false);
    }
  }, [sayfa, seciliHarf, seciliSehirler, seciliUzmanlik]);

  useEffect(() => {
    setSayfa(1);
  }, [seciliHarf, seciliSehirler, seciliUzmanlik]);

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
          <p className="text-[var(--primary-color)] max-w-2xl mx-auto mb-4">
            Sitemize kayıtlı arabulucuların bilgilerine ve iletişim detaylarına buradan ulaşabilirsiniz. Daha fazla bilgi için kartların alt kısmındaki butonları kullanabilirsiniz.
          </p>

          {/* Mobil için kayıt butonu */}
          <Button
            onClick={() => router.push("/basvuru")}
            className="md:hidden bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 mb-8 mx-auto"
          >
            Arabulucu Olarak Kayıt Ol
          </Button>

          {/* Mobil ve tablet için dropdown menüler */}
          <div className="lg:hidden mb-8 px-4 w-full max-w-md mx-auto space-y-4 touch-pan-y">
            <style jsx global>{`
              .dropdown-trigger {
                touch-action: manipulation;
              }
              .dropdown-content {
                touch-action: pan-y pinch-zoom;
              }
            `}</style>
            {/* İsim Filtresi */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full text-base py-6 mobile-dropdown-trigger">
                  {seciliHarf === 'Hepsi' ? 'Tüm Arabulucular' : `${seciliHarf} ile Başlayanlar`}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-[var(--primary-color)] shadow-lg max-h-[40vh] overflow-y-auto mobile-dropdown-content"
                align="center"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {TURKCE_HARFLER.map((harf) => (
                  <DropdownMenuItem
                    key={harf}
                    onClick={() => setSeciliHarf(harf)}
                    className={`py-3 text-base ${
                      seciliHarf === harf 
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "hover:bg-[var(--primary-color)]/10"
                    }`}
                  >
                    {harf === 'Hepsi' ? 'Tüm Arabulucular' : `${harf} ile Başlayanlar`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Şehir Filtresi */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-base py-6">
                  {seciliSehirler.includes('Hepsi') ? 'Tüm Şehirler' : `${seciliSehirler.length} Şehir Seçili`}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-[var(--primary-color)] shadow-lg max-h-[40vh] overflow-y-auto mobile-dropdown-content"
                align="center"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {SEHIRLER.map((sehir) => (
                  <DropdownMenuItem
                    key={sehir}
                    onSelect={(e) => {
                      e.preventDefault();
                      if (sehir === 'Hepsi') {
                        setSeciliSehirler(['Hepsi']);
                      } else {
                        const yeniSehirler = seciliSehirler.filter(s => s !== 'Hepsi');
                        if (seciliSehirler.includes(sehir)) {
                          setSeciliSehirler(yeniSehirler.filter(s => s !== sehir));
                        } else {
                          setSeciliSehirler([...yeniSehirler, sehir]);
                        }
                      }
                    }}
                    className={`py-3 text-base w-full flex items-center ${seciliSehirler.includes(sehir) ? 'bg-orange-500 text-white hover:bg-orange-600' : 'hover:bg-[var(--primary-color)]/10'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={seciliSehirler.includes(sehir)}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4"
                      />
                      <span>{sehir}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Uzmanlık Filtresi */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full text-base py-6 mobile-dropdown-trigger">
                  {seciliUzmanlik === 'Hepsi' ? 'Tüm Uzmanlıklar' : seciliUzmanlik}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-[var(--primary-color)] shadow-lg dropdown-content"
                align="center"
              >
                {TUM_UZMANLIKLAR.map((uzmanlik) => (
                  <DropdownMenuItem
                    key={uzmanlik}
                    onClick={() => setSeciliUzmanlik(uzmanlik)}
                    className={`py-3 text-base ${
                      seciliUzmanlik === uzmanlik 
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "hover:bg-[var(--primary-color)]/10"
                    }`}
                  >
                    {uzmanlik}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Masaüstü için filtre grupları */}
          <div className="hidden lg:block mb-8">
            {/* Filtreler */}
            <div className="flex justify-center gap-4">
              {/* İsim Filtresi */}
              <div className="w-64">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {seciliHarf === 'Hepsi' ? 'İsme Göre Filtrele' : `${seciliHarf} ile Başlayanlar`}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-[300px] overflow-y-auto bg-white">
                    {TURKCE_HARFLER.map((harf) => (
                      <DropdownMenuItem
                        key={harf}
                        onClick={() => setSeciliHarf(harf)}
                        className={seciliHarf === harf ? "bg-orange-500 text-white" : ""}
                      >
                        {harf === 'Hepsi' ? 'Tüm Arabulucular' : `${harf} ile Başlayanlar`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Şehir Filtresi */}
              <div className="w-64">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {seciliSehirler.includes('Hepsi') ? 'Tüm Şehirler' : `${seciliSehirler.length} Şehir Seçili`}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-[300px] overflow-y-auto bg-white">
                    {SEHIRLER.map((sehir) => (
                      <DropdownMenuItem
                        key={sehir}
                        onSelect={(e) => {
                          e.preventDefault();
                          if (sehir === 'Hepsi') {
                            setSeciliSehirler(['Hepsi']);
                          } else {
                            const yeniSehirler = seciliSehirler.filter(s => s !== 'Hepsi');
                            if (seciliSehirler.includes(sehir)) {
                              setSeciliSehirler(yeniSehirler.filter(s => s !== sehir));
                            } else {
                              setSeciliSehirler([...yeniSehirler, sehir]);
                            }
                          }
                        }}
                        className={`flex items-center space-x-2 ${seciliSehirler.includes(sehir) ? "bg-orange-500 text-white" : ""}`}

                      >
                        <input
                          type="checkbox"
                          checked={seciliSehirler.includes(sehir)}
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4"
                        />
                        <span>{sehir}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Uzmanlık Filtresi */}
              <div className="w-64">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {seciliUzmanlik === 'Hepsi' ? 'Tüm Uzmanlıklar' : seciliUzmanlik}
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-white max-h-[300px] overflow-y-auto">
                    {TUM_UZMANLIKLAR.map((uzmanlik) => (
                      <DropdownMenuItem
                        key={uzmanlik}
                        onClick={() => setSeciliUzmanlik(uzmanlik)}
                        className={seciliUzmanlik === uzmanlik ? "bg-orange-500 text-white" : ""}
                      >
                        {uzmanlik}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
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
                  cities={arabulucu.cities || []}
                  expertise={arabulucu.expertise}
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
