import PageContainer from "@/components/layout/page-container";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Detail from "./detail";

interface MahasiswaDetailViewProps {
  id: string;
}

const MahasiswaDetailView = ({ id }: MahasiswaDetailViewProps) => {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title="Update Mahasiswa"
            description="Detail data mahasiswa"
          />
          <Link href="/mahasiswa">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
        </div>

        <Separator />

        <Detail id={id} />
      </div>
    </PageContainer>
  );
};

export default MahasiswaDetailView