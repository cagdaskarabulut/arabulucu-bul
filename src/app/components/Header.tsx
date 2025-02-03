'use client';

import Link from "next/link";
import { RegistrationModal } from "./RegistrationModal";

export function Header() {
  return (
    <nav className="bg-blue-900 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="logo text-4xl font-bold relative group">
                  Arabulucu Bul
              </Link>
              <RegistrationModal />
            </div>
          </div>
        </nav>
  );
}
