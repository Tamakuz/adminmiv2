import DosenView from "@/components/_dosen/dosen"
import AppSidebar from "@/components/layout/app-sidebar"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP MI | Dosen",
};

const DosenPage = () => {
  return (
    <AppSidebar>
      <DosenView />
    </AppSidebar>
  )
}

export default DosenPage