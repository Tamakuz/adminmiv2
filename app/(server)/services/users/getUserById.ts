import { Context } from "hono";
import db from "../../config/db";
import { users } from "../../schema/user.schema";
import { eq } from "drizzle-orm";

export const getUserById = async (c: Context) => {
  try {
    const id = c.req.param('id');

    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!user || user.length === 0) {
      return c.json({
        status: 404,
        message: "User tidak ditemukan",
        data: [],
        error: true
      }, 404);
    }

    return c.json({
      status: 200,
      message: "Berhasil mendapatkan data user",
      data: user[0],
      error: false
    });

  } catch (error) {
    return c.json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      data: [],
      error: true
    }, 500);
  }
}