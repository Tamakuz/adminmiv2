import AppSidebar from "@/components/layout/app-sidebar";
import PenggunaView from "@/components/_pengguna/pengguna";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP MI | Pengguna",
};

const PenggunaPage = () => {
  return (
    <AppSidebar>
      <PenggunaView />
    </AppSidebar>
  );
};

export default PenggunaPage;
