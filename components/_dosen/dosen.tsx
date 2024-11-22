import React from 'react'
import PageContainer from '../layout/page-container'
import { Separator } from '../ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Heading } from '../ui/heading';
import DosenTable from './dosen-table';
import { dosenData } from '@/constants/data';

const DosenView = () => {

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Dosen (${dosenData.length})`}
            description="Kelola data dosen manajemen informasi"
          />

          <Link
            href={"/dosen/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Dosen
          </Link>
        </div>
        <Separator />
        <DosenTable data={dosenData} totalData={dosenData.length} />
      </div>
    </PageContainer>
  );
}

export default DosenView;
