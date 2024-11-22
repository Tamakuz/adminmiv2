import { Context } from "hono";
import db from "@/app/(server)/config/db";
import { users } from "@/app/(server)/schema/user.schema";
import { eq } from "drizzle-orm";

export const postUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const email = body.email;

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      return c.json({
        status: 200,
        message: "User retrieved successfully",
        data: existingUser[0],
        error: null
      });
    }

    // Create new user if doesn't exist
    const newUser = await db.insert(users).values({ email }).returning();
    
    return c.json({
      status: 201,
      message: "User created successfully",
      data: newUser[0],
      error: null
    });

  } catch (error) {
    console.log(error);
    return c.json({
      status: 500,
      message: "Internal server error",
      data: null,
      error: "Failed to create user"
    }, 500);
  }
}