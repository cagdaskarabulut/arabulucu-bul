import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ArabulucuCardProps {
  name: string;
  registrationNumber: string;
  biography: string;
  websiteUrl: string;
  email: string;
  profileImageUrl: string;
}

export function ArabulucuCard({
  name,
  registrationNumber,
  biography,
  websiteUrl,
  email,
  profileImageUrl,
}: ArabulucuCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={profileImageUrl}
          alt={`${name} profil fotoğrafı`}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">Sicil No: {registrationNumber}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{biography}</p>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(websiteUrl, "_blank")}
          >
            Web Sitesi
          </Button>
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.location.href = `mailto:${email}`}
          >
            E-posta Gönder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
