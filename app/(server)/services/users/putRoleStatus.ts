import { Context } from "hono";
import db from "../../config/db";
import { users } from "../../schema/user.schema";
import { eq } from "drizzle-orm";

export const putRoleStatus = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const { role, status } = await c.req.json();

    // Validasi role dan status
    if (!["admin", "super_admin"].includes(role)) {
      return c.json({
        status: 400,
        message: "Nilai role tidak valid",
        data: null,
        error: "Nilai role tidak valid"
      }, 400);
    }

    if (!["aktif", "nonaktif"].includes(status)) {
      return c.json({
        status: 400,
        message: "Nilai status tidak valid", 
        data: null,
        error: "Nilai status tidak valid"
      }, 400);
    }

    // Perbarui role dan status pengguna
    const updatedUser = await db
      .update(users)
      .set({
        role,
        status,
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser.length) {
      return c.json({
        status: 404,
        message: "Pengguna tidak ditemukan",
        data: null,
        error: true
      }, 404);
    }

    return c.json({
      status: 200,
      message: "Role dan status pengguna berhasil diperbarui",
      data: updatedUser[0],
      error: false
    });

  } catch (error) {
    return c.json({
      status: 500,
      message: error instanceof Error ? "Terjadi kesalahan: " + error.message : "Terjadi kesalahan pada server",
      data: null,
      error: true
    }, 500);
  }
};
