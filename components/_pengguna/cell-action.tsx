import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Pengguna } from "@/constants/data";
import UpdateModal from "./update-modal";
import { cn } from "@/lib/utils";
import DeleteUser from "./delete-pengguna";

interface CellActionProps {
  data: Pengguna;
}

const CellAction = ({ data }: CellActionProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            className={cn(data.role === "super_admin" && "cursor-not-allowed")}
            disabled={data.role === "super_admin"}
            onClick={() => setOpenUpdate(true)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(data.role === "super_admin" && "cursor-not-allowed")}
            disabled={data.role === "super_admin"}
            onClick={() => setOpenDelete(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteUser data={data} openDelete={openDelete} setOpenDelete={setOpenDelete} />

      <UpdateModal data={data} open={openUpdate} onOpenChange={setOpenUpdate} />
    </>
  );
};

export default CellAction;
