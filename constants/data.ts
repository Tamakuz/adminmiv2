import { Icons } from "@/constants/icons";
import { UserSchema } from "@/app/(server)/schema/user.schema";
import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import { MahasiswaSchema } from "@/app/(server)/schema/mahasiswa.schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      authorization: string | null
      role: string | null
      status: string | null
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser {
    role: string | null
    status: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string | null
    status: string | null
  }
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Dosen',
    url: '/dosen',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Mahasiswa',
    url: '/mahasiswa',
    icon: 'users',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Pengguna',
    url: '/pengguna',
    icon: 'userCog',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Dokumentasi',
    url: '/dokumentasi',
    icon: 'file',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'File Manager',
    url: '/files',
    icon: 'folder',
    isActive: false,
    items: [] // No child items
  }
];

export interface Dosen {
  id: string;
  nama: string;
  nip: string;
  email: string;
  kelamin: 'L' | 'P';
}
export interface Mahasiswa extends MahasiswaSchema {}

export interface Dokumentasi {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
  url_gambar: string;
}

export interface Response {
  status: number;
  message: string;
  data: any;
  error: boolean;
}

export interface Pengguna extends UserSchema {}


export const penggunaData: Pengguna[] = [
  {
    id: "1",
    nama: "Admin Utama",
    username: "superadmin",
    email: "superadmin@univ.ac.id", 
    role: "super_admin",
    status: "aktif",
    foto: "https://picsum.photos/200"
  },
  {
    id: "2",
    nama: "Budi Santoso",
    username: "budisantoso",
    email: "budi.santoso@univ.ac.id",
    role: "admin",
    status: "aktif",
    foto: "https://picsum.photos/200"
  },
  {
    id: "3", 
    nama: "Dewi Lestari",
    username: "dewilestari",
    email: "dewi.lestari@univ.ac.id",
    role: "admin",
    status: "aktif",
    foto: "https://picsum.photos/200"
  },
  {
    id: "4",
    nama: "Eko Prasetyo",
    username: "ekoprasetyo", 
    email: "eko.prasetyo@univ.ac.id",
    role: "admin",
    status: "nonaktif",
    foto: "https://picsum.photos/200"
  },
  {
    id: "5",
    nama: "Fitri Handayani",
    username: "fitrihandayani",
    email: "fitri.handayani@univ.ac.id",
    role: "admin",
    status: "aktif",
    foto: "https://picsum.photos/200"
  }
];

