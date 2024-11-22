import MahasiswaNewView from "@/components/_mahasiswa/_new/mahasiswa-new";
import AppSidebar from "@/components/layout/app-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP MI | Mahasiswa New",
};

const MahasiswaNewPage = () => {
  return (
    <AppSidebar>
      <MahasiswaNewView />
    </AppSidebar>
  );
}

export default MahasiswaNewPage;
