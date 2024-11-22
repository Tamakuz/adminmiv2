"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { Heading } from "../ui/heading";
import PageContainer from "../layout/page-container";
import PenggunaTable from "./pengguna-table";
import NotFound from "../404";
import { Response, Pengguna } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/(client)/services/user";
import { useSession } from "next-auth/react";

interface UserResponse extends Response {
  data: Pengguna[];
}

const PenggunaView = () => {
  const {data: session} = useSession();
  const { data, isLoading } = useQuery<UserResponse, Error>({
    queryKey: ["users"],
    queryFn: () => {
      if (!session?.user?.authorization) {
        throw new Error("Unauthorized");
      }
      return getUsers(session.user.authorization);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
  
  const isNotSuperAdmin = session?.user?.role !== "super_admin";

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
          message="Forbidden"
          title={data.status.toString()} 
          description={data.message}
        />
      );
    }

    if (isNotSuperAdmin) {
      return (
        <NotFound
          message="Forbidden"
          title="403"
          description="Maaf, anda tidak memiliki akses"
        />
      );
    }

    return (
      <PenggunaTable 
        data={data?.data || []} 
        totalData={data?.data?.length || 0} 
      />
    );
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading
          title={`Pengguna (${data?.data.length ?? 0})`}
          description="Kelola data pengguna manajemen informasi"
        />

        <Separator />

        {renderContent()}
      </div>
    </PageContainer>
  );
};

export default PenggunaView;
