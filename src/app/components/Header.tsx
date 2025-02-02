'use client';

import Link from "next/link";
import { RegistrationModal } from "./RegistrationModal";

export function Header() {
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="logo text-4xl">
                <span>Arabulucu</span>{" "}
                <span>Bul</span>
              </Link>
              <RegistrationModal />
            </div>
          </div>
        </nav>
  );
}
