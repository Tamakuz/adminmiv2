"use client";
import useMahasiswaStore from "@/app/(client)/context/useMahasiswaStore";
import { getMahasiswaById } from "@/app/(client)/services/mahasiswa";
import { Mahasiswa } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";

interface MahasiswaDetailViewProps {
  id: string;
}

interface MahasiswaResponse extends Response {
  data: Mahasiswa;
}

const Detail = ({ id }: MahasiswaDetailViewProps) => {
  const { mahasiswa } = useMahasiswaStore((state) => state);
  const { data, isLoading } = useQuery<MahasiswaResponse, Error>({
    queryKey: ["mahasiswaById", id],
    queryFn: async () => await getMahasiswaById(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    enabled: !mahasiswa,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-sm">
            Memuat data mahasiswa...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Data Pribadi */}
      <div className="space-y-4 p-6 bg-card rounded-lg border shadow-sm">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <h3 className="text-lg font-medium">Data Pribadi</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              NIM
            </div>
            <p className="text-sm font-medium">{mahasiswa?.nim || data?.data.nim}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Nama
            </div>
            <p className="text-sm font-medium">{mahasiswa?.nama || data?.data.nama}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              Email
            </div>
            <p className="text-sm font-medium">{mahasiswa?.email || data?.data.email}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Jenis Kelamin
            </div>
            <p className="text-sm font-medium">
              {mahasiswa?.kelamin === 'L' || data?.data.kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
            </p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Nomor HP
            </div>
            <p className="text-sm font-medium">{mahasiswa?.nomor_hp || data?.data.nomor_hp || '-'}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Alamat
            </div>
            <p className="text-sm font-medium">{mahasiswa?.alamat || data?.data.alamat || '-'}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Tempat Lahir
            </div>
            <p className="text-sm font-medium">{mahasiswa?.tempat_lahir || data?.data.tempat_lahir || '-'}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Tanggal Lahir
            </div>
            <p className="text-sm font-medium">{mahasiswa?.tanggal_lahir || data?.data.tanggal_lahir || '-'}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
              Agama
            </div>
            <p className="text-sm font-medium">{mahasiswa?.agama || data?.data.agama || '-'}</p>
          </div>
        </div>
      </div>

      {/* Data Akademik */}
      <div className="space-y-4 p-6 bg-card rounded-lg border shadow-sm">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
          <h3 className="text-lg font-medium">Data Akademik</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Angkatan
            </div>
            <p className="text-sm font-medium">{mahasiswa?.angkatan || data?.data.angkatan}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 6v6l4 2"></path></svg>
              Status
            </div>
            <p className="text-sm font-medium">{mahasiswa?.status || data?.data.status}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              IPK
            </div>
            <p className="text-sm font-medium">{mahasiswa?.ipk || data?.data.ipk || '-'}</p>
          </div>
          <div className="p-4 space-y-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Judul Tugas Akhir
            </div>
            <p className="text-sm font-medium">{mahasiswa?.judul_ta || data?.data.judul_ta || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
