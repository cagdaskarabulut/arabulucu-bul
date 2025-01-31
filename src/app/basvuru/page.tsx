'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import "../../app/globals.css";

export default function Basvuru() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    licenseNo: "",
    credentials: "",
    contact: "",
    website: "",
  });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  const validateContact = (contact: string) => {
    // Email veya URL kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)/i;
    
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
      const response = await fetch("/api/arabulucu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/basvuru/basarili");
      } else {
        const data = await response.json();
        setHata(data.error || "Başvuru gönderilirken bir hata oluştu");
      }
    } catch (error) {
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
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
              placeholder="E-posta veya Websitesi"
            />
            <p className="text-sm text-gray-500">
              E-posta veya Websitesi
            </p>
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
