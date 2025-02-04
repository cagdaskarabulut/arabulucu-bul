"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Globe } from "lucide-react";

const cardColors = [
  "bg-[#FFE6E6]", // Pastel Kırmızı
  "bg-[#E6FFE6]", // Pastel Yeşil
  "bg-[#E6E6FF]", // Pastel Mavi
  "bg-[#FFE6FF]", // Pastel Mor
  "bg-[#FFFBE6]", // Pastel Sarı
  "bg-[#FFE6EB]", // Pastel Pembe
  "bg-[#E6FFF9]", // Pastel Turkuaz
];

export interface MediatorCardProps {
  name: string;
  credentials: string;
  licenseNo: string;
  contact: string;
  website?: string;
  colorIndex: number;
  cities: string[];
  expertise: string[];
}

export default function MediatorCard({
  name,
  credentials,
  licenseNo,
  contact,
  website,
  colorIndex,
  cities,
  expertise,
}: MediatorCardProps) {
  const bgColor = cardColors[colorIndex % cardColors.length];

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleContactClick = (contact: string) => {
    if (isValidEmail(contact)) {
      window.location.href = `mailto:${contact}`;
    } else if (isValidUrl(contact)) {
      const fullUrl = contact.startsWith('http') ? contact : `https://${contact}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${bgColor} rounded-lg border-none
                    hover:-translate-y-1`}
    >
      <CardHeader className="relative pb-2 space-y-0">
        <CardTitle className="text-lg font-medium text-gray-700 leading-tight">
          {name}
        </CardTitle>
        <div className="text-sm text-gray-500 mt-1">
          Sicil No: {licenseNo}
        </div>
        {Array.isArray(cities) && cities.length > 0 && (
          <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-2">
            {cities.map((city, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {city}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        {expertise && expertise.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {expertise.map((exp, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {exp}
              </span>
            ))}
          </div>
        )}
        <p className="text-gray-600 text-sm line-clamp-10 mb-4">
          {credentials}
        </p>
        <div className="flex gap-2 mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContactClick(contact)}
                  className="contact-button btn-primary btn-sm bg-[var(--primary-color)]"
                >
                  <span className="relative z-10 hover:text-[var(--primary-color)]">
                    <Mail className="h-4 w-4 " />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>E-posta Gönder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {website && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="contact-button btn-secondary btn-sm bg-[var(--primary-color)]"
                    onClick={() => handleContactClick(website)}
                  >
                    <span className="relative z-10 hover:text-[var(--secondary-color)]">
                      <Globe className="h-4 w-4 " />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Web Sitesini Ziyaret Et</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
}