import { pgTable, uuid, varchar, decimal, text, date } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const mahasiswa = pgTable('mahasiswa', {
  id: uuid('id').defaultRandom().primaryKey(),
  nim: varchar('nim', { length: 255 }).notNull().unique(),
  nama: varchar('nama', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  kelamin: varchar('kelamin', { length: 1 }).notNull().$type<'L' | 'P'>(),
  angkatan: varchar('angkatan', { length: 4 }).notNull(),
  status: varchar('status', { length: 255 }).notNull().$type<'Aktif' | 'Cuti' | 'Lulus' | 'DO'>().default('Aktif'),
  pembimbing_id: uuid('pembimbing_id').references(() => users.id),
  nomor_hp: varchar('nomor_hp', { length: 255 }),
  alamat: text('alamat'),
  tanggal_lahir: date('tanggal_lahir'),
  tempat_lahir: varchar('tempat_lahir', { length: 255 }),
  agama: varchar('agama', { length: 255 }).$type<'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu'>(),
  ipk: decimal('ipk', { precision: 3, scale: 2 }),
  judul_ta: text('judul_ta'),
});

export type MahasiswaSchema = typeof mahasiswa.$inferSelect;
