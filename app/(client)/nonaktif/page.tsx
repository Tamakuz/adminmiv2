"use client";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";

const Nonaktif = dynamic(() => import("@/components/404"), { ssr: false });

const NonaktifPage = () => {
  return (
    <Nonaktif
      message="Akun anda tidak aktif"
      title="403"
      description="Silahkan hubungi admin untuk mengaktifkan kembali akun anda"
      buttonText="Logout"
      buttonFn={() => signOut({ callbackUrl: "/" })}
    />
  );
};

export default NonaktifPage;
