"use client";

import { Mahasiswa } from "@/constants/data";
import DataTableSearch from "../table/data-table-search";
import { useTableFilters } from "@/hooks/use-table-filter";
import DataTable from "../table/data-table";
import { columns } from "./column-mahasiswa";

interface MahasiswaTableProps {
  data: Mahasiswa[];
  totalData: number;
}

const MahasiswaTable = ({ data, totalData }: MahasiswaTableProps) => {
  const { searchQuery, setSearchQuery, setPage } = useTableFilters();

  return (
    <div className="space-y-4">
      <DataTableSearch
        searchKey="nama"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTable
        search={searchQuery}
        columns={columns}
        data={data}
        totalItems={totalData}
      />
    </div>
  );
};

export default MahasiswaTable;
