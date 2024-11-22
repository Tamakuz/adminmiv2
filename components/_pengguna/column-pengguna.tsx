"use client";
import { Pengguna } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export const columns: ColumnDef<Pengguna>[] = [
  {
    accessorKey: "nama",
    header: "NAMA",
    cell: ({ row }) => {
      const value = row.getValue("nama");
      return value || <span className="text-red-500">Belum diset</span>;
    }
  },
  {
    accessorKey: "username", 
    header: "USERNAME",
    cell: ({ row }) => {
      const value = row.getValue("username");
      return value || <span className="text-red-500">Belum diset</span>; 
    }
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const colors = {
        super_admin: "text-green-600",
        admin: "text-yellow-600"
      };
      return (
        <span className={`inline-flex items-center gap-1 ${colors[role as keyof typeof colors]}`}>
          {role === "super_admin" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              {role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </>
          )}
        </span>
      );
    }
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors = {
        aktif: "text-green-600",
        nonaktif: "text-red-600"
      };
      return (
        <span className={colors[status as keyof typeof colors]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      if (role !== "super_admin") {
        return <CellAction data={row.original} />;
      }
      return null;
    }
  }
];
