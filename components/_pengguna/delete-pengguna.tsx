import { Pengguna, Response } from '@/constants/data';
import { Button } from '../ui/button';
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/app/(client)/services/user';
import { toast } from 'react-hot-toast';

interface DeleteUserProps {
  data: Pengguna;
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
}

const DeleteUser = ({ data, openDelete, setOpenDelete }: DeleteUserProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { mutate: onDeleteUser, isPending } = useMutation({
    mutationFn: async () => {
      return await deleteUser(data.id, session?.user.authorization!);
    },
    onSuccess: (data: Response) => {
      if (data.error) {
        toast.error(data.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpenDelete(false);
      toast.success("Akun pengguna berhasil dihapus");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Akun pengguna gagal dihapus");
    }
  })

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah Anda yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Akun pengguna akan dihapus secara permanen
            dari sistem.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenDelete(false)}>
            Batal
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={() => {
              onDeleteUser();
            }}
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUser