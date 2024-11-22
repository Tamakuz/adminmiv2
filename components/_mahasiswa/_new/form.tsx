"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form as FormUI,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mahasiswa } from "@/constants/data";
import { postMahasiswa } from "@/app/(client)/services/mahasiswa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const schema = z.object({
  nim: z.string().min(1, { message: "NIM harus diisi" }),
  nama: z.string().min(1, { message: "Nama harus diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
  kelamin: z.enum(["L", "P"]),
  angkatan: z.string().min(1, { message: "Angkatan harus diisi" }),
  status: z.enum(["Aktif", "Cuti", "Lulus", "DO"]),
  nomor_hp: z.string().min(1, { message: "Nomor HP harus diisi" }),
  alamat: z.string().nullable(),
  tanggal_lahir: z.string().nullable(),
  tempat_lahir: z.string().nullable(),
  agama: z.enum(["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]).nullable(),
});

const Form = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nim: "",
      nama: "",
      email: "",
      kelamin: "L",
      angkatan: "",
      status: "Aktif",
      nomor_hp: "",
      alamat: null,
      tanggal_lahir: null,
      tempat_lahir: null,
      agama: null
    },
  });

  const { mutate: createMahasiswa, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      return await postMahasiswa(values as Mahasiswa);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success("Data mahasiswa berhasil disimpan");
      form.reset();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Data mahasiswa gagal disimpan");
    }
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    // console.log(values);
    createMahasiswa(values);
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="nim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIM</FormLabel>
                <Input placeholder="Masukkan NIM" {...field} disabled={isPending} />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input placeholder="Masukkan nama lengkap" {...field} disabled={isPending} />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Mahasiswa</FormLabel>
                <Input
                  type="email"
                  placeholder="Masukkan email Mahasiswa"
                  {...field}
                  disabled={isPending}
                />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomor_hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor HP</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan nomor HP"
                  {...field}
                  disabled={isPending}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kelamin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="angkatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Angkatan</FormLabel>
                <Input placeholder="Masukkan tahun angkatan" {...field} disabled={isPending} />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Cuti">Cuti</SelectItem>
                    <SelectItem value="Lulus">Lulus</SelectItem>
                    <SelectItem value="DO">DO</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tempat_lahir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat Lahir</FormLabel>
                <Input placeholder="Masukkan tempat lahir" {...field} value={field.value || ''} disabled={isPending} />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal_lahir" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <Input 
                  type="date" 
                  {...field}
                  value={field.value || ''} 
                  disabled={isPending}
                />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agama</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <Input placeholder="Masukkan alamat" {...field} value={field.value || ''} disabled={isPending} />
                <FormMessage className="text-xs font-medium text-destructive mt-1" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </FormUI>
  );
};

export default Form;
