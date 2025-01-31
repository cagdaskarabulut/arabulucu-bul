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
}

export default function MediatorCard({
  name,
  credentials,
  licenseNo,
  contact,
  website,
  colorIndex,
}: MediatorCardProps) {
  const bgColor = cardColors[colorIndex % cardColors.length];

  const handleMailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWebsiteClick = (url: string) => {
    // URL'nin http veya https ile başlamasını sağla
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
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
      </CardHeader>
      <CardContent className="pt-2">
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
                  className="contact-button btn-primary btn-sm bg-[var(--primary-color)]"
                  onClick={() => handleMailClick(contact)}
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
                    onClick={() => handleWebsiteClick(website)}
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