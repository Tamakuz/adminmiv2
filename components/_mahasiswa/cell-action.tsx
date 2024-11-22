"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import useMahasiswaStore from "@/app/(client)/context/useMahasiswaStore";
import { Mahasiswa } from "@/constants/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteMahasiswa } from "@/app/(client)/services/mahasiswa";

interface CellActionProps {
  data: Mahasiswa;
}
const CellAction = ({ data }: CellActionProps) => {
  const setMahasiswa = useMahasiswaStore((state) => state.setMahasiswa);
  const queryClient = useQueryClient();
  const { mutate: deleteMhs, isPending } = useMutation({
    mutationFn: () => deleteMahasiswa(data.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
            href={`/mahasiswa/detail/${data.id}`}
            onClick={() => setMahasiswa(data)}
          >
            <Eye className="mr-2 h-4 w-4" /> Detail
          </Link>
        </DropdownMenuItem>

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
        <DropdownMenuItem onClick={() => deleteMhs()}>
          <Trash className="mr-2 h-4 w-4" />{" "}
          {isPending ? "Menghapus..." : "Hapus"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
