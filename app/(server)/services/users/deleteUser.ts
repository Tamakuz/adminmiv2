import { Context } from "hono";
import db from "../../config/db"
import { users } from "../../schema/user.schema"
import { eq } from "drizzle-orm";

export const deleteUser = async (c: Context) => {
  try {
    const { id } = c.req.param()
    
    const user = await db.delete(users).where(eq(users.id, id));

    if (!user) {
      return c.json({
        status: 404,
        message: "User tidak ditemukan",
        data: [],
        error: true
      });
    }

    return c.json({
      status: 200,
      message: "Berhasil menghapus user",
      data: [],
      error: false
    });

  } catch (error: any) {
    return c.json({
      status: 500,
      message: error.message,
      data: [],
      error: true
    }, 500);
  }
}