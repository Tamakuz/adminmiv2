import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  nama: varchar('nama', { length: 255 }),
  username: varchar('username', { length: 255 }).unique(),
  role: varchar('role', { length: 255 }).notNull().$type<'super_admin' | 'admin'>().default('admin'),
  status: varchar('status', { length: 255 }).notNull().$type<'aktif' | 'nonaktif'>().default('nonaktif'),
  foto: varchar('foto', { length: 255 }),
});

export type UserSchema = typeof users.$inferSelect;
