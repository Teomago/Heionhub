import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_members_preferred_locale" AS ENUM('en', 'es');
  CREATE TABLE "footer_navigation_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"navigation_title" varchar DEFAULT 'Navigation',
  	"contact_title" varchar DEFAULT 'Contact',
  	"legal_legal_name" varchar,
  	"legal_title" varchar DEFAULT 'Legal',
  	"legal_copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "header_nav_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_locales" (
  	"logo_text" varchar,
  	"cta_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "members" ADD COLUMN "preferred_locale" "enum_members_preferred_locale" DEFAULT 'en' NOT NULL;
  ALTER TABLE "footer_navigation_links_locales" ADD CONSTRAINT "footer_navigation_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_navigation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_links_locales" ADD CONSTRAINT "header_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "footer_navigation_links_locales_locale_parent_id_unique" ON "footer_navigation_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_links_locales_locale_parent_id_unique" ON "header_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "footer_navigation_links" DROP COLUMN "link_label";
  ALTER TABLE "footer_legal_links" DROP COLUMN "link_label";
  ALTER TABLE "footer" DROP COLUMN "navigation_title";
  ALTER TABLE "footer" DROP COLUMN "contact_title";
  ALTER TABLE "footer" DROP COLUMN "legal_legal_name";
  ALTER TABLE "footer" DROP COLUMN "legal_title";
  ALTER TABLE "footer" DROP COLUMN "legal_copyright";
  ALTER TABLE "header_nav_links" DROP COLUMN "link_label";
  ALTER TABLE "header" DROP COLUMN "logo_text";
  ALTER TABLE "header" DROP COLUMN "cta_link_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_navigation_links_locales" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "header_nav_links_locales" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  ALTER TABLE "footer_navigation_links" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "footer_legal_links" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "navigation_title" varchar DEFAULT 'Navigation';
  ALTER TABLE "footer" ADD COLUMN "contact_title" varchar DEFAULT 'Contact';
  ALTER TABLE "footer" ADD COLUMN "legal_legal_name" varchar;
  ALTER TABLE "footer" ADD COLUMN "legal_title" varchar DEFAULT 'Legal';
  ALTER TABLE "footer" ADD COLUMN "legal_copyright" varchar;
  ALTER TABLE "header_nav_links" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "header" ADD COLUMN "logo_text" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_link_label" varchar;
  ALTER TABLE "members" DROP COLUMN "preferred_locale";
  DROP TYPE "public"."enum_members_preferred_locale";`)
}
