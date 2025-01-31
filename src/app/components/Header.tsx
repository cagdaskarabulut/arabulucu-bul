'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <h1 className="relative text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 group-hover:to-blue-100 transition-all duration-300">
                  <span className="mr-1">Arabulucu</span>
                  <span className="font-light text-blue-200">Bul</span>
                </h1>
              </div>
            </div>
          </Link>
          <Link href="/basvuru">
            <Button className="register-button hover:shadow-[0_4px_15px_rgb(0,0,0,0.2)]">
              <span>Arabulucu Olarak Kayıt Ol</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
