"use client";

import React from "react";
import PageContainer from "../layout/page-container";
import { Separator } from "../ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Heading } from "../ui/heading";
import { Mahasiswa, Response } from "@/constants/data";
import MahasiswaTable from "./mahasiswa-table";
import { useQuery } from "@tanstack/react-query";
import { getMahasiswa } from "@/app/(client)/services/mahasiswa";
import NotFound from "../404";

interface MahasiswaResponse extends Response {
  data: Mahasiswa[];
}

const DosenView = () => {
  const {data, isLoading} = useQuery<MahasiswaResponse, Error>({
    queryKey: ["mahasiswa"],
    queryFn: () => getMahasiswa(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      );
    }

    if (data?.error) {
      return (
        <NotFound
          message="Data tidak ditemukan"
          title={data.status.toString()}
          description={data.message}
        />
      );
    }


    return (
      <MahasiswaTable data={data?.data || []} totalData={data?.data?.length || 0} />
    );
  };
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Mahasiswa (${data?.data?.length || 0})`}
            description="Kelola data mahasiswa manajemen informasi"
          />

          <Link
            href={"/mahasiswa/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Mahasiswa
          </Link>
        </div>
        <Separator />
        {renderContent()}
      </div>
    </PageContainer>
  );
};

export default DosenView;
