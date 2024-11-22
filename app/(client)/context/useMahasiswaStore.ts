import { Mahasiswa } from '@/constants/data';
import { create } from 'zustand';

interface MahasiswaUpdateStore {
  mahasiswa: Mahasiswa | null;
  setMahasiswa: (data: Mahasiswa | null) => void;
}

const useMahasiswaUpdateStore = create<MahasiswaUpdateStore>((set) => ({
  mahasiswa: null,
  setMahasiswa: (data: Mahasiswa | null) => set({ mahasiswa: data }),
}));

export default useMahasiswaUpdateStore;