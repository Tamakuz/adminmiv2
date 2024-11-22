"use client";

import { Dosen } from "@/constants/data";
import DataTableSearch from "../table/data-table-search";
import { useTableFilters } from "@/hooks/use-table-filter";
import DataTable from "../table/data-table";
import { columns } from "./column-dosen";

interface DosenTableProps {
  data: Dosen[];
  totalData: number;
}

const DosenTable = ({ data, totalData }: DosenTableProps) => {
  const { searchQuery, setSearchQuery, setPage } = useTableFilters();

  return (
    <div className="space-y-4">
      <DataTableSearch
        searchKey="nama"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTable search={searchQuery} columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}

export default DosenTable