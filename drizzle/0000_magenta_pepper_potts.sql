DO $$ BEGIN
 CREATE TYPE "user_system_enum" AS ENUM('system', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserApiKey" (
	"user_id" integer NOT NULL,
	"openai-key" text,
	"discord-bot-key" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"pdfName" text NOT NULL,
	"pdfUrl" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" varchar(256) NOT NULL,
	"fileKey" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" integer NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"role" "user_system_enum" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserApiKey" ADD CONSTRAINT "UserApiKey_user_id_chats_id_fk" FOREIGN KEY ("user_id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
	ALTER TABLE UserApiKey ENABLE ROW LEVEL SECURITY;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


