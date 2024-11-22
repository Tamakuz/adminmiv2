import MahasiswaView from "@/components/_mahasiswa/mahasiswa";
import AppSidebar from "@/components/layout/app-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP MI | Mahasiswa",
};

const MahasiswaPage = () => {
  return (
    <AppSidebar>
      <MahasiswaView />
    </AppSidebar>
  );
};

export default MahasiswaPage;
