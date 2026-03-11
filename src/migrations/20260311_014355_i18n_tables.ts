import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__articles_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_pages_blocks_spacer_nested_2_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_nested_2_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum_pages_blocks_spacer_nested_3_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_nested_3_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_nested_2_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_nested_2_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_nested_3_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_nested_3_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_site_settings_supported_languages" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_site_settings_default_language" AS ENUM('en', 'es');
  CREATE TABLE "articles_locales" (
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_articles_v_locales" (
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spacer_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_blocks_spacer_nested_2_height" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_2_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_2_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"field_type" "enum_pages_blocks_contact_form_nested_2_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_blocks_spacer_nested_3_height" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_3_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_3_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"field_type" "enum_pages_blocks_contact_form_nested_3_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_locales" (
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"pathname" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"height" "enum__pages_v_blocks_spacer_nested_2_height" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_2_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_2_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"field_type" "enum__pages_v_blocks_contact_form_nested_2_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"height" "enum__pages_v_blocks_spacer_nested_3_height" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_3_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_3_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"field_type" "enum__pages_v_blocks_contact_form_nested_3_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_pathname" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "tags_locales" (
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "seo_settings_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "site_settings_supported_languages" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_site_settings_supported_languages",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"enable_multi_language" boolean DEFAULT true NOT NULL,
  	"default_language" "enum_site_settings_default_language" DEFAULT 'en' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DROP INDEX "articles_slug_idx";
  DROP INDEX "_articles_v_version_version_slug_idx";
  DROP INDEX "pages_pathname_idx";
  DROP INDEX "_pages_v_version_version_pathname_idx";
  DROP INDEX "tags_slug_idx";
  DROP INDEX "tags_name_idx";
  DROP INDEX "pages_rels_tags_id_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "pages_rels_articles_id_idx";
  DROP INDEX "_pages_v_rels_tags_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_articles_id_idx";
  ALTER TABLE "_articles_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_articles_v" ADD COLUMN "published_locale" "enum__articles_v_published_locale";
  ALTER TABLE "media_texts" ADD COLUMN "locale" "_locales";
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_article_listing" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_two_column" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_marquee_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_marquee" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_spacer" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_banner" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_nested_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_nested_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_nested_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_nested_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_spacer_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_nested_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_nested_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_banner_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_nested_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_rich_text_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_article_listing_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_2_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_2_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_2_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_two_column_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_2_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_2_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_2_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_marquee_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_marquee_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_spacer_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_2_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_2_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_2_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_2_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_banner_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_nested_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_nested_2_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_nested_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_nested_2_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_banner_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_nested_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_columns_2_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_columns_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_rich_text_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_article_listing_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_3_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_features_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_3_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_3_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_two_column_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_3_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_3_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_3_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_marquee_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_marquee_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_spacer_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_3_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_3_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_3_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_3_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_pricing_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_banner_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_nested_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_accordion_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_nested_3_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_section_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_nested_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_nested_3_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_banner_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_nested_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_columns_3_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_columns_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_article_listing" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_two_column" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_marquee" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_spacer" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_banner" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_nested_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_nested_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_nested_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_spacer_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_banner_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_nested_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_nested" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_rich_text_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_article_listing_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_2_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_2_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud_2_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_two_column_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_2_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_2_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_2_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_marquee_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_marquee_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_spacer_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_2_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_2_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_2_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_2_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_banner_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_nested_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_2_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_nested_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_nested_2_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_banner_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_nested_2_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_nested_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_columns_2_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_columns_2" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_rich_text_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_article_listing_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_3_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_features_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_3_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud_3_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_two_column_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_3_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_3_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_3_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_marquee_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_marquee_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_spacer_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_3_fields_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_3_fields" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_3_plans_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_3_plans" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_pricing_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_banner_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_nested_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_accordion_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_3_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_nested_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_nested_3_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_banner_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_nested_3_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_nested_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_columns_3_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_columns_3" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_nested_2" ADD CONSTRAINT "pages_blocks_spacer_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_2_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_nested_2_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_nested_2_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_2_fields" ADD CONSTRAINT "pages_blocks_contact_form_nested_2_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_2" ADD CONSTRAINT "pages_blocks_contact_form_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_nested_3" ADD CONSTRAINT "pages_blocks_spacer_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_3_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_nested_3_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_nested_3_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_3_fields" ADD CONSTRAINT "pages_blocks_contact_form_nested_3_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_3" ADD CONSTRAINT "pages_blocks_contact_form_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_nested_2" ADD CONSTRAINT "_pages_v_blocks_spacer_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_2_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_2_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_nested_2_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_2_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_2_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_2" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_nested_3" ADD CONSTRAINT "_pages_v_blocks_spacer_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_3_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_3_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_nested_3_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_3_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_3_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_3" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_locales" ADD CONSTRAINT "seo_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_supported_languages" ADD CONSTRAINT "site_settings_supported_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_articles_v_locales_locale_parent_id_unique" ON "_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spacer_nested_2_order_idx" ON "pages_blocks_spacer_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_nested_2_parent_id_idx" ON "pages_blocks_spacer_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_nested_2_path_idx" ON "pages_blocks_spacer_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_nested_2_locale_idx" ON "pages_blocks_spacer_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_2_fields_options_order_idx" ON "pages_blocks_contact_form_nested_2_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_2_fields_options_parent_id_idx" ON "pages_blocks_contact_form_nested_2_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_2_fields_options_locale_idx" ON "pages_blocks_contact_form_nested_2_fields_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_2_fields_order_idx" ON "pages_blocks_contact_form_nested_2_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_2_fields_parent_id_idx" ON "pages_blocks_contact_form_nested_2_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_2_fields_locale_idx" ON "pages_blocks_contact_form_nested_2_fields" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_2_order_idx" ON "pages_blocks_contact_form_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_2_parent_id_idx" ON "pages_blocks_contact_form_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_2_path_idx" ON "pages_blocks_contact_form_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_nested_2_locale_idx" ON "pages_blocks_contact_form_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_spacer_nested_3_order_idx" ON "pages_blocks_spacer_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_nested_3_parent_id_idx" ON "pages_blocks_spacer_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_nested_3_path_idx" ON "pages_blocks_spacer_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_nested_3_locale_idx" ON "pages_blocks_spacer_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_3_fields_options_order_idx" ON "pages_blocks_contact_form_nested_3_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_3_fields_options_parent_id_idx" ON "pages_blocks_contact_form_nested_3_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_3_fields_options_locale_idx" ON "pages_blocks_contact_form_nested_3_fields_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_3_fields_order_idx" ON "pages_blocks_contact_form_nested_3_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_3_fields_parent_id_idx" ON "pages_blocks_contact_form_nested_3_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_3_fields_locale_idx" ON "pages_blocks_contact_form_nested_3_fields" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_3_order_idx" ON "pages_blocks_contact_form_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_3_parent_id_idx" ON "pages_blocks_contact_form_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_3_path_idx" ON "pages_blocks_contact_form_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_nested_3_locale_idx" ON "pages_blocks_contact_form_nested_3" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_pathname_idx" ON "pages_locales" USING btree ("pathname","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_nested_2_order_idx" ON "_pages_v_blocks_spacer_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_nested_2_parent_id_idx" ON "_pages_v_blocks_spacer_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_nested_2_path_idx" ON "_pages_v_blocks_spacer_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_nested_2_locale_idx" ON "_pages_v_blocks_spacer_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_fields_options_order_idx" ON "_pages_v_blocks_contact_form_nested_2_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_2_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_fields_options_locale_idx" ON "_pages_v_blocks_contact_form_nested_2_fields_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_fields_order_idx" ON "_pages_v_blocks_contact_form_nested_2_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_2_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_fields_locale_idx" ON "_pages_v_blocks_contact_form_nested_2_fields" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_order_idx" ON "_pages_v_blocks_contact_form_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_path_idx" ON "_pages_v_blocks_contact_form_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_2_locale_idx" ON "_pages_v_blocks_contact_form_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_spacer_nested_3_order_idx" ON "_pages_v_blocks_spacer_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_nested_3_parent_id_idx" ON "_pages_v_blocks_spacer_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_nested_3_path_idx" ON "_pages_v_blocks_spacer_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_nested_3_locale_idx" ON "_pages_v_blocks_spacer_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_fields_options_order_idx" ON "_pages_v_blocks_contact_form_nested_3_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_3_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_fields_options_locale_idx" ON "_pages_v_blocks_contact_form_nested_3_fields_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_fields_order_idx" ON "_pages_v_blocks_contact_form_nested_3_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_3_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_fields_locale_idx" ON "_pages_v_blocks_contact_form_nested_3_fields" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_order_idx" ON "_pages_v_blocks_contact_form_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_path_idx" ON "_pages_v_blocks_contact_form_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_3_locale_idx" ON "_pages_v_blocks_contact_form_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_version_pathname_idx" ON "_pages_v_locales" USING btree ("version_pathname","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "tags_name_idx" ON "tags_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "seo_settings_locales_locale_parent_id_unique" ON "seo_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_supported_languages_order_idx" ON "site_settings_supported_languages" USING btree ("order");
  CREATE INDEX "site_settings_supported_languages_parent_idx" ON "site_settings_supported_languages" USING btree ("parent_id");
  CREATE INDEX "_articles_v_snapshot_idx" ON "_articles_v" USING btree ("snapshot");
  CREATE INDEX "_articles_v_published_locale_idx" ON "_articles_v" USING btree ("published_locale");
  CREATE INDEX "media_texts_locale_parent" ON "media_texts" USING btree ("locale","parent_id");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_items_locale_idx" ON "pages_blocks_accordion_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_locale_idx" ON "pages_blocks_accordion" USING btree ("_locale");
  CREATE INDEX "pages_blocks_article_listing_locale_idx" ON "pages_blocks_article_listing" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_links_locale_idx" ON "pages_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_items_locale_idx" ON "pages_blocks_features_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_locale_idx" ON "pages_blocks_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_links_locale_idx" ON "pages_blocks_cta_section_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_locale_idx" ON "pages_blocks_cta_section" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_items_locale_idx" ON "pages_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_items_locale_idx" ON "pages_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_logos_locale_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_locale_idx" ON "pages_blocks_logo_cloud" USING btree ("_locale");
  CREATE INDEX "pages_blocks_two_column_locale_idx" ON "pages_blocks_two_column" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_images_locale_idx" ON "pages_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_locale_idx" ON "pages_blocks_video" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_members_social_links_locale_idx" ON "pages_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_members_locale_idx" ON "pages_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_locale_idx" ON "pages_blocks_team" USING btree ("_locale");
  CREATE INDEX "pages_blocks_marquee_items_locale_idx" ON "pages_blocks_marquee_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_marquee_locale_idx" ON "pages_blocks_marquee" USING btree ("_locale");
  CREATE INDEX "pages_blocks_spacer_locale_idx" ON "pages_blocks_spacer" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_fields_options_locale_idx" ON "pages_blocks_contact_form_fields_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_fields_locale_idx" ON "pages_blocks_contact_form_fields" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_plans_features_locale_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_plans_locale_idx" ON "pages_blocks_pricing_plans" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_locale_idx" ON "pages_blocks_pricing" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_locale_idx" ON "pages_blocks_banner" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_nested_items_locale_idx" ON "pages_blocks_accordion_nested_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_nested_locale_idx" ON "pages_blocks_accordion_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_nested_links_locale_idx" ON "pages_blocks_cta_section_nested_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_nested_locale_idx" ON "pages_blocks_cta_section_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_nested_items_locale_idx" ON "pages_blocks_stats_nested_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_nested_locale_idx" ON "pages_blocks_stats_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_nested_images_locale_idx" ON "pages_blocks_gallery_nested_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_nested_locale_idx" ON "pages_blocks_gallery_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_nested_locale_idx" ON "pages_blocks_video_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_spacer_nested_locale_idx" ON "pages_blocks_spacer_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_fields_options_locale_idx" ON "pages_blocks_contact_form_nested_fields_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_fields_locale_idx" ON "pages_blocks_contact_form_nested_fields" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_nested_locale_idx" ON "pages_blocks_contact_form_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_nested_locale_idx" ON "pages_blocks_banner_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_nested_items_locale_idx" ON "pages_blocks_faq_nested_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_nested_locale_idx" ON "pages_blocks_faq_nested" USING btree ("_locale");
  CREATE INDEX "pages_blocks_columns_columns_locale_idx" ON "pages_blocks_columns_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_columns_locale_idx" ON "pages_blocks_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_rich_text_2_locale_idx" ON "pages_blocks_rich_text_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_2_items_locale_idx" ON "pages_blocks_accordion_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_2_locale_idx" ON "pages_blocks_accordion_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_article_listing_2_locale_idx" ON "pages_blocks_article_listing_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_2_links_locale_idx" ON "pages_blocks_hero_2_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_2_locale_idx" ON "pages_blocks_hero_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_2_items_locale_idx" ON "pages_blocks_features_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_2_locale_idx" ON "pages_blocks_features_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_2_links_locale_idx" ON "pages_blocks_cta_section_2_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_2_locale_idx" ON "pages_blocks_cta_section_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_2_items_locale_idx" ON "pages_blocks_stats_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_2_locale_idx" ON "pages_blocks_stats_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_2_items_locale_idx" ON "pages_blocks_testimonials_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_2_locale_idx" ON "pages_blocks_testimonials_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_2_logos_locale_idx" ON "pages_blocks_logo_cloud_2_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_2_locale_idx" ON "pages_blocks_logo_cloud_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_two_column_2_locale_idx" ON "pages_blocks_two_column_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_2_images_locale_idx" ON "pages_blocks_gallery_2_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_2_locale_idx" ON "pages_blocks_gallery_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_2_locale_idx" ON "pages_blocks_video_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_2_members_social_links_locale_idx" ON "pages_blocks_team_2_members_social_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_2_members_locale_idx" ON "pages_blocks_team_2_members" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_2_locale_idx" ON "pages_blocks_team_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_marquee_2_items_locale_idx" ON "pages_blocks_marquee_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_marquee_2_locale_idx" ON "pages_blocks_marquee_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_spacer_2_locale_idx" ON "pages_blocks_spacer_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_2_fields_options_locale_idx" ON "pages_blocks_contact_form_2_fields_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_2_fields_locale_idx" ON "pages_blocks_contact_form_2_fields" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_2_locale_idx" ON "pages_blocks_contact_form_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_2_plans_features_locale_idx" ON "pages_blocks_pricing_2_plans_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_2_plans_locale_idx" ON "pages_blocks_pricing_2_plans" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_2_locale_idx" ON "pages_blocks_pricing_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_2_locale_idx" ON "pages_blocks_banner_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_2_items_locale_idx" ON "pages_blocks_faq_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_2_locale_idx" ON "pages_blocks_faq_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_nested_2_items_locale_idx" ON "pages_blocks_accordion_nested_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_nested_2_locale_idx" ON "pages_blocks_accordion_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_nested_2_links_locale_idx" ON "pages_blocks_cta_section_nested_2_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_nested_2_locale_idx" ON "pages_blocks_cta_section_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_nested_2_items_locale_idx" ON "pages_blocks_stats_nested_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_nested_2_locale_idx" ON "pages_blocks_stats_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_nested_2_images_locale_idx" ON "pages_blocks_gallery_nested_2_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_nested_2_locale_idx" ON "pages_blocks_gallery_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_nested_2_locale_idx" ON "pages_blocks_video_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_nested_2_locale_idx" ON "pages_blocks_banner_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_nested_2_items_locale_idx" ON "pages_blocks_faq_nested_2_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_nested_2_locale_idx" ON "pages_blocks_faq_nested_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_columns_2_columns_locale_idx" ON "pages_blocks_columns_2_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_columns_2_locale_idx" ON "pages_blocks_columns_2" USING btree ("_locale");
  CREATE INDEX "pages_blocks_rich_text_3_locale_idx" ON "pages_blocks_rich_text_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_3_items_locale_idx" ON "pages_blocks_accordion_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_3_locale_idx" ON "pages_blocks_accordion_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_article_listing_3_locale_idx" ON "pages_blocks_article_listing_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_3_links_locale_idx" ON "pages_blocks_hero_3_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_3_locale_idx" ON "pages_blocks_hero_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_3_items_locale_idx" ON "pages_blocks_features_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_features_3_locale_idx" ON "pages_blocks_features_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_3_links_locale_idx" ON "pages_blocks_cta_section_3_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_3_locale_idx" ON "pages_blocks_cta_section_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_3_items_locale_idx" ON "pages_blocks_stats_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_3_locale_idx" ON "pages_blocks_stats_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_3_items_locale_idx" ON "pages_blocks_testimonials_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_3_locale_idx" ON "pages_blocks_testimonials_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_3_logos_locale_idx" ON "pages_blocks_logo_cloud_3_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_3_locale_idx" ON "pages_blocks_logo_cloud_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_two_column_3_locale_idx" ON "pages_blocks_two_column_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_3_images_locale_idx" ON "pages_blocks_gallery_3_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_3_locale_idx" ON "pages_blocks_gallery_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_3_locale_idx" ON "pages_blocks_video_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_3_members_social_links_locale_idx" ON "pages_blocks_team_3_members_social_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_3_members_locale_idx" ON "pages_blocks_team_3_members" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_3_locale_idx" ON "pages_blocks_team_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_marquee_3_items_locale_idx" ON "pages_blocks_marquee_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_marquee_3_locale_idx" ON "pages_blocks_marquee_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_spacer_3_locale_idx" ON "pages_blocks_spacer_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_3_fields_options_locale_idx" ON "pages_blocks_contact_form_3_fields_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_3_fields_locale_idx" ON "pages_blocks_contact_form_3_fields" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_3_locale_idx" ON "pages_blocks_contact_form_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_3_plans_features_locale_idx" ON "pages_blocks_pricing_3_plans_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_3_plans_locale_idx" ON "pages_blocks_pricing_3_plans" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pricing_3_locale_idx" ON "pages_blocks_pricing_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_3_locale_idx" ON "pages_blocks_banner_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_3_items_locale_idx" ON "pages_blocks_faq_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_3_locale_idx" ON "pages_blocks_faq_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_nested_3_items_locale_idx" ON "pages_blocks_accordion_nested_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_nested_3_locale_idx" ON "pages_blocks_accordion_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_nested_3_links_locale_idx" ON "pages_blocks_cta_section_nested_3_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_section_nested_3_locale_idx" ON "pages_blocks_cta_section_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_nested_3_items_locale_idx" ON "pages_blocks_stats_nested_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_nested_3_locale_idx" ON "pages_blocks_stats_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_nested_3_images_locale_idx" ON "pages_blocks_gallery_nested_3_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_nested_3_locale_idx" ON "pages_blocks_gallery_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_nested_3_locale_idx" ON "pages_blocks_video_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_nested_3_locale_idx" ON "pages_blocks_banner_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_nested_3_items_locale_idx" ON "pages_blocks_faq_nested_3_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_nested_3_locale_idx" ON "pages_blocks_faq_nested_3" USING btree ("_locale");
  CREATE INDEX "pages_blocks_columns_3_columns_locale_idx" ON "pages_blocks_columns_3_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_columns_3_locale_idx" ON "pages_blocks_columns_3" USING btree ("_locale");
  CREATE INDEX "pages_breadcrumbs_locale_idx" ON "pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_items_locale_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_locale_idx" ON "_pages_v_blocks_accordion" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_article_listing_locale_idx" ON "_pages_v_blocks_article_listing" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_links_locale_idx" ON "_pages_v_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_items_locale_idx" ON "_pages_v_blocks_features_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_locale_idx" ON "_pages_v_blocks_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_links_locale_idx" ON "_pages_v_blocks_cta_section_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_locale_idx" ON "_pages_v_blocks_cta_section" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_items_locale_idx" ON "_pages_v_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_locale_idx" ON "_pages_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_items_locale_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_locale_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_locale_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_two_column_locale_idx" ON "_pages_v_blocks_two_column" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_locale_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_locale_idx" ON "_pages_v_blocks_video" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_locale_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_members_locale_idx" ON "_pages_v_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_locale_idx" ON "_pages_v_blocks_team" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_marquee_items_locale_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_marquee_locale_idx" ON "_pages_v_blocks_marquee" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_spacer_locale_idx" ON "_pages_v_blocks_spacer" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_fields_options_locale_idx" ON "_pages_v_blocks_contact_form_fields_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_fields_locale_idx" ON "_pages_v_blocks_contact_form_fields" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_locale_idx" ON "_pages_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_locale_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_plans_locale_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_locale_idx" ON "_pages_v_blocks_pricing" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_locale_idx" ON "_pages_v_blocks_banner" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_items_locale_idx" ON "_pages_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_nested_items_locale_idx" ON "_pages_v_blocks_accordion_nested_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_nested_locale_idx" ON "_pages_v_blocks_accordion_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_links_locale_idx" ON "_pages_v_blocks_cta_section_nested_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_locale_idx" ON "_pages_v_blocks_cta_section_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_nested_items_locale_idx" ON "_pages_v_blocks_stats_nested_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_nested_locale_idx" ON "_pages_v_blocks_stats_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_nested_images_locale_idx" ON "_pages_v_blocks_gallery_nested_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_nested_locale_idx" ON "_pages_v_blocks_gallery_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_nested_locale_idx" ON "_pages_v_blocks_video_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_spacer_nested_locale_idx" ON "_pages_v_blocks_spacer_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_fields_options_locale_idx" ON "_pages_v_blocks_contact_form_nested_fields_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_fields_locale_idx" ON "_pages_v_blocks_contact_form_nested_fields" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_locale_idx" ON "_pages_v_blocks_contact_form_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_nested_locale_idx" ON "_pages_v_blocks_banner_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_nested_items_locale_idx" ON "_pages_v_blocks_faq_nested_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_nested_locale_idx" ON "_pages_v_blocks_faq_nested" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_columns_columns_locale_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_columns_locale_idx" ON "_pages_v_blocks_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_2_locale_idx" ON "_pages_v_blocks_rich_text_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_2_items_locale_idx" ON "_pages_v_blocks_accordion_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_2_locale_idx" ON "_pages_v_blocks_accordion_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_article_listing_2_locale_idx" ON "_pages_v_blocks_article_listing_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_2_links_locale_idx" ON "_pages_v_blocks_hero_2_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_2_locale_idx" ON "_pages_v_blocks_hero_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_2_items_locale_idx" ON "_pages_v_blocks_features_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_2_locale_idx" ON "_pages_v_blocks_features_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_2_links_locale_idx" ON "_pages_v_blocks_cta_section_2_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_2_locale_idx" ON "_pages_v_blocks_cta_section_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_2_items_locale_idx" ON "_pages_v_blocks_stats_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_2_locale_idx" ON "_pages_v_blocks_stats_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_2_items_locale_idx" ON "_pages_v_blocks_testimonials_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_2_locale_idx" ON "_pages_v_blocks_testimonials_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_logos_locale_idx" ON "_pages_v_blocks_logo_cloud_2_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_locale_idx" ON "_pages_v_blocks_logo_cloud_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_two_column_2_locale_idx" ON "_pages_v_blocks_two_column_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_2_images_locale_idx" ON "_pages_v_blocks_gallery_2_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_2_locale_idx" ON "_pages_v_blocks_gallery_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_2_locale_idx" ON "_pages_v_blocks_video_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_2_members_social_links_locale_idx" ON "_pages_v_blocks_team_2_members_social_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_2_members_locale_idx" ON "_pages_v_blocks_team_2_members" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_2_locale_idx" ON "_pages_v_blocks_team_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_marquee_2_items_locale_idx" ON "_pages_v_blocks_marquee_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_marquee_2_locale_idx" ON "_pages_v_blocks_marquee_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_spacer_2_locale_idx" ON "_pages_v_blocks_spacer_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_2_fields_options_locale_idx" ON "_pages_v_blocks_contact_form_2_fields_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_2_fields_locale_idx" ON "_pages_v_blocks_contact_form_2_fields" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_2_locale_idx" ON "_pages_v_blocks_contact_form_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_2_plans_features_locale_idx" ON "_pages_v_blocks_pricing_2_plans_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_2_plans_locale_idx" ON "_pages_v_blocks_pricing_2_plans" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_2_locale_idx" ON "_pages_v_blocks_pricing_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_2_locale_idx" ON "_pages_v_blocks_banner_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_2_items_locale_idx" ON "_pages_v_blocks_faq_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_2_locale_idx" ON "_pages_v_blocks_faq_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_items_locale_idx" ON "_pages_v_blocks_accordion_nested_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_locale_idx" ON "_pages_v_blocks_accordion_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_links_locale_idx" ON "_pages_v_blocks_cta_section_nested_2_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_locale_idx" ON "_pages_v_blocks_cta_section_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_items_locale_idx" ON "_pages_v_blocks_stats_nested_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_locale_idx" ON "_pages_v_blocks_stats_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_images_locale_idx" ON "_pages_v_blocks_gallery_nested_2_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_locale_idx" ON "_pages_v_blocks_gallery_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_nested_2_locale_idx" ON "_pages_v_blocks_video_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_nested_2_locale_idx" ON "_pages_v_blocks_banner_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_items_locale_idx" ON "_pages_v_blocks_faq_nested_2_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_locale_idx" ON "_pages_v_blocks_faq_nested_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_columns_2_columns_locale_idx" ON "_pages_v_blocks_columns_2_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_columns_2_locale_idx" ON "_pages_v_blocks_columns_2" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_3_locale_idx" ON "_pages_v_blocks_rich_text_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_3_items_locale_idx" ON "_pages_v_blocks_accordion_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_3_locale_idx" ON "_pages_v_blocks_accordion_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_article_listing_3_locale_idx" ON "_pages_v_blocks_article_listing_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_3_links_locale_idx" ON "_pages_v_blocks_hero_3_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_3_locale_idx" ON "_pages_v_blocks_hero_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_3_items_locale_idx" ON "_pages_v_blocks_features_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_features_3_locale_idx" ON "_pages_v_blocks_features_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_3_links_locale_idx" ON "_pages_v_blocks_cta_section_3_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_3_locale_idx" ON "_pages_v_blocks_cta_section_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_3_items_locale_idx" ON "_pages_v_blocks_stats_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_3_locale_idx" ON "_pages_v_blocks_stats_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_3_items_locale_idx" ON "_pages_v_blocks_testimonials_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_3_locale_idx" ON "_pages_v_blocks_testimonials_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_logos_locale_idx" ON "_pages_v_blocks_logo_cloud_3_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_locale_idx" ON "_pages_v_blocks_logo_cloud_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_two_column_3_locale_idx" ON "_pages_v_blocks_two_column_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_3_images_locale_idx" ON "_pages_v_blocks_gallery_3_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_3_locale_idx" ON "_pages_v_blocks_gallery_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_3_locale_idx" ON "_pages_v_blocks_video_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_3_members_social_links_locale_idx" ON "_pages_v_blocks_team_3_members_social_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_3_members_locale_idx" ON "_pages_v_blocks_team_3_members" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_3_locale_idx" ON "_pages_v_blocks_team_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_marquee_3_items_locale_idx" ON "_pages_v_blocks_marquee_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_marquee_3_locale_idx" ON "_pages_v_blocks_marquee_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_spacer_3_locale_idx" ON "_pages_v_blocks_spacer_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_3_fields_options_locale_idx" ON "_pages_v_blocks_contact_form_3_fields_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_3_fields_locale_idx" ON "_pages_v_blocks_contact_form_3_fields" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_3_locale_idx" ON "_pages_v_blocks_contact_form_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_3_plans_features_locale_idx" ON "_pages_v_blocks_pricing_3_plans_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_3_plans_locale_idx" ON "_pages_v_blocks_pricing_3_plans" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pricing_3_locale_idx" ON "_pages_v_blocks_pricing_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_3_locale_idx" ON "_pages_v_blocks_banner_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_3_items_locale_idx" ON "_pages_v_blocks_faq_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_3_locale_idx" ON "_pages_v_blocks_faq_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_items_locale_idx" ON "_pages_v_blocks_accordion_nested_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_locale_idx" ON "_pages_v_blocks_accordion_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_links_locale_idx" ON "_pages_v_blocks_cta_section_nested_3_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_locale_idx" ON "_pages_v_blocks_cta_section_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_items_locale_idx" ON "_pages_v_blocks_stats_nested_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_locale_idx" ON "_pages_v_blocks_stats_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_images_locale_idx" ON "_pages_v_blocks_gallery_nested_3_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_locale_idx" ON "_pages_v_blocks_gallery_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_nested_3_locale_idx" ON "_pages_v_blocks_video_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_nested_3_locale_idx" ON "_pages_v_blocks_banner_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_items_locale_idx" ON "_pages_v_blocks_faq_nested_3_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_locale_idx" ON "_pages_v_blocks_faq_nested_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_columns_3_columns_locale_idx" ON "_pages_v_blocks_columns_3_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_columns_3_locale_idx" ON "_pages_v_blocks_columns_3" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_breadcrumbs_locale_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_tags_id_idx" ON "pages_rels" USING btree ("tags_id","locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id","locale");
  CREATE INDEX "_pages_v_rels_tags_id_idx" ON "_pages_v_rels" USING btree ("tags_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id","locale");
  ALTER TABLE "articles" DROP COLUMN "generate_slug";
  ALTER TABLE "articles" DROP COLUMN "slug";
  ALTER TABLE "articles" DROP COLUMN "title";
  ALTER TABLE "articles" DROP COLUMN "excerpt";
  ALTER TABLE "articles" DROP COLUMN "content";
  ALTER TABLE "articles" DROP COLUMN "meta_title";
  ALTER TABLE "articles" DROP COLUMN "meta_description";
  ALTER TABLE "_articles_v" DROP COLUMN "version_generate_slug";
  ALTER TABLE "_articles_v" DROP COLUMN "version_slug";
  ALTER TABLE "_articles_v" DROP COLUMN "version_title";
  ALTER TABLE "_articles_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_articles_v" DROP COLUMN "version_content";
  ALTER TABLE "_articles_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_articles_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "pages" DROP COLUMN "generate_slug";
  ALTER TABLE "pages" DROP COLUMN "slug";
  ALTER TABLE "pages" DROP COLUMN "pathname";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_generate_slug";
  ALTER TABLE "_pages_v" DROP COLUMN "version_slug";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pathname";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "tags" DROP COLUMN "generate_slug";
  ALTER TABLE "tags" DROP COLUMN "slug";
  ALTER TABLE "tags" DROP COLUMN "name";
  ALTER TABLE "seo_settings" DROP COLUMN "meta_title";
  ALTER TABLE "seo_settings" DROP COLUMN "meta_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spacer_nested_2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_nested_2_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_nested_2_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_nested_2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spacer_nested_3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_nested_3_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_nested_3_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form_nested_3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spacer_nested_2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_2_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_2_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spacer_nested_3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_3_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_3_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_supported_languages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "_articles_v_locales" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_spacer_nested_2" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_2_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_2_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_2" CASCADE;
  DROP TABLE "pages_blocks_spacer_nested_3" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_3_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_3_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_3" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_2_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_2_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_3_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_3_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_3" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "seo_settings_locales" CASCADE;
  DROP TABLE "site_settings_supported_languages" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP INDEX "_articles_v_snapshot_idx";
  DROP INDEX "_articles_v_published_locale_idx";
  DROP INDEX "media_texts_locale_parent";
  DROP INDEX "pages_blocks_rich_text_locale_idx";
  DROP INDEX "pages_blocks_accordion_items_locale_idx";
  DROP INDEX "pages_blocks_accordion_locale_idx";
  DROP INDEX "pages_blocks_article_listing_locale_idx";
  DROP INDEX "pages_blocks_hero_links_locale_idx";
  DROP INDEX "pages_blocks_hero_locale_idx";
  DROP INDEX "pages_blocks_features_items_locale_idx";
  DROP INDEX "pages_blocks_features_locale_idx";
  DROP INDEX "pages_blocks_cta_section_links_locale_idx";
  DROP INDEX "pages_blocks_cta_section_locale_idx";
  DROP INDEX "pages_blocks_stats_items_locale_idx";
  DROP INDEX "pages_blocks_stats_locale_idx";
  DROP INDEX "pages_blocks_testimonials_items_locale_idx";
  DROP INDEX "pages_blocks_testimonials_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_logos_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_locale_idx";
  DROP INDEX "pages_blocks_two_column_locale_idx";
  DROP INDEX "pages_blocks_gallery_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_locale_idx";
  DROP INDEX "pages_blocks_video_locale_idx";
  DROP INDEX "pages_blocks_team_members_social_links_locale_idx";
  DROP INDEX "pages_blocks_team_members_locale_idx";
  DROP INDEX "pages_blocks_team_locale_idx";
  DROP INDEX "pages_blocks_marquee_items_locale_idx";
  DROP INDEX "pages_blocks_marquee_locale_idx";
  DROP INDEX "pages_blocks_spacer_locale_idx";
  DROP INDEX "pages_blocks_contact_form_fields_options_locale_idx";
  DROP INDEX "pages_blocks_contact_form_fields_locale_idx";
  DROP INDEX "pages_blocks_contact_form_locale_idx";
  DROP INDEX "pages_blocks_pricing_plans_features_locale_idx";
  DROP INDEX "pages_blocks_pricing_plans_locale_idx";
  DROP INDEX "pages_blocks_pricing_locale_idx";
  DROP INDEX "pages_blocks_banner_locale_idx";
  DROP INDEX "pages_blocks_faq_items_locale_idx";
  DROP INDEX "pages_blocks_faq_locale_idx";
  DROP INDEX "pages_blocks_accordion_nested_items_locale_idx";
  DROP INDEX "pages_blocks_accordion_nested_locale_idx";
  DROP INDEX "pages_blocks_cta_section_nested_links_locale_idx";
  DROP INDEX "pages_blocks_cta_section_nested_locale_idx";
  DROP INDEX "pages_blocks_stats_nested_items_locale_idx";
  DROP INDEX "pages_blocks_stats_nested_locale_idx";
  DROP INDEX "pages_blocks_gallery_nested_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_nested_locale_idx";
  DROP INDEX "pages_blocks_video_nested_locale_idx";
  DROP INDEX "pages_blocks_spacer_nested_locale_idx";
  DROP INDEX "pages_blocks_contact_form_nested_fields_options_locale_idx";
  DROP INDEX "pages_blocks_contact_form_nested_fields_locale_idx";
  DROP INDEX "pages_blocks_contact_form_nested_locale_idx";
  DROP INDEX "pages_blocks_banner_nested_locale_idx";
  DROP INDEX "pages_blocks_faq_nested_items_locale_idx";
  DROP INDEX "pages_blocks_faq_nested_locale_idx";
  DROP INDEX "pages_blocks_columns_columns_locale_idx";
  DROP INDEX "pages_blocks_columns_locale_idx";
  DROP INDEX "pages_blocks_rich_text_2_locale_idx";
  DROP INDEX "pages_blocks_accordion_2_items_locale_idx";
  DROP INDEX "pages_blocks_accordion_2_locale_idx";
  DROP INDEX "pages_blocks_article_listing_2_locale_idx";
  DROP INDEX "pages_blocks_hero_2_links_locale_idx";
  DROP INDEX "pages_blocks_hero_2_locale_idx";
  DROP INDEX "pages_blocks_features_2_items_locale_idx";
  DROP INDEX "pages_blocks_features_2_locale_idx";
  DROP INDEX "pages_blocks_cta_section_2_links_locale_idx";
  DROP INDEX "pages_blocks_cta_section_2_locale_idx";
  DROP INDEX "pages_blocks_stats_2_items_locale_idx";
  DROP INDEX "pages_blocks_stats_2_locale_idx";
  DROP INDEX "pages_blocks_testimonials_2_items_locale_idx";
  DROP INDEX "pages_blocks_testimonials_2_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_2_logos_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_2_locale_idx";
  DROP INDEX "pages_blocks_two_column_2_locale_idx";
  DROP INDEX "pages_blocks_gallery_2_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_2_locale_idx";
  DROP INDEX "pages_blocks_video_2_locale_idx";
  DROP INDEX "pages_blocks_team_2_members_social_links_locale_idx";
  DROP INDEX "pages_blocks_team_2_members_locale_idx";
  DROP INDEX "pages_blocks_team_2_locale_idx";
  DROP INDEX "pages_blocks_marquee_2_items_locale_idx";
  DROP INDEX "pages_blocks_marquee_2_locale_idx";
  DROP INDEX "pages_blocks_spacer_2_locale_idx";
  DROP INDEX "pages_blocks_contact_form_2_fields_options_locale_idx";
  DROP INDEX "pages_blocks_contact_form_2_fields_locale_idx";
  DROP INDEX "pages_blocks_contact_form_2_locale_idx";
  DROP INDEX "pages_blocks_pricing_2_plans_features_locale_idx";
  DROP INDEX "pages_blocks_pricing_2_plans_locale_idx";
  DROP INDEX "pages_blocks_pricing_2_locale_idx";
  DROP INDEX "pages_blocks_banner_2_locale_idx";
  DROP INDEX "pages_blocks_faq_2_items_locale_idx";
  DROP INDEX "pages_blocks_faq_2_locale_idx";
  DROP INDEX "pages_blocks_accordion_nested_2_items_locale_idx";
  DROP INDEX "pages_blocks_accordion_nested_2_locale_idx";
  DROP INDEX "pages_blocks_cta_section_nested_2_links_locale_idx";
  DROP INDEX "pages_blocks_cta_section_nested_2_locale_idx";
  DROP INDEX "pages_blocks_stats_nested_2_items_locale_idx";
  DROP INDEX "pages_blocks_stats_nested_2_locale_idx";
  DROP INDEX "pages_blocks_gallery_nested_2_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_nested_2_locale_idx";
  DROP INDEX "pages_blocks_video_nested_2_locale_idx";
  DROP INDEX "pages_blocks_banner_nested_2_locale_idx";
  DROP INDEX "pages_blocks_faq_nested_2_items_locale_idx";
  DROP INDEX "pages_blocks_faq_nested_2_locale_idx";
  DROP INDEX "pages_blocks_columns_2_columns_locale_idx";
  DROP INDEX "pages_blocks_columns_2_locale_idx";
  DROP INDEX "pages_blocks_rich_text_3_locale_idx";
  DROP INDEX "pages_blocks_accordion_3_items_locale_idx";
  DROP INDEX "pages_blocks_accordion_3_locale_idx";
  DROP INDEX "pages_blocks_article_listing_3_locale_idx";
  DROP INDEX "pages_blocks_hero_3_links_locale_idx";
  DROP INDEX "pages_blocks_hero_3_locale_idx";
  DROP INDEX "pages_blocks_features_3_items_locale_idx";
  DROP INDEX "pages_blocks_features_3_locale_idx";
  DROP INDEX "pages_blocks_cta_section_3_links_locale_idx";
  DROP INDEX "pages_blocks_cta_section_3_locale_idx";
  DROP INDEX "pages_blocks_stats_3_items_locale_idx";
  DROP INDEX "pages_blocks_stats_3_locale_idx";
  DROP INDEX "pages_blocks_testimonials_3_items_locale_idx";
  DROP INDEX "pages_blocks_testimonials_3_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_3_logos_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_3_locale_idx";
  DROP INDEX "pages_blocks_two_column_3_locale_idx";
  DROP INDEX "pages_blocks_gallery_3_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_3_locale_idx";
  DROP INDEX "pages_blocks_video_3_locale_idx";
  DROP INDEX "pages_blocks_team_3_members_social_links_locale_idx";
  DROP INDEX "pages_blocks_team_3_members_locale_idx";
  DROP INDEX "pages_blocks_team_3_locale_idx";
  DROP INDEX "pages_blocks_marquee_3_items_locale_idx";
  DROP INDEX "pages_blocks_marquee_3_locale_idx";
  DROP INDEX "pages_blocks_spacer_3_locale_idx";
  DROP INDEX "pages_blocks_contact_form_3_fields_options_locale_idx";
  DROP INDEX "pages_blocks_contact_form_3_fields_locale_idx";
  DROP INDEX "pages_blocks_contact_form_3_locale_idx";
  DROP INDEX "pages_blocks_pricing_3_plans_features_locale_idx";
  DROP INDEX "pages_blocks_pricing_3_plans_locale_idx";
  DROP INDEX "pages_blocks_pricing_3_locale_idx";
  DROP INDEX "pages_blocks_banner_3_locale_idx";
  DROP INDEX "pages_blocks_faq_3_items_locale_idx";
  DROP INDEX "pages_blocks_faq_3_locale_idx";
  DROP INDEX "pages_blocks_accordion_nested_3_items_locale_idx";
  DROP INDEX "pages_blocks_accordion_nested_3_locale_idx";
  DROP INDEX "pages_blocks_cta_section_nested_3_links_locale_idx";
  DROP INDEX "pages_blocks_cta_section_nested_3_locale_idx";
  DROP INDEX "pages_blocks_stats_nested_3_items_locale_idx";
  DROP INDEX "pages_blocks_stats_nested_3_locale_idx";
  DROP INDEX "pages_blocks_gallery_nested_3_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_nested_3_locale_idx";
  DROP INDEX "pages_blocks_video_nested_3_locale_idx";
  DROP INDEX "pages_blocks_banner_nested_3_locale_idx";
  DROP INDEX "pages_blocks_faq_nested_3_items_locale_idx";
  DROP INDEX "pages_blocks_faq_nested_3_locale_idx";
  DROP INDEX "pages_blocks_columns_3_columns_locale_idx";
  DROP INDEX "pages_blocks_columns_3_locale_idx";
  DROP INDEX "pages_breadcrumbs_locale_idx";
  DROP INDEX "pages_rels_locale_idx";
  DROP INDEX "_pages_v_blocks_rich_text_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_items_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_locale_idx";
  DROP INDEX "_pages_v_blocks_article_listing_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_links_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_features_items_locale_idx";
  DROP INDEX "_pages_v_blocks_features_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_items_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_logos_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_locale_idx";
  DROP INDEX "_pages_v_blocks_two_column_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_locale_idx";
  DROP INDEX "_pages_v_blocks_video_locale_idx";
  DROP INDEX "_pages_v_blocks_team_members_social_links_locale_idx";
  DROP INDEX "_pages_v_blocks_team_members_locale_idx";
  DROP INDEX "_pages_v_blocks_team_locale_idx";
  DROP INDEX "_pages_v_blocks_marquee_items_locale_idx";
  DROP INDEX "_pages_v_blocks_marquee_locale_idx";
  DROP INDEX "_pages_v_blocks_spacer_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_fields_options_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_fields_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_plans_features_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_plans_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_locale_idx";
  DROP INDEX "_pages_v_blocks_banner_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_nested_items_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_nested_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_nested_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_nested_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_video_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_spacer_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_nested_fields_options_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_nested_fields_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_banner_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_nested_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_nested_locale_idx";
  DROP INDEX "_pages_v_blocks_columns_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_rich_text_2_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_2_locale_idx";
  DROP INDEX "_pages_v_blocks_article_listing_2_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_2_links_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_2_locale_idx";
  DROP INDEX "_pages_v_blocks_features_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_features_2_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_2_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_2_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_2_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_2_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_2_logos_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_2_locale_idx";
  DROP INDEX "_pages_v_blocks_two_column_2_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_2_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_2_locale_idx";
  DROP INDEX "_pages_v_blocks_video_2_locale_idx";
  DROP INDEX "_pages_v_blocks_team_2_members_social_links_locale_idx";
  DROP INDEX "_pages_v_blocks_team_2_members_locale_idx";
  DROP INDEX "_pages_v_blocks_team_2_locale_idx";
  DROP INDEX "_pages_v_blocks_marquee_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_marquee_2_locale_idx";
  DROP INDEX "_pages_v_blocks_spacer_2_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_2_fields_options_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_2_fields_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_2_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_2_plans_features_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_2_plans_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_2_locale_idx";
  DROP INDEX "_pages_v_blocks_banner_2_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_2_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_nested_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_nested_2_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_nested_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_nested_2_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_video_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_banner_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_nested_2_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_nested_2_locale_idx";
  DROP INDEX "_pages_v_blocks_columns_2_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_columns_2_locale_idx";
  DROP INDEX "_pages_v_blocks_rich_text_3_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_3_locale_idx";
  DROP INDEX "_pages_v_blocks_article_listing_3_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_3_links_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_3_locale_idx";
  DROP INDEX "_pages_v_blocks_features_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_features_3_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_3_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_3_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_3_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_3_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_3_logos_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_3_locale_idx";
  DROP INDEX "_pages_v_blocks_two_column_3_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_3_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_3_locale_idx";
  DROP INDEX "_pages_v_blocks_video_3_locale_idx";
  DROP INDEX "_pages_v_blocks_team_3_members_social_links_locale_idx";
  DROP INDEX "_pages_v_blocks_team_3_members_locale_idx";
  DROP INDEX "_pages_v_blocks_team_3_locale_idx";
  DROP INDEX "_pages_v_blocks_marquee_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_marquee_3_locale_idx";
  DROP INDEX "_pages_v_blocks_spacer_3_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_3_fields_options_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_3_fields_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_3_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_3_plans_features_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_3_plans_locale_idx";
  DROP INDEX "_pages_v_blocks_pricing_3_locale_idx";
  DROP INDEX "_pages_v_blocks_banner_3_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_3_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_nested_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_accordion_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_nested_3_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_section_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_nested_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_nested_3_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_video_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_banner_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_nested_3_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_nested_3_locale_idx";
  DROP INDEX "_pages_v_blocks_columns_3_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_columns_3_locale_idx";
  DROP INDEX "_pages_v_version_breadcrumbs_locale_idx";
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "_pages_v_rels_locale_idx";
  DROP INDEX "pages_rels_tags_id_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "pages_rels_articles_id_idx";
  DROP INDEX "_pages_v_rels_tags_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_articles_id_idx";
  ALTER TABLE "articles" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "articles" ADD COLUMN "slug" varchar;
  ALTER TABLE "articles" ADD COLUMN "title" varchar;
  ALTER TABLE "articles" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "articles" ADD COLUMN "content" jsonb;
  ALTER TABLE "articles" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "articles" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_articles_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_articles_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "slug" varchar;
  ALTER TABLE "pages" ADD COLUMN "pathname" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_pathname" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "tags" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "tags" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "tags" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "seo_settings" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "seo_settings" ADD COLUMN "meta_description" varchar;
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE UNIQUE INDEX "pages_pathname_idx" ON "pages" USING btree ("pathname");
  CREATE INDEX "_pages_v_version_version_pathname_idx" ON "_pages_v" USING btree ("version_pathname");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE UNIQUE INDEX "tags_name_idx" ON "tags" USING btree ("name");
  CREATE INDEX "pages_rels_tags_id_idx" ON "pages_rels" USING btree ("tags_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_rels_tags_id_idx" ON "_pages_v_rels" USING btree ("tags_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  ALTER TABLE "_articles_v" DROP COLUMN "snapshot";
  ALTER TABLE "_articles_v" DROP COLUMN "published_locale";
  ALTER TABLE "media_texts" DROP COLUMN "locale";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_article_listing" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud_logos" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_two_column" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_members" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_marquee_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_marquee" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_spacer" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_fields" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_plans" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_banner" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_nested_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_nested_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_nested_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_nested_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_spacer_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_nested_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_nested_fields" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_banner_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_nested_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_nested" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_rich_text_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_article_listing_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero_2_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_2_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud_2_logos" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_two_column_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_2_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_2_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_2_members" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_marquee_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_marquee_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_spacer_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_2_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_2_fields" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_2_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_2_plans" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_banner_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_nested_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_nested_2_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_nested_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_nested_2_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_banner_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_nested_2_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_columns_2_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_columns_2" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_rich_text_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_article_listing_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero_3_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_features_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_3_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud_3_logos" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_two_column_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_3_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_3_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_3_members" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_marquee_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_marquee_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_spacer_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_3_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_3_fields" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_3_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_3_plans" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_pricing_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_banner_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_nested_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_accordion_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_nested_3_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_section_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_nested_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_nested_3_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_banner_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_nested_3_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_columns_3_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_columns_3" DROP COLUMN "_locale";
  ALTER TABLE "pages_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "pages_rels" DROP COLUMN "locale";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_article_listing" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_two_column" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_members" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_marquee_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_marquee" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_spacer" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_fields" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_plans" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_banner" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_nested_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_nested_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_nested_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_nested_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_spacer_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_nested_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_nested_fields" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_banner_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_nested_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_nested" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_rich_text_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_article_listing_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_2_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_2_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud_2_logos" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_two_column_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_2_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_2_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_2_members" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_marquee_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_marquee_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_spacer_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_2_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_2_fields" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_2_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_2_plans" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_banner_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_nested_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_nested_2_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_nested_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_nested_2_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_banner_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_nested_2_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_nested_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_columns_2_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_columns_2" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_rich_text_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_article_listing_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_3_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_features_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_3_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud_3_logos" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_two_column_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_3_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_3_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_3_members" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_marquee_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_marquee_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_spacer_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_3_fields_options" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_3_fields" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_3_plans_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_3_plans" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_pricing_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_banner_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_nested_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_accordion_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_nested_3_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_section_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_nested_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_nested_3_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_banner_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_nested_3_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_nested_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_columns_3_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_columns_3" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_version_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__articles_v_published_locale";
  DROP TYPE "public"."enum_pages_blocks_spacer_nested_2_height";
  DROP TYPE "public"."enum_pages_blocks_contact_form_nested_2_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_nested_3_height";
  DROP TYPE "public"."enum_pages_blocks_contact_form_nested_3_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_nested_2_height";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_nested_2_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_nested_3_height";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_nested_3_fields_field_type";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_site_settings_supported_languages";
  DROP TYPE "public"."enum_site_settings_default_language";`)
}
