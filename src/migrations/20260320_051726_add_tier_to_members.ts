import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_members_tier" AS ENUM('free', 'premium');
  ALTER TABLE "members" ADD COLUMN "tier" "enum_members_tier" DEFAULT 'free';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "members" DROP COLUMN "tier";
  DROP TYPE "public"."enum_members_tier";`)
}
