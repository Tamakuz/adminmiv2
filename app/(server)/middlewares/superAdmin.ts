import { createMiddleware } from 'hono/factory'
import { verifyToken } from "../utils/jwt"

export const superAdmin = createMiddleware(async (c, next) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1]

    if (!token) {
      return c.json({
        status: 401,
        message: "Token tidak ditemukan",
        data: [],
        error: true
      }, 401)
    }

    try {
      const payload = await verifyToken(token)

      if (payload.role !== "super_admin") {
        return c.json({
          status: 403,
          message: "Akses ditolak",
          data: [],
          error: true
        }, 403)
      }

      return next()
    } catch {
      return c.json({
        status: 401,
        message: `Token tidak valid: ${token}`,
        data: [],
        error: true
      }, 401)
    }

  } catch (error: any) {
    return c.json({
      status: 500,
      message: error instanceof Error ? "Terjadi kesalahan: " + error.message : "Terjadi kesalahan pada server",
      data: [],
      error: true
    }, 500)
  }
})