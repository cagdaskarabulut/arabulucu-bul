'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "../../../app/globals.css";

interface Arabulucu {
  id: number;
  name: string;
  credentials: string;
  licenseNo: string;
  contact: string;
  website?: string;
  active: boolean | null;
  created_at: string;
}

export default function AdminPanel() {
  const [arabulucular, setArabulucular] = useState<Arabulucu[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [islemYapiliyor, setIslemYapiliyor] = useState<number | null>(null);

  const cikisYap = async () => {
    try {
      const response = await fetch('/api/admin/cikis', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/admin/giris';
      }
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  const arabuluculariGetir = async () => {
    try {
      const response = await fetch('/api/admin/arabulucular');
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin/giris';
          return;
        }
        throw new Error('Arabulucular getirilemedi');
      }
      const data = await response.json();
      const siraliArabulucular = data.sort((a: Arabulucu, b: Arabulucu) => {
        if (a.active === null && b.active !== null) return -1;
        if (a.active !== null && b.active === null) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setArabulucular(siraliArabulucular);
    } catch (error) {
      console.error('Arabulucular yüklenirken hata:', error);
      window.location.href = '/admin/giris';
    } finally {
      setYukleniyor(false);
    }
  };

  const durumGuncelle = async (id: number, active: boolean) => {
    try {
      setIslemYapiliyor(id);
      const response = await fetch('/api/arabulucu/onay', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, active }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin/giris';
          return;
        }
        throw new Error('Durum güncellenemedi');
      }

      await arabuluculariGetir();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
    } finally {
      setIslemYapiliyor(null);
    }
  };

  const iletisimTikla = (contact: string) => {
    // URL formatını kontrol et
    const urlRegex = /^(https?:\/\/)/i;
    if (urlRegex.test(contact)) {
      // Eğer URL ise yeni sekmede aç
      window.open(contact, '_blank');
    } else {
      // Eğer email ise mailto: ile aç
      window.location.href = `mailto:${contact}`;
    }
  };

  useEffect(() => {
    arabuluculariGetir();
  }, []);

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-[var(--secondary-color)] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--secondary-color)] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Arabulucu Başvuruları</h1>
          <Button
            onClick={cikisYap}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            Çıkış Yap
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sicil No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İletişim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başvuru Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {arabulucular.map((arabulucu) => (
                  <tr key={arabulucu.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{arabulucu.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {arabulucu.licenseNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => iletisimTikla(arabulucu.contact)}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {arabulucu.contact}
                      </button>
                      {arabulucu.website && (
                        <div className="text-sm text-gray-500">{arabulucu.website}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        arabulucu.active === null
                          ? 'bg-yellow-100 text-yellow-800'
                          : arabulucu.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {arabulucu.active === null
                          ? 'Bekleniyor'
                          : arabulucu.active
                          ? 'Onaylandı'
                          : 'Reddedildi'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(arabulucu.created_at).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {arabulucu.active === null && (
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                            onClick={() => durumGuncelle(arabulucu.id, true)}
                            disabled={islemYapiliyor === arabulucu.id}
                          >
                            Onayla
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => durumGuncelle(arabulucu.id, false)}
                            disabled={islemYapiliyor === arabulucu.id}
                          >
                            Reddet
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {arabulucular.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Henüz başvuru bulunmuyor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
