import { Context } from "hono";
import db from "../../config/db"
import { mahasiswa } from "../../schema/mahasiswa.schema";
import { eq } from "drizzle-orm";

export const getMahasiswaById = async (ctx: Context) => {
  try {
    const { id } = ctx.req.param();

    const mahasiswaResult = await db.select().from(mahasiswa).where(eq(mahasiswa.id, id));
    
    if(mahasiswaResult.length === 0) {
      return ctx.json({
        status: 404,
        message: "Data not found",
        data: [],
        error: true
      }, 404);
    }

    return ctx.json({
      status: 200,
      message: "Success",
      data: mahasiswaResult[0],
      error: false
    }, 200);
  } catch (error) {
    console.log(error);
    return ctx.json({
      status: 500,
      message: "Internal Server Error",
      data: [],
      error: true
    }, 500);
  }
}

