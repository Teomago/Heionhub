import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "login_cover_image_id" uuid;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_login_cover_image_id_media_id_fk" FOREIGN KEY ("login_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_login_cover_image_idx" ON "site_settings" USING btree ("login_cover_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_login_cover_image_id_media_id_fk";
  
  DROP INDEX "site_settings_login_cover_image_idx";
  ALTER TABLE "site_settings" DROP COLUMN "login_cover_image_id";`)
}
