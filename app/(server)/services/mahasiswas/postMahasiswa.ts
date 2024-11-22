import { Context } from "hono";
import db from "../../config/db";
import { mahasiswa } from "../../schema/mahasiswa.schema";
import { eq } from "drizzle-orm";

export const postMahasiswa = async (ctx: Context) => {
  try {
    const body = await ctx.req.json();

    // Validate required fields
    if (!body.nim || !body.nama || !body.email || !body.kelamin || !body.angkatan || !body.status || !body.nomor_hp) {
      return ctx.json({
        status: 400,
        message: "Data yang dikirim tidak lengkap",
        data: [],
        error: true
      }, 400);
    }

    // Check if NIM already exists
    const existingNIM = await db.select().from(mahasiswa).where(eq(mahasiswa.nim, body.nim));
    if (existingNIM.length > 0) {
      return ctx.json({
        status: 400,
        message: "NIM sudah terdaftar",
        data: [],
        error: true
      }, 400);
    }

    // Check if email already exists
    const existingEmail = await db.select().from(mahasiswa).where(eq(mahasiswa.email, body.email));
    if (existingEmail.length > 0) {
      return ctx.json({
        status: 400,
        message: "Email sudah terdaftar",
        data: [],
        error: true
      }, 400);
    }

    const newMahasiswa = {
      nim: body.nim,
      nama: body.nama,
      email: body.email,
      kelamin: body.kelamin as 'L' | 'P',
      angkatan: body.angkatan,
      status: body.status as 'Aktif' | 'Cuti' | 'Lulus' | 'DO',
      pembimbing_id: body.pembimbing_id || undefined,
      nomor_hp: body.nomor_hp,
      alamat: body.alamat || undefined,
      tanggal_lahir: body.tanggal_lahir ? body.tanggal_lahir : undefined,
      tempat_lahir: body.tempat_lahir || undefined,
      agama: body.agama as 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu' | undefined,
      ipk: body.ipk || undefined
    };

    const result = await db.insert(mahasiswa).values(newMahasiswa).returning();

    return ctx.json({
      status: 201,
      message: "Data mahasiswa berhasil ditambahkan",
      data: result[0],
      error: false
    }, 201);

  } catch (error) {
    console.error(error);
    return ctx.json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      data: [],
      error: true
    }, 500);
  }
}
