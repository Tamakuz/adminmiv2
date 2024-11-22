import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Form from "./form";

const MahasiswaNewView = () => {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title="Tambah Mahasiswa"
            description="Tambah data mahasiswa baru"
          />
          <Link href="/mahasiswa">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
        </div>

        <Separator />

        <Form />
      </div>
    </PageContainer>
  );
};

export default MahasiswaNewView;
