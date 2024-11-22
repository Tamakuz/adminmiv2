"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import useMahasiswaUpdateStore from "@/app/(client)/context/useMahasiswaUpdateStore";
import { Mahasiswa } from "@/constants/data";
interface CellActionProps {
  data: Mahasiswa;
}
const CellAction = ({ data }: CellActionProps) => {
  const setMahasiswa = useMahasiswaUpdateStore((state) => state.setMahasiswa);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem>
          <Link
            className="flex items-center"
            prefetch={true}
            href={`/mahasiswa/update/${data.id}`}
            onClick={() => setMahasiswa(data)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;