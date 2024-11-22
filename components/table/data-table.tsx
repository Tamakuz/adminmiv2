"use client";

/**
 * Import statements for required dependencies and components
 */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseAsInteger, useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";


interface DataTableProps<TData, TValue> {
  search: string;
  columns: ColumnDef<TData, TValue>[]; // Column definitions for the table
  data: TData[]; // Array of data to display
  totalItems: number; // Total number of items for pagination
}

const DataTable = <TData, TValue>({ 
  search,
  columns,
  data,
  totalItems,
}: DataTableProps<TData, TValue>) => {
  // State management for pagination using URL query parameters
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({ shallow: false, history: "push" })
      .withDefault(10)
  );

  // Current pagination state
  const paginationState = {
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  };

  const handlePaginationChange = (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState)
  ) => {
    const pagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue(paginationState)
        : updaterOrValue;

    setCurrentPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
  };

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!search) return data;
    
    return data.filter((item) => {
      return Object.values(item as any).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);
  
  // Calculate paginated data slice
  const paginatedData = filteredData.slice(
    paginationState.pageIndex * paginationState.pageSize,
    (paginationState.pageIndex + 1) * paginationState.pageSize
  );
  
  // Initialize table instance with configuration
  const table = useReactTable({
    data: paginatedData,
    columns,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: handlePaginationChange,
    pageCount: Math.ceil(filteredData.length / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <div className="space-y-4">
      <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
        <Table className="relative">
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        {/* Pagination Info */}
        <div className="flex text-nowrap items-center justify-center text-sm text-muted-foreground">
          {filteredData.length > 0 ? (
            <>
              Menampilkan {paginationState.pageIndex * paginationState.pageSize + 1}{" "}
              sampai{" "}
              {Math.min(
                (paginationState.pageIndex + 1) * paginationState.pageSize,
                filteredData.length
              )}{" "}
              dari {filteredData.length} data
            </>
          ) : (
            "Tidak ada data"
          )}
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          {/* Page Counter */}
          <div className="flex w-[150px] items-center justify-center text-sm font-medium">
            {filteredData.length > 0 ? (
              <>
                Page {paginationState.pageIndex + 1} of {table.getPageCount()}
              </>
            ) : (
              "No pages"
            )}
          </div>
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
