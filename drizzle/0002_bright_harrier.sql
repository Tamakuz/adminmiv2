CREATE TABLE IF NOT EXISTS "mahasiswa" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nim" varchar(255) NOT NULL,
	"nama" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"kelamin" varchar(1) NOT NULL,
	"angkatan" varchar(4) NOT NULL,
	"status" varchar(255) DEFAULT 'Aktif' NOT NULL,
	"pembimbing_id" uuid,
	"nomor_hp" varchar(255),
	"alamat" text,
	"tanggal_lahir" date,
	"tempat_lahir" varchar(255),
	"agama" varchar(255),
	"ipk" numeric(3, 2),
	CONSTRAINT "mahasiswa_nim_unique" UNIQUE("nim"),
	CONSTRAINT "mahasiswa_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_pembimbing_id_users_id_fk" FOREIGN KEY ("pembimbing_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
