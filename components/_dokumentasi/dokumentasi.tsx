"use client";
import PageContainer from "../layout/page-container";
import { dokumentasiData } from "@/constants/data";
import { Separator } from "../ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Heading } from "../ui/heading";
import CardDokumentasi from "./card-dokumentasi";

const DokumentasiView = () => {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Dokumentasi (${dokumentasiData.length})`}
            description="Kelola data dokumentasi foto"
          />

          <Link
            href={"/dokumentasi/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Dokumentasi
          </Link>
        </div>
        <Separator />
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {dokumentasiData.map((item) => (
            <CardDokumentasi data={item} key={item.id} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default DokumentasiView;
