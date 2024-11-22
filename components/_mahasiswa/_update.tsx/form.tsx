"use client";

import { getMahasiswaById, updateMahasiswa } from "@/app/(client)/services/mahasiswa";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Mahasiswa, Response } from "@/constants/data";
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
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import useMahasiswaUpdateStore from "@/app/(client)/context/useMahasiswaUpdateStore";

interface FormProps {
  id: string;
}

interface MahasiswaResponse extends Response {
  data: Mahasiswa;
}

const schema = z.object({
  id: z.string().uuid(),
  nim: z.string().min(1, { message: "NIM harus diisi" }),
  nama: z.string().min(1, { message: "Nama harus diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
  kelamin: z.enum(["L", "P"], { required_error: "Jenis kelamin harus diisi" }),
  angkatan: z.string().min(1, { message: "Angkatan harus diisi" }),
  status: z.enum(["Aktif", "Cuti", "Lulus", "DO"], { required_error: "Status harus diisi" }),
  pembimbing_id: z.string().nullable(),
  nomor_hp: z.string().nullable(),
  alamat: z.string().nullable(),
  tanggal_lahir: z.string().nullable(),
  tempat_lahir: z.string().nullable(),
  agama: z.enum(["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"], { required_error: "Agama harus diisi" }).nullable(),
  ipk: z.string().nullable(),
  judul_ta: z.string().nullable()
});

const Form = ({ id }: FormProps) => {
  const { mahasiswa, setMahasiswa } = useMahasiswaUpdateStore((state) => state);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomor_hp: "",
      alamat: "",
      tanggal_lahir: "",
      tempat_lahir: "",
      agama: null,
      ipk: "",
      judul_ta: ""
    }
  });

  const { data, isLoading } = useQuery<MahasiswaResponse, Error>({
    queryKey: ["mahasiswaById", id],
    queryFn: async () => await getMahasiswaById(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    enabled: !mahasiswa
  });

  useEffect(() => {
    if (mahasiswa) {
      form.reset({
        ...mahasiswa,
        kelamin: mahasiswa.kelamin || undefined,
        status: mahasiswa.status || undefined,
        agama: mahasiswa.agama || undefined
      });
    } else if (data?.data) {
      form.reset({
        ...data.data,
        kelamin: data.data.kelamin || undefined,
        status: data.data.status || undefined,
        agama: data.data.agama || undefined
      });
    }
  }, [data, form, mahasiswa]);

  const { mutate: updateMhs, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      return await updateMahasiswa(values as Mahasiswa);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success("Data mahasiswa berhasil diupdate");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Data mahasiswa gagal diupdate");
    }
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    // updateMhs(values);
    console.log(values);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-sm">Memuat data mahasiswa...</p>
        </div>
      </div>
    );
  }

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Data Pribadi */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIM</FormLabel>
                  <Input
                    placeholder="Masukkan NIM"
                    {...field}
                    disabled={isPending}
                  />
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
                  <Input
                    placeholder="Masukkan nama lengkap"
                    {...field}
                    disabled={isPending}
                  />
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
                        <SelectValue placeholder={field.value || "Pilih jenis kelamin"} />
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
          </div>
        </div>

        {/* Data Akademik */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Akademik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="angkatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Angkatan</FormLabel>
                  <Input
                    placeholder="Masukkan tahun angkatan"
                    {...field}
                    disabled={isPending}
                  />
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
                        <SelectValue placeholder={field.value || "Pilih status"} />
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
              name="ipk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IPK</FormLabel>
                  <Input
                    placeholder="Masukkan IPK"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                  <FormMessage className="text-xs font-medium text-destructive mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="judul_ta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Tugas Akhir</FormLabel>
                  <Input
                    placeholder="Masukkan judul tugas akhir"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                  <FormMessage className="text-xs font-medium text-destructive mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Data Kontak */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Kontak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nomor_hp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor HP</FormLabel>
                  <Input
                    placeholder="Masukkan nomor HP"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
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
                  <Input
                    placeholder="Masukkan alamat"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                  <FormMessage className="text-xs font-medium text-destructive mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Data Lainnya */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Input 
                    type="date" 
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending} 
                  />
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
                  <Input
                    placeholder="Masukkan tempat lahir"
                    {...field}
                    value={field.value ?? ""}
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
                    defaultValue={field.value ?? undefined}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value || "Pilih agama"} />
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
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </FormUI>
  );
};

export default Form;
