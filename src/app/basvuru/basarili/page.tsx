'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function BasvuruBasarili() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] p-4">
      <Card className="w-full max-w-lg p-8 space-y-6 bg-white/95 backdrop-blur shadow-2xl text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Başvurunuz Alındı!</h1>
        <p className="text-gray-600">
          Başvurunuz başarıyla alınmıştır. İncelendikten sonra onaylanması durumunda profiliniz ana sayfada listelenecektir.
        </p>
        <Button 
          onClick={() => router.push('/')}
          className="btn-secondary btn-lg w-full"
        >
          Ana Sayfaya Dön
        </Button>
      </Card>
    </div>
  );
}
