"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";

export function RegistrationModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => router.push("/basvuru")}
        variant="secondary"
        size="lg"
        className="bg-white text-blue-800 hover:bg-blue-50 transition-colors px-6 py-2 rounded-lg font-medium"
      >
        Arabulucu Olarak Kayıt Ol
      </Button>
    </Dialog>
  );
}
