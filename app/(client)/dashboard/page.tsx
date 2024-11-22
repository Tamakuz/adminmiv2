import Dashboard from "@/components/_dashboard/dashboard";
import AppSidebar from "@/components/layout/app-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <AppSidebar>
      <Dashboard />
    </AppSidebar>
  );
};

export default DashboardPage;
