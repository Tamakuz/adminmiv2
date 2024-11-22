import { Context } from "hono";
import db from "../../config/db";
import { users } from "../../schema/user.schema";

export const getUser = async (c: Context) => {
  try {
    const user = await db.select().from(users);

    if (!user || user.length === 0) {
      return c.json({
        status: 404,
        message: "User tidak ditemukan",
        data: [],
        error: true
      });
    }

    return c.json({
      status: 200,
      message: "Berhasil mendapatkan data user",
      data: user,
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
};