import MahasiswaNewView from "@/components/_mahasiswa/_new/mahasiswa-new";
import MahasiswaUpdateView from "@/components/_mahasiswa/_update.tsx/mahasiswa-update";
import AppSidebar from "@/components/layout/app-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP MI | Mahasiswa Update",
};

interface MahasiswaUpdatePageProps {
  params: {
    id: string;
  };
}

const MahasiswaUpdatePage = ({ params }: MahasiswaUpdatePageProps) => {
  return (
    <AppSidebar>
      <MahasiswaUpdateView id={params.id} />
    </AppSidebar>
  );
};

export default MahasiswaUpdatePage;
