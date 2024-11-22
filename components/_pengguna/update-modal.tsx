"use client";
import { Pengguna, Response } from "@/constants/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { putRoleStatus } from "@/app/(client)/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  role: z.enum(["admin", "super_admin"]),
  status: z.enum(["aktif", "nonaktif"]),
});

interface UpdateModalProps {
  data: Pengguna;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateModal = ({ data, open, onOpenChange }: UpdateModalProps) => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: data.role ?? "",
      status: data.status ?? "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: updateRoleStatus, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await putRoleStatus(data.id, values.role, values.status, session?.user.authorization!);
    },
    onSuccess: (data: Response) => {
      if (data.error) {
        toast.error(data.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      onOpenChange(false);
      toast.success("Perubahan berhasil disimpan");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Perubahan gagal disimpan");
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateRoleStatus(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Status Pengguna
          </DialogTitle>
          <DialogDescription>
            Perbarui role dan status akun pengguna
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={data.role === "super_admin" || isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={data.role === "super_admin" || isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="nonaktif">Non-Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
