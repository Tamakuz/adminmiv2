"use client";
import { useState } from "react";
import { Dokumentasi } from "@/constants/data";
import BlurFade from "../ui/blur-fade";

interface CardDokumentasiProps {
  data: Dokumentasi;
}

const CardDokumentasi = ({ data }: CardDokumentasiProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="mt-4 break-inside-avoid">
      <BlurFade isBlur={!isLoaded}>
        <div className="relative group cursor-pointer overflow-hidden rounded-xl">
          <img
            src={data.url_gambar}
            alt={data.judul}
            className="w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl backdrop-blur-sm">
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="space-y-3">
                <h3 className="text-white font-bold text-xl tracking-tight">
                  {data.judul}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed line-clamp-2 font-medium">
                  {data.deskripsi}
                </p>
                <div className="pt-2">
                  <p className="text-gray-300 text-xs font-medium bg-white/10 inline-block px-3 py-1 rounded-full">
                    {new Date(data.tanggal).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default CardDokumentasi;
