'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GENEL_UZMANLIKLAR, OZEL_UZMANLIKLAR, SEHIRLER } from '@/constants';
import "../../app/globals.css";

export default function Basvuru() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    licenseNo: "",
    credentials: "",
    contact: "",
    website: "",
    cities: [] as string[],
    expertise: [] as string[],
  });

  // Şehir listesi constants dosyasından alınıyor

  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  const validateContact = (contact: string) => {
    // Email kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // URL kontrolü - www ile başlayan veya domain.com formatında olan
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\.[a-z]{2,})+$/i;
    
    return emailRegex.test(contact) || urlRegex.test(contact);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");

    if (!validateContact(formData.contact)) {
      setHata("Lütfen geçerli bir e-posta adresi veya web sitesi adresi (http:// veya https:// ile başlayan) girin");
      return;
    }

    setYukleniyor(true);

    try {
      // Arabulucu başvurusunu kaydet
      const response = await fetch("/api/arabulucu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // E-posta gönder
        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.contact,
            phoneNumber: formData.licenseNo,
          }),
        });

        router.push("/basvuru/basarili");
      } else {
        const data = await response.json();
        setHata(data.error || "Başvuru gönderilirken bir hata oluştu");
      }
    } catch (err) {
      console.error(err);
      setHata("Başvuru gönderilirken bir hata oluştu");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-secondary p-4">
      <Card className="w-full max-w-2xl p-8 space-y-6 bg-white/95 backdrop-blur shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Arabulucu Başvurusu</h1>
          <p className="mt-2 text-gray-600">
            Lütfen aşağıdaki formu eksiksiz doldurunuz
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Adınız ve soyadınız"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNo">Sicil Numarası</Label>
            <Input
              id="licenseNo"
              value={formData.licenseNo}
              onChange={(e) =>
                setFormData({ ...formData, licenseNo: e.target.value })
              }
              required
              placeholder="Arabulucu sicil numaranız"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Şehir</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {formData.cities.length === 0 ? 'Şehir Seçiniz' : `${formData.cities.length} Şehir Seçili`}
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full bg-white max-h-[300px] overflow-y-auto" align="start">
                {SEHIRLER.filter(sehir => sehir !== 'Hepsi').map((sehir) => (
                  <DropdownMenuItem 
                    key={sehir} 
                    onSelect={(e) => {
                      e.preventDefault();
                      if (formData.cities.includes(sehir)) {
                        setFormData({ ...formData, cities: formData.cities.filter(s => s !== sehir) });
                      } else {
                        setFormData({ ...formData, cities: [...formData.cities, sehir] });
                      }
                    }}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.cities.includes(sehir)}
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

          <div className="space-y-2">
            <Label htmlFor="expertise">Uzmanlık Alanları</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Genel Uzmanlık Alanları</h3>
                <div className="grid grid-cols-2 gap-2">
                  {GENEL_UZMANLIKLAR.map((uzmanlik) => (
                    <label key={uzmanlik} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.expertise.includes(uzmanlik)}
                        onChange={(e) => {
                          const updatedExpertise = e.target.checked
                            ? [...formData.expertise, uzmanlik]
                            : formData.expertise.filter((exp) => exp !== uzmanlik);
                          setFormData({ ...formData, expertise: updatedExpertise });
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{uzmanlik}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Özel Uzmanlık Alanları</h3>
                <div className="grid grid-cols-2 gap-2">
                  {OZEL_UZMANLIKLAR.map((uzmanlik) => (
                    <label key={uzmanlik} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.expertise.includes(uzmanlik)}
                        onChange={(e) => {
                          const updatedExpertise = e.target.checked
                            ? [...formData.expertise, uzmanlik]
                            : formData.expertise.filter((exp) => exp !== uzmanlik);
                          setFormData({ ...formData, expertise: updatedExpertise });
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{uzmanlik}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentials">Özgeçmiş</Label>
            <Textarea
              id="credentials"
              value={formData.credentials}
              onChange={(e) =>
                setFormData({ ...formData, credentials: e.target.value })
              }
              required
              placeholder="Özgeçmişiniz"
              className="min-h-[500px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">İletişim (E-posta veya Web Sitesi)</Label>
            <p className="text-sm text-gray-500">
              E-posta adresi (örn: isim@domain.com) veya web sitesi adresi (örn: www.siteadi.com)
            </p>
            <Input
              id="contact"
              value={formData.contact}
              placeholder="ornek@email.com veya www.siteadi.com"
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Web Sitesi (İsteğe Bağlı)</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="Web siteniz (varsa)"
            />
          </div>

          {hata && (
            <div className="p-3 rounded bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 text-center">{hata}</p>
            </div>
          )}

          <Button
            type="submit"
            className="btn-secondary btn-lg w-full"
            disabled={yukleniyor}
          >
            {yukleniyor ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Gönderiliyor...
              </div>
            ) : (
              "Başvuruyu Gönder"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
