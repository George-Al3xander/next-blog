ALTER TABLE "users" RENAME COLUMN "username" TO "kindeId";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "authorId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "kindeId" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_kindeId_unique" UNIQUE("kindeId");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");