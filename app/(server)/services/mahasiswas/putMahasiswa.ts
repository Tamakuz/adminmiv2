import { Context } from "hono";
import db from "../../config/db";
import { mahasiswa } from "../../schema/mahasiswa.schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Validation schema
const updateMahasiswaSchema = z.object({
  nim: z.string().min(1),
  nama: z.string().min(1),
  email: z.string().email(),
  kelamin: z.enum(['L', 'P']),
  angkatan: z.string().length(4),
  status: z.enum(['Aktif', 'Cuti', 'Lulus', 'DO']),
  pembimbing_id: z.string().uuid().optional().nullable(),
  nomor_hp: z.string().optional().nullable(),
  alamat: z.string().optional().nullable(),
  tanggal_lahir: z.string().optional().nullable(),
  tempat_lahir: z.string().optional().nullable(),
  agama: z.enum(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']).optional().nullable(),
  ipk: z.number().min(0).max(4).optional().nullable(),
  judul_ta: z.string().optional().nullable()
});

export const putMahasiswa = async (ctx: Context) => {
  try {
    const { id } = ctx.req.param();
    const body = await ctx.req.json();

    // Validate request body
    const validationResult = updateMahasiswaSchema.safeParse(body);
    if (!validationResult.success) {
      return ctx.json({
        status: 400,
        message: "Validasi data gagal",
        errors: validationResult.error.errors,
        error: true
      }, 400);
    }

    const validatedData = validationResult.data;

    // Check if mahasiswa exists
    const existingMahasiswa = await db.select().from(mahasiswa).where(eq(mahasiswa.id, id)).limit(1);
    if (!existingMahasiswa.length) {
      return ctx.json({
        status: 404,
        message: "Mahasiswa tidak ditemukan",
        error: true
      }, 404);
    }

    // Update mahasiswa
    await db.update(mahasiswa)
      .set({
        ...validatedData,
        ipk: validatedData.ipk?.toString()
      })
      .where(eq(mahasiswa.id, id));

    return ctx.json({
      status: 200,
      message: "Data mahasiswa berhasil diupdate",
      error: false
    });

  } catch (error) {
    console.error("Error updating mahasiswa:", error);
    return ctx.json({
      status: 500,
      message: "Terjadi kesalahan saat memperbarui data mahasiswa",
      error: true
    }, 500);
  }
};
