ALTER TABLE "users" ADD COLUMN "nama" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(255) DEFAULT 'admin' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" varchar(255) DEFAULT 'nonaktif' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "foto" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");