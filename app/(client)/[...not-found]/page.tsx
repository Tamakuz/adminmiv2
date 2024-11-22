import NotFoundComponent from "@/components/404";

export default function NotFound() {
  return (
    <NotFoundComponent
      message="Halaman tidak ditemukan"
      title="404"
      description="Maaf, halaman yang anda cari tidak ditemukan"
      buttonText="Kembali ke halaman utama"
      href="/"
    />
  );
}
