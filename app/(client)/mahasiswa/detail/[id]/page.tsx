import MahasiswaDetailView from "@/components/_mahasiswa/_detail/mahasiswa-detail";
import AppSidebar from "@/components/layout/app-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP MI | Mahasiswa Update",
};

interface MahasiswaDetailPageProps {
  params: {
    id: string;
  };
}

const MahasiswaDetailPage = ({ params }: MahasiswaDetailPageProps) => {
  return (
    <AppSidebar>
      <MahasiswaDetailView id={params.id} />
    </AppSidebar>
  );
};

export default MahasiswaDetailPage;