export const dokumentasiData: Dokumentasi[] = [
  {
    id: "1",
    judul: "Seminar Nasional Teknologi Informasi 2023",
    deskripsi: "Dokumentasi acara Seminar Nasional Teknologi Informasi yang diselenggarakan di Aula Utama Universitas.",
    tanggal: "2023-05-15",
    url_gambar: "https://picsum.photos/1170/780",
  },
  {
    id: "2", 
    judul: "Wisuda Angkatan 2023",
    deskripsi: "Foto bersama lulusan Fakultas Teknologi Informasi angkatan 2023.",
    tanggal: "2023-09-30",
    url_gambar: "https://picsum.photos/1380/920",
  },
  {
    id: "3",
    judul: "Workshop Artificial Intelligence",
    deskripsi: "Kegiatan workshop AI yang diikuti oleh mahasiswa dan dosen Fakultas Teknologi Informasi.",
    tanggal: "2023-07-22", 
    url_gambar: "https://picsum.photos/1170/780",
  },
  {
    id: "4",
    judul: "Kompetisi Coding Antar Universitas",
    deskripsi: "Tim mahasiswa Fakultas TI meraih juara pertama dalam kompetisi coding tingkat nasional.",
    tanggal: "2023-08-05",
    url_gambar: "https://picsum.photos/1650/1100",
  },
  {
    id: "5",
    judul: "Kunjungan Industri ke Silicon Valley",
    deskripsi: "Mahasiswa tingkat akhir mengunjungi beberapa perusahaan teknologi terkemuka di Silicon Valley.",
    tanggal: "2023-06-10",
    url_gambar: "https://picsum.photos/2070/1380",
  },
  {
    id: "6",
    judul: "Peluncuran Lab IoT Terbaru",
    deskripsi: "Peresmian laboratorium Internet of Things yang dilengkapi dengan peralatan canggih.",
    tanggal: "2023-04-18",
    url_gambar: "https://picsum.photos/1740/1160",
  },
  {
    id: "7",
    judul: "Seminar Keamanan Siber",
    deskripsi: "Pakar keamanan siber internasional memberikan wawasan tentang tren terbaru dalam cybersecurity.",
    tanggal: "2023-03-25",
    url_gambar: "https://picsum.photos/1920/1280",
  },
  {
    id: "8",
    judul: "Hackathon 48 Jam",
    deskripsi: "Mahasiswa berpartisipasi dalam hackathon intensif selama 48 jam untuk mengembangkan solusi inovatif.",
    tanggal: "2023-10-01",
    url_gambar: "https://picsum.photos/1800/1200",
  },
  {
    id: "9",
    judul: "Pameran Proyek Akhir Mahasiswa",
    deskripsi: "Showcase proyek-proyek inovatif yang dikembangkan oleh mahasiswa tingkat akhir.",
    tanggal: "2023-11-15",
    url_gambar: "https://picsum.photos/2000/1333",
  },
  {
    id: "10",
    judul: "Workshop Data Science",
    deskripsi: "Pelatihan intensif tentang analisis data dan machine learning untuk mahasiswa dan profesional.",
    tanggal: "2023-02-28",
    url_gambar: "https://picsum.photos/1700/1133",
  },
  {
    id: "11",
    judul: "Konferensi Blockchain Nasional",
    deskripsi: "Fakultas TI menjadi tuan rumah konferensi blockchain yang dihadiri oleh pakar dari seluruh negeri.",
    tanggal: "2023-09-05",
    url_gambar: "https://picsum.photos/1920/1280",
  },
  {
    id: "12",
    judul: "Perayaan Hari Programmer",
    deskripsi: "Acara perayaan Hari Programmer dengan berbagai kompetisi dan seminar.",
    tanggal: "2023-09-13",
    url_gambar: "https://picsum.photos/1690/1127",
  },
  {
    id: "13",
    judul: "Peluncuran Program Studi Baru: Kecerdasan Buatan",
    deskripsi: "Fakultas TI meresmikan program studi baru fokus pada Kecerdasan Buatan dan Robotika.",
    tanggal: "2023-08-20",
    url_gambar: "https://picsum.photos/1900/1267",
  },
  {
    id: "14",
    judul: "Kolaborasi Riset dengan MIT",
    deskripsi: "Tim peneliti Fakultas TI memulai kolaborasi riset jangka panjang dengan MIT dalam bidang quantum computing.",
    tanggal: "2023-07-01",
    url_gambar: "https://picsum.photos/1820/1213",
  },
  {
    id: "15",
    judul: "Penandatanganan MoU dengan Google",
    deskripsi: "Fakultas TI menandatangani kesepakatan kerjasama dengan Google untuk program magang dan riset.",
    tanggal: "2023-05-30",
    url_gambar: "https://picsum.photos/1770/1180",
  },
  {
    id: "16",
    judul: "Kompetisi Robotika Antar SMA",
    deskripsi: "Fakultas TI menyelenggarakan kompetisi robotika untuk siswa SMA se-provinsi.",
    tanggal: "2023-04-08",
    url_gambar: "https://picsum.photos/1700/1133",
  },
  {
    id: "17",
    judul: "Seminar Teknologi 5G",
    deskripsi: "Pakar telekomunikasi memberikan wawasan tentang implementasi dan potensi teknologi 5G.",
    tanggal: "2023-03-12",
    url_gambar: "https://picsum.photos/1850/1233",
  },
  {
    id: "18",
    judul: "Peluncuran Inkubator Startup TI",
    deskripsi: "Fakultas TI meluncurkan program inkubator untuk mendukung startup teknologi mahasiswa.",
    tanggal: "2023-02-15",
    url_gambar: "https://picsum.photos/1700/1133",
  },
  {
    id: "19",
    judul: "Webinar Keamanan IoT",
    deskripsi: "Diskusi online tentang tantangan dan solusi keamanan dalam ekosistem Internet of Things.",
    tanggal: "2023-01-20",
    url_gambar: "https://picsum.photos/1920/1280",
  }
];


export const dosenData: Dosen[] = [
  {
    id: "1",
    nama: "Dr. Budi Santoso, M.Kom.",
    nip: "198505152010121002", 
    email: "budi.santoso@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "2", 
    nama: "Dr. Siti Aminah, M.T.",
    nip: "197708232005012001",
    email: "siti.aminah@univ.ac.id", 
    kelamin: "P"
  },
  {
    id: "3",
    nama: "Prof. Ahmad Wijaya, Ph.D.",
    nip: "196902101995121001",
    email: "ahmad.wijaya@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "4",
    nama: "Dr. Rina Wulandari, M.Sc.",
    nip: "198304252008012003",
    email: "rina.wulandari@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "5",
    nama: "Dr. Hendra Kusuma, M.T.",
    nip: "197506142000031001",
    email: "hendra.kusuma@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "6",
    nama: "Dr. Maya Putri, M.Si.",
    nip: "198603212009042001",
    email: "maya.putri@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "7",
    nama: "Prof. Bambang Sutejo, Ph.D.",
    nip: "196704151992031002",
    email: "bambang.sutejo@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "8",
    nama: "Dr. Dewi Safitri, M.Kom.",
    nip: "198807092012012003",
    email: "dewi.safitri@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "9",
    nama: "Dr. Rudi Hartanto, M.T.",
    nip: "197309212001121001",
    email: "rudi.hartanto@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "10",
    nama: "Dr. Sri Wahyuni, M.Sc.",
    nip: "198502142010012002",
    email: "sri.wahyuni@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "11",
    nama: "Prof. Agus Setiawan, Ph.D.",
    nip: "196808121993031003",
    email: "agus.setiawan@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "12",
    nama: "Dr. Ratna Sari, M.T.",
    nip: "198709232013042001",
    email: "ratna.sari@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "13",
    nama: "Dr. Eko Prasetyo, M.Kom.",
    nip: "197404052000031002",
    email: "eko.prasetyo@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "14",
    nama: "Dr. Nina Wati, M.Si.",
    nip: "198601232011012001",
    email: "nina.wati@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "15",
    nama: "Prof. Dedi Kurniawan, Ph.D.",
    nip: "196605171991031001",
    email: "dedi.kurniawan@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "16",
    nama: "Dr. Lina Marlina, M.T.",
    nip: "198808082014042002",
    email: "lina.marlina@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "17",
    nama: "Dr. Joko Susilo, M.Kom.",
    nip: "197207122002121001",
    email: "joko.susilo@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "18",
    nama: "Dr. Yuni Astuti, M.Sc.",
    nip: "198703142012012001",
    email: "yuni.astuti@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "19",
    nama: "Prof. Tono Wijaya, Ph.D.",
    nip: "196709181992031002",
    email: "tono.wijaya@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "20",
    nama: "Dr. Lia Permata, M.T.",
    nip: "198905252015042001",
    email: "lia.permata@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "21",
    nama: "Dr. Adi Nugroho, M.Kom.",
    nip: "197508232003121001",
    email: "adi.nugroho@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "22",
    nama: "Dr. Sari Indah, M.Si.",
    nip: "198602142011012002",
    email: "sari.indah@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "23",
    nama: "Prof. Wahyu Hidayat, Ph.D.",
    nip: "196603151990031001",
    email: "wahyu.hidayat@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "24",
    nama: "Dr. Rini Susanti, M.T.",
    nip: "198806062014042001",
    email: "rini.susanti@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "25",
    nama: "Dr. Dani Gunawan, M.Kom.",
    nip: "197305062001121002",
    email: "dani.gunawan@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "26",
    nama: "Dr. Tuti Handayani, M.Sc.",
    nip: "198704232012012002",
    email: "tuti.handayani@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "27",
    nama: "Prof. Hadi Santoso, Ph.D.",
    nip: "196608191991031001",
    email: "hadi.santoso@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "28",
    nama: "Dr. Eva Yulianti, M.T.",
    nip: "198904142015042002",
    email: "eva.yulianti@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "29",
    nama: "Dr. Irwan Prasetyo, M.Kom.",
    nip: "197406072002121001",
    email: "irwan.prasetyo@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "30",
    nama: "Dr. Dina Marliana, M.Si.",
    nip: "198605252011012001",
    email: "dina.marliana@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "31",
    nama: "Prof. Surya Atmaja, Ph.D.",
    nip: "196607171990031002",
    email: "surya.atmaja@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "32",
    nama: "Dr. Nita Pratiwi, M.T.",
    nip: "198807072014042001",
    email: "nita.pratiwi@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "33",
    nama: "Dr. Fajar Ramadhan, M.Kom.",
    nip: "197307082001121001",
    email: "fajar.ramadhan@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "34",
    nama: "Dr. Winda Sari, M.Sc.",
    nip: "198705212012012001",
    email: "winda.sari@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "35",
    nama: "Prof. Iman Sudrajat, Ph.D.",
    nip: "196606161991031001",
    email: "iman.sudrajat@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "36",
    nama: "Dr. Rita Novita, M.T.",
    nip: "198903032015042001",
    email: "rita.novita@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "37",
    nama: "Dr. Yusuf Ibrahim, M.Kom.",
    nip: "197408092002121002",
    email: "yusuf.ibrahim@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "38",
    nama: "Dr. Ani Kusumaningsih, M.Si.",
    nip: "198604242011012002",
    email: "ani.kusumaningsih@univ.ac.id",
    kelamin: "P"
  },
  {
    id: "39",
    nama: "Prof. Rahmat Hidayat, Ph.D.",
    nip: "196605151990031001",
    email: "rahmat.hidayat@univ.ac.id",
    kelamin: "L"
  },
  {
    id: "40",
    nama: "Dr. Siska Dewi, M.T.",
    nip: "198808082014042001",
    email: "siska.dewi@univ.ac.id",
    kelamin: "P"
  }
];