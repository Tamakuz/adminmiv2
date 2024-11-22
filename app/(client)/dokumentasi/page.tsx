import AppSidebar from "@/components/layout/app-sidebar";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DokumentasiView = dynamic(
  () => import("@/components/_dokumentasi/dokumentasi"),
  {
    ssr: false
  }
);

export const metadata: Metadata = {
  title: "ERP MI | Dokumentasi",
};

function DokumentasiPage() {
  return (
    <AppSidebar>
      <DokumentasiView />
    </AppSidebar>
  );
}

export default DokumentasiPage;