"use client";
import { Mahasiswa } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export const columns: ColumnDef<Mahasiswa>[] = [
  {
    accessorKey: "nama",
    header: "NAMA",
  },
  {
    accessorKey: "nim",
    header: "NIM",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "kelamin",
    header: "JENIS KELAMIN",
    cell: ({ row }) => {
      const kelamin = row.getValue("kelamin") as string;
      return (
        <span
          className={`inline-flex items-center gap-1 ${
            kelamin === "L" ? "text-blue-600" : "text-pink-600"
          }`}
        >
          {kelamin === "L" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="7" r="5" />
                <path d="M12 12v9" />
                <path d="M8 16h8" />
              </svg>
              Laki-laki
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="7" r="5" />
                <path d="M12 12v9" />
                <path d="M9 18l3-3 3 3" />
              </svg>
              Perempuan
            </>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "angkatan",
    header: "ANGKATAN",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors = {
        Aktif: "text-green-600",
        Cuti: "text-yellow-600", 
        Lulus: "text-blue-600",
        DO: "text-red-600"
      };
      return (
        <span className={colors[status as keyof typeof colors]}>
          {status}
        </span>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
