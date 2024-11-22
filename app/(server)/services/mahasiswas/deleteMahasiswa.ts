import { Context } from "hono";
import db from "../../config/db";
import { mahasiswa } from "../../schema/mahasiswa.schema";
import { eq } from "drizzle-orm";

export const deleteMahasiswa = async (ctx: Context) => {
  try {
    const { id } = ctx.req.param();
    if (!id) {
      return ctx.json({
        error: true,
        message: "ID mahasiswa tidak ditemukan",
        data: null,
        status: 400,
      });
    }
    await db.delete(mahasiswa).where(eq(mahasiswa.id, id));
    return ctx.json({
      error: false,
      message: "Data mahasiswa berhasil dihapus",
      data: null,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return ctx.json({
      error: true,
      message: "Gagal menghapus data mahasiswa",
      data: null,
      status: 500,
    });
  }
};
