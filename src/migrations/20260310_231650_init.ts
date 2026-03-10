import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_html_tag" AS ENUM('section', 'div');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_type" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_preset_base" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_preset_xs" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_preset_sm" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_preset_md" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_preset_lg" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_width_preset_xl" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_accordion_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_accordion_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_sort" AS ENUM('-publishedDate', 'publishedDate', 'title', '-title');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_hero_design_layout" AS ENUM('contentLeft', 'contentRight', 'contentCenter', 'overlay');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_features_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_features_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_features_design_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_features_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_features_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_features_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_stats_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_stats_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_stats_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_stats_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_design_layout" AS ENUM('grid', 'carousel', 'single');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_design_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_design_layout" AS ENUM('grid', 'marquee');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_design_columns" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_two_column_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_two_column_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_two_column_design_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_two_column_design_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_two_column_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_two_column_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_gallery_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_gallery_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_gallery_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_video_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_video_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_video_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_video_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_video_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_team_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'instagram', 'website');
  CREATE TYPE "public"."enum_pages_blocks_team_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_team_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_team_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_team_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_team_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_marquee_items_type" AS ENUM('text', 'image');
  CREATE TYPE "public"."enum_pages_blocks_marquee_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_marquee_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_marquee_design_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum_pages_blocks_marquee_design_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum_pages_blocks_marquee_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_marquee_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_spacer_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_spacer_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_spacer_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_pricing_plans_period" AS ENUM('monthly', 'yearly', 'one-time');
  CREATE TYPE "public"."enum_pages_blocks_pricing_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_pricing_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_pricing_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_pricing_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_pricing_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_banner_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_banner_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_banner_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum_pages_blocks_banner_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_banner_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_faq_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_faq_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_accordion_nested_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum_pages_blocks_accordion_nested_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_stats_nested_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_stats_nested_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_nested_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_nested_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_video_nested_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_spacer_nested_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_nested_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum_pages_blocks_banner_nested_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_settings_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_gap" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_vertical_alignment" AS ENUM('start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_design_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_columns_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_2_settings_html_tag" AS ENUM('section', 'div');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_type" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_base" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_xs" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_sm" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_md" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_lg" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_xl" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_accordion_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_2_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_2_sort" AS ENUM('-publishedDate', 'publishedDate', 'title', '-title');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_design_layout" AS ENUM('contentLeft', 'contentRight', 'contentCenter', 'overlay');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_hero_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_features_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_features_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_features_2_design_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_features_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_features_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_features_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_stats_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_stats_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_stats_2_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_stats_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_stats_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_stats_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_2_design_layout" AS ENUM('grid', 'carousel', 'single');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_2_design_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_2_design_layout" AS ENUM('grid', 'marquee');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_2_design_columns" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_two_column_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_two_column_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_two_column_2_design_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_two_column_2_design_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_two_column_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_two_column_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_gallery_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_gallery_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_gallery_2_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_gallery_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_video_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_video_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_video_2_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_video_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_video_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_team_2_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'instagram', 'website');
  CREATE TYPE "public"."enum_pages_blocks_team_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_team_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_team_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_team_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_team_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_items_type" AS ENUM('text', 'image');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_design_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_design_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_marquee_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_spacer_2_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_spacer_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_spacer_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_2_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_pricing_2_plans_period" AS ENUM('monthly', 'yearly', 'one-time');
  CREATE TYPE "public"."enum_pages_blocks_pricing_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_pricing_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_pricing_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_pricing_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_pricing_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_banner_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_banner_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_banner_2_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum_pages_blocks_banner_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_banner_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_faq_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_faq_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_faq_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_faq_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_accordion_nested_2_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum_pages_blocks_accordion_nested_2_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_2_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_2_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_2_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_2_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_stats_nested_2_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_stats_nested_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_nested_2_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_nested_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_video_nested_2_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_banner_nested_2_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_gap" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_vertical_alignment" AS ENUM('start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_design_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_columns_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_3_settings_html_tag" AS ENUM('section', 'div');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_type" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_base" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_xs" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_sm" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_md" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_lg" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_xl" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_accordion_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_3_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_3_sort" AS ENUM('-publishedDate', 'publishedDate', 'title', '-title');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_article_listing_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_design_layout" AS ENUM('contentLeft', 'contentRight', 'contentCenter', 'overlay');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_hero_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_features_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_features_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_features_3_design_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_features_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_features_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_features_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_stats_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_stats_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_stats_3_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_stats_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_stats_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_stats_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_3_design_layout" AS ENUM('grid', 'carousel', 'single');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_3_design_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_3_design_layout" AS ENUM('grid', 'marquee');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_3_design_columns" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_two_column_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_two_column_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_two_column_3_design_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_two_column_3_design_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_two_column_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_two_column_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_gallery_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_gallery_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_gallery_3_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_gallery_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_video_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_video_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_video_3_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_video_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_video_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_team_3_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'instagram', 'website');
  CREATE TYPE "public"."enum_pages_blocks_team_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_team_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_team_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_team_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_team_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_items_type" AS ENUM('text', 'image');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_design_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_design_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_marquee_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_spacer_3_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_spacer_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_spacer_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_3_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_pricing_3_plans_period" AS ENUM('monthly', 'yearly', 'one-time');
  CREATE TYPE "public"."enum_pages_blocks_pricing_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_pricing_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_pricing_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_pricing_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_pricing_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_banner_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_banner_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_banner_3_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum_pages_blocks_banner_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_banner_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_faq_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_faq_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_faq_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_faq_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_blocks_accordion_nested_3_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum_pages_blocks_accordion_nested_3_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_3_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_3_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_3_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_nested_3_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_stats_nested_3_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_stats_nested_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_nested_3_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_nested_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_video_nested_3_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_banner_nested_3_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_gap" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_vertical_alignment" AS ENUM('start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_design_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum_pages_blocks_columns_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum_pages_type" AS ENUM('standard', 'dynamic');
  CREATE TYPE "public"."enum_pages_dynamic_collection" AS ENUM('articles');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_html_tag" AS ENUM('section', 'div');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_type" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_base" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_xs" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_sm" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_md" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_lg" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_xl" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_sort" AS ENUM('-publishedDate', 'publishedDate', 'title', '-title');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_design_layout" AS ENUM('contentLeft', 'contentRight', 'contentCenter', 'overlay');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_features_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_features_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_features_design_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_features_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_features_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_features_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_design_layout" AS ENUM('grid', 'carousel', 'single');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_design_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_design_layout" AS ENUM('grid', 'marquee');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_design_columns" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_design_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_design_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_video_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_video_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_video_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_video_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_video_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_team_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'instagram', 'website');
  CREATE TYPE "public"."enum__pages_v_blocks_team_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_team_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_team_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_team_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_team_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_items_type" AS ENUM('text', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_design_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_design_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_plans_period" AS ENUM('monthly', 'yearly', 'one-time');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_nested_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_nested_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_nested_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_nested_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_nested_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_nested_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_video_nested_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_nested_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_nested_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_nested_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_gap" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_vertical_alignment" AS ENUM('start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_design_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_2_settings_html_tag" AS ENUM('section', 'div');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_type" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_base" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_xs" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_sm" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_md" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_lg" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_xl" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_2_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_2_sort" AS ENUM('-publishedDate', 'publishedDate', 'title', '-title');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_design_layout" AS ENUM('contentLeft', 'contentRight', 'contentCenter', 'overlay');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_features_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_features_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_features_2_design_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_features_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_features_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_features_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_2_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_2_design_layout" AS ENUM('grid', 'carousel', 'single');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_2_design_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_layout" AS ENUM('grid', 'marquee');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_columns" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_2_design_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_2_design_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_2_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_video_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_video_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_video_2_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_video_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_video_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_team_2_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'instagram', 'website');
  CREATE TYPE "public"."enum__pages_v_blocks_team_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_team_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_team_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_team_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_team_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_items_type" AS ENUM('text', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_design_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_design_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_2_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_2_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_2_plans_period" AS ENUM('monthly', 'yearly', 'one-time');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_2_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_nested_2_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_nested_2_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_nested_2_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_nested_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_nested_2_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_nested_2_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_video_nested_2_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_nested_2_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_gap" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_vertical_alignment" AS ENUM('start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_design_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_2_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_3_settings_html_tag" AS ENUM('section', 'div');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_type" AS ENUM('preset', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_base" AS ENUM('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_xs" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_sm" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_md" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_lg" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_xl" AS ENUM('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fullwidth');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_3_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_3_sort" AS ENUM('-publishedDate', 'publishedDate', 'title', '-title');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_article_listing_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_design_layout" AS ENUM('contentLeft', 'contentRight', 'contentCenter', 'overlay');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_features_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_features_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_features_3_design_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_features_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_features_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_features_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_3_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_3_design_layout" AS ENUM('grid', 'carousel', 'single');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_3_design_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_layout" AS ENUM('grid', 'marquee');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_columns" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_3_design_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_3_design_vertical_alignment" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_3_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_video_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_video_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_video_3_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_video_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_video_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_team_3_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'instagram', 'website');
  CREATE TYPE "public"."enum__pages_v_blocks_team_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_team_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_team_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_team_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_team_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_items_type" AS ENUM('text', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_design_speed" AS ENUM('slow', 'normal', 'fast');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_design_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_3_height" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_3_fields_field_type" AS ENUM('text', 'email', 'tel', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_3_plans_period" AS ENUM('monthly', 'yearly', 'one-time');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_3_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_nested_3_design_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_nested_3_design_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_links_link_appearance" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_links_link_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_design_background" AS ENUM('default', 'muted', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_design_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_nested_3_design_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_nested_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_nested_3_design_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_nested_3_design_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_video_nested_3_design_aspect_ratio" AS ENUM('16/9', '4/3', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_nested_3_design_type" AS ENUM('info', 'warning', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_spacing" AS ENUM('none', 'xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_spacing_type" AS ENUM('margin', 'padding');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_gap" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_vertical_alignment" AS ENUM('start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_align_self" AS ENUM('auto', 'start', 'center', 'end', 'stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_width_base" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_width_xs" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_width_sm" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_width_md" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_width_lg" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_design_width_xl" AS ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_settings_html_tag" AS ENUM('div', 'section', 'article');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_3_settings_container_type" AS ENUM('none', 'default', 'post');
  CREATE TYPE "public"."enum__pages_v_version_type" AS ENUM('standard', 'dynamic');
  CREATE TYPE "public"."enum__pages_v_version_dynamic_collection" AS ENUM('articles');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_accounts_type" AS ENUM('checking', 'savings', 'credit', 'cash', 'investment');
  CREATE TYPE "public"."enum_accounts_currency" AS ENUM('USD', 'EUR', 'GBP', 'COP');
  CREATE TYPE "public"."enum_accounts_status" AS ENUM('active', 'deleted');
  CREATE TYPE "public"."enum_budgets_status" AS ENUM('active', 'deleted');
  CREATE TYPE "public"."enum_budgets_recurrence_type" AS ENUM('monthly', 'fixed', 'indefinite');
  CREATE TYPE "public"."enum_categories_type" AS ENUM('income', 'expense', 'transfer');
  CREATE TYPE "public"."enum_members_currency" AS ENUM('USD', 'EUR', 'GBP', 'COP');
  CREATE TYPE "public"."enum_scheduled_transactions_frequency" AS ENUM('weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_transactions_type" AS ENUM('income', 'expense', 'transfer');
  CREATE TYPE "public"."enum_transactions_status" AS ENUM('active', 'deleted');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'user');
  CREATE TYPE "public"."enum_invitation_codes_status" AS ENUM('available', 'used');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_footer_navigation_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_contact_social_links_platform" AS ENUM('facebook', 'youtube', 'x', 'instagram', 'linkedin', 'mail');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_general_settings_typography_heading_font" AS ENUM('Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Nunito', 'Playfair Display', 'Merriweather', 'Source Sans 3', 'PT Sans', 'Noto Sans', 'Ubuntu', 'Rubik', 'Work Sans', 'DM Sans', 'Libre Baskerville', 'Crimson Text', 'IBM Plex Sans', 'IBM Plex Serif', 'IBM Plex Mono', 'Fira Sans', 'Outfit', 'Space Grotesk', 'Manrope', 'Plus Jakarta Sans', 'Geist', 'Geist Mono', 'JetBrains Mono');
  CREATE TYPE "public"."enum_general_settings_typography_body_font" AS ENUM('Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Nunito', 'Playfair Display', 'Merriweather', 'Source Sans 3', 'PT Sans', 'Noto Sans', 'Ubuntu', 'Rubik', 'Work Sans', 'DM Sans', 'Libre Baskerville', 'Crimson Text', 'IBM Plex Sans', 'IBM Plex Serif', 'IBM Plex Mono', 'Fira Sans', 'Outfit', 'Space Grotesk', 'Manrope', 'Plus Jakarta Sans', 'Geist', 'Geist Mono', 'JetBrains Mono');
  CREATE TYPE "public"."enum_header_nav_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_logo_type" AS ENUM('none', 'image', 'text');
  CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "articles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"published_date" timestamp(3) with time zone,
  	"pathname" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"featured_image_id" uuid,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"tags_id" uuid
  );
  
  CREATE TABLE "_articles_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_pathname" varchar,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" uuid,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"tags_id" uuid
  );
  
  CREATE TABLE "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar
  );
  
  CREATE TABLE "media_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"design_spacing" "enum_pages_blocks_rich_text_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_rich_text_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_rich_text_settings_html_tag" DEFAULT 'div',
  	"settings_container_type" "enum_pages_blocks_rich_text_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_spacing" "enum_pages_blocks_accordion_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_accordion_design_spacing_type" DEFAULT 'padding',
  	"design_accordion_type" "enum_pages_blocks_accordion_design_accordion_type" DEFAULT 'single',
  	"design_width_type" "enum_pages_blocks_accordion_design_width_type" DEFAULT 'preset',
  	"design_width_preset_base" "enum_pages_blocks_accordion_design_width_preset_base" DEFAULT 'lg',
  	"design_width_preset_xs" "enum_pages_blocks_accordion_design_width_preset_xs" DEFAULT '',
  	"design_width_preset_sm" "enum_pages_blocks_accordion_design_width_preset_sm" DEFAULT '',
  	"design_width_preset_md" "enum_pages_blocks_accordion_design_width_preset_md" DEFAULT '',
  	"design_width_preset_lg" "enum_pages_blocks_accordion_design_width_preset_lg" DEFAULT '',
  	"design_width_preset_xl" "enum_pages_blocks_accordion_design_width_preset_xl" DEFAULT '',
  	"design_width_custom_base" numeric,
  	"design_width_custom_xs" numeric,
  	"design_width_custom_sm" numeric,
  	"design_width_custom_md" numeric,
  	"design_width_custom_lg" numeric,
  	"design_width_custom_xl" numeric,
  	"design_alignment" "enum_pages_blocks_accordion_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_accordion_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_accordion_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_article_listing" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 12,
  	"columns" "enum_pages_blocks_article_listing_columns" DEFAULT '3',
  	"sort" "enum_pages_blocks_article_listing_sort" DEFAULT '-publishedDate',
  	"show_pagination" boolean DEFAULT true,
  	"design_spacing" "enum_pages_blocks_article_listing_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_article_listing_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_article_listing_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_article_listing_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_hero_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum_pages_blocks_hero_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_hero_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_hero_design_layout" DEFAULT 'contentLeft',
  	"settings_html_tag" "enum_pages_blocks_hero_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_hero_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_features_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_features_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_features_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_features_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_features_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_features_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_section_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_section_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_section_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_cta_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_spacing" "enum_pages_blocks_cta_section_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_cta_section_design_spacing_type" DEFAULT 'padding',
  	"design_background" "enum_pages_blocks_cta_section_design_background" DEFAULT 'default',
  	"design_alignment" "enum_pages_blocks_cta_section_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_cta_section_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_cta_section_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_stats_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_stats_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_stats_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_stats_design_columns" DEFAULT '4',
  	"settings_html_tag" "enum_pages_blocks_stats_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_stats_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"author_avatar_id" uuid
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_testimonials_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_testimonials_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_testimonials_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_testimonials_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_testimonials_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_testimonials_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_logo_cloud_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_logo_cloud_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_logo_cloud_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_logo_cloud_design_columns" DEFAULT '5',
  	"settings_html_tag" "enum_pages_blocks_logo_cloud_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_logo_cloud_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum_pages_blocks_two_column_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_two_column_design_spacing_type" DEFAULT 'padding',
  	"design_media_position" "enum_pages_blocks_two_column_design_media_position" DEFAULT 'right',
  	"design_vertical_alignment" "enum_pages_blocks_two_column_design_vertical_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_two_column_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_two_column_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_gallery_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_gallery_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_gallery_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_gallery_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"settings_html_tag" "enum_pages_blocks_gallery_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_gallery_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_spacing" "enum_pages_blocks_video_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_video_design_spacing_type" DEFAULT 'padding',
  	"design_aspect_ratio" "enum_pages_blocks_video_design_aspect_ratio" DEFAULT '16/9',
  	"settings_html_tag" "enum_pages_blocks_video_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_video_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_team_members_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" jsonb,
  	"photo_id" uuid
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_team_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_team_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum_pages_blocks_team_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_team_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_team_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_marquee_items_type" DEFAULT 'text',
  	"text" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_spacing" "enum_pages_blocks_marquee_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_marquee_design_spacing_type" DEFAULT 'padding',
  	"design_speed" "enum_pages_blocks_marquee_design_speed" DEFAULT 'normal',
  	"design_direction" "enum_pages_blocks_marquee_design_direction" DEFAULT 'ltr',
  	"design_pause_on_hover" boolean DEFAULT true,
  	"settings_html_tag" "enum_pages_blocks_marquee_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_marquee_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_blocks_spacer_height" DEFAULT 'md',
  	"design_spacing" "enum_pages_blocks_spacer_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_spacer_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_spacer_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_spacer_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"field_type" "enum_pages_blocks_contact_form_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"design_spacing" "enum_pages_blocks_contact_form_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_contact_form_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_contact_form_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_contact_form_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" "enum_pages_blocks_pricing_plans_period" DEFAULT 'monthly',
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_link" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_pricing_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_pricing_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum_pages_blocks_pricing_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_pricing_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_pricing_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"design_spacing" "enum_pages_blocks_banner_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_banner_design_spacing_type" DEFAULT 'padding',
  	"design_type" "enum_pages_blocks_banner_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"settings_html_tag" "enum_pages_blocks_banner_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_banner_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_faq_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_faq_design_spacing_type" DEFAULT 'padding',
  	"design_allow_multiple" boolean DEFAULT false,
  	"settings_html_tag" "enum_pages_blocks_faq_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_faq_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_nested_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_accordion_type" "enum_pages_blocks_accordion_nested_design_accordion_type" DEFAULT 'single',
  	"design_alignment" "enum_pages_blocks_accordion_nested_design_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section_nested_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_section_nested_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_section_nested_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_section_nested_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_cta_section_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_background" "enum_pages_blocks_cta_section_nested_design_background" DEFAULT 'default',
  	"design_alignment" "enum_pages_blocks_cta_section_nested_design_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_nested_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum_pages_blocks_stats_nested_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_stats_nested_design_columns" DEFAULT '4',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_nested_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum_pages_blocks_gallery_nested_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_gallery_nested_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_aspect_ratio" "enum_pages_blocks_video_nested_design_aspect_ratio" DEFAULT '16/9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_blocks_spacer_nested_height" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"field_type" "enum_pages_blocks_contact_form_nested_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"design_type" "enum_pages_blocks_banner_nested_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_nested_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_allow_multiple" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_align_self" "enum_pages_blocks_columns_columns_settings_align_self" DEFAULT 'auto',
  	"settings_width_base" "enum_pages_blocks_columns_columns_settings_width_base" DEFAULT '12',
  	"settings_width_xs" "enum_pages_blocks_columns_columns_settings_width_xs",
  	"settings_width_sm" "enum_pages_blocks_columns_columns_settings_width_sm",
  	"settings_width_md" "enum_pages_blocks_columns_columns_settings_width_md",
  	"settings_width_lg" "enum_pages_blocks_columns_columns_settings_width_lg",
  	"settings_width_xl" "enum_pages_blocks_columns_columns_settings_width_xl"
  );
  
  CREATE TABLE "pages_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" jsonb,
  	"suffix" jsonb,
  	"design_spacing" "enum_pages_blocks_columns_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_columns_design_spacing_type" DEFAULT 'padding',
  	"design_gap" "enum_pages_blocks_columns_design_gap" DEFAULT 'md',
  	"design_vertical_alignment" "enum_pages_blocks_columns_design_vertical_alignment",
  	"design_advanced_column_settings" boolean DEFAULT false,
  	"design_align_self" "enum_pages_blocks_columns_design_align_self",
  	"design_width_base" "enum_pages_blocks_columns_design_width_base" DEFAULT '12',
  	"design_width_xs" "enum_pages_blocks_columns_design_width_xs",
  	"design_width_sm" "enum_pages_blocks_columns_design_width_sm",
  	"design_width_md" "enum_pages_blocks_columns_design_width_md",
  	"design_width_lg" "enum_pages_blocks_columns_design_width_lg",
  	"design_width_xl" "enum_pages_blocks_columns_design_width_xl",
  	"settings_html_tag" "enum_pages_blocks_columns_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_columns_settings_container_type" DEFAULT 'default',
  	"settings_with_prefix" boolean DEFAULT true,
  	"settings_with_suffix" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"design_spacing" "enum_pages_blocks_rich_text_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_rich_text_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_rich_text_2_settings_html_tag" DEFAULT 'div',
  	"settings_container_type" "enum_pages_blocks_rich_text_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_spacing" "enum_pages_blocks_accordion_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_accordion_2_design_spacing_type" DEFAULT 'padding',
  	"design_accordion_type" "enum_pages_blocks_accordion_2_design_accordion_type" DEFAULT 'single',
  	"design_width_type" "enum_pages_blocks_accordion_2_design_width_type" DEFAULT 'preset',
  	"design_width_preset_base" "enum_pages_blocks_accordion_2_design_width_preset_base" DEFAULT 'lg',
  	"design_width_preset_xs" "enum_pages_blocks_accordion_2_design_width_preset_xs" DEFAULT '',
  	"design_width_preset_sm" "enum_pages_blocks_accordion_2_design_width_preset_sm" DEFAULT '',
  	"design_width_preset_md" "enum_pages_blocks_accordion_2_design_width_preset_md" DEFAULT '',
  	"design_width_preset_lg" "enum_pages_blocks_accordion_2_design_width_preset_lg" DEFAULT '',
  	"design_width_preset_xl" "enum_pages_blocks_accordion_2_design_width_preset_xl" DEFAULT '',
  	"design_width_custom_base" numeric,
  	"design_width_custom_xs" numeric,
  	"design_width_custom_sm" numeric,
  	"design_width_custom_md" numeric,
  	"design_width_custom_lg" numeric,
  	"design_width_custom_xl" numeric,
  	"design_alignment" "enum_pages_blocks_accordion_2_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_accordion_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_accordion_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_article_listing_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 12,
  	"columns" "enum_pages_blocks_article_listing_2_columns" DEFAULT '3',
  	"sort" "enum_pages_blocks_article_listing_2_sort" DEFAULT '-publishedDate',
  	"show_pagination" boolean DEFAULT true,
  	"design_spacing" "enum_pages_blocks_article_listing_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_article_listing_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_article_listing_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_article_listing_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_2_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_hero_2_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_hero_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum_pages_blocks_hero_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_hero_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_hero_2_design_layout" DEFAULT 'contentLeft',
  	"settings_html_tag" "enum_pages_blocks_hero_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_hero_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "pages_blocks_features_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_features_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_features_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_features_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_features_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_features_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_features_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section_2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_section_2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_section_2_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_section_2_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_cta_section_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_spacing" "enum_pages_blocks_cta_section_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_cta_section_2_design_spacing_type" DEFAULT 'padding',
  	"design_background" "enum_pages_blocks_cta_section_2_design_background" DEFAULT 'default',
  	"design_alignment" "enum_pages_blocks_cta_section_2_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_cta_section_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_cta_section_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_stats_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_stats_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_stats_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_stats_2_design_columns" DEFAULT '4',
  	"settings_html_tag" "enum_pages_blocks_stats_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_stats_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"author_avatar_id" uuid
  );
  
  CREATE TABLE "pages_blocks_testimonials_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_testimonials_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_testimonials_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_testimonials_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_testimonials_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_testimonials_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_testimonials_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_2_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_logo_cloud_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_logo_cloud_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_logo_cloud_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_logo_cloud_2_design_columns" DEFAULT '5',
  	"settings_html_tag" "enum_pages_blocks_logo_cloud_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_logo_cloud_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum_pages_blocks_two_column_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_two_column_2_design_spacing_type" DEFAULT 'padding',
  	"design_media_position" "enum_pages_blocks_two_column_2_design_media_position" DEFAULT 'right',
  	"design_vertical_alignment" "enum_pages_blocks_two_column_2_design_vertical_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_two_column_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_two_column_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_2_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_gallery_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_gallery_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_gallery_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_gallery_2_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"settings_html_tag" "enum_pages_blocks_gallery_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_gallery_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_spacing" "enum_pages_blocks_video_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_video_2_design_spacing_type" DEFAULT 'padding',
  	"design_aspect_ratio" "enum_pages_blocks_video_2_design_aspect_ratio" DEFAULT '16/9',
  	"settings_html_tag" "enum_pages_blocks_video_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_video_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_2_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_team_2_members_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_2_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" jsonb,
  	"photo_id" uuid
  );
  
  CREATE TABLE "pages_blocks_team_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_team_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_team_2_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum_pages_blocks_team_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_team_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_team_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_marquee_2_items_type" DEFAULT 'text',
  	"text" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "pages_blocks_marquee_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_spacing" "enum_pages_blocks_marquee_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_marquee_2_design_spacing_type" DEFAULT 'padding',
  	"design_speed" "enum_pages_blocks_marquee_2_design_speed" DEFAULT 'normal',
  	"design_direction" "enum_pages_blocks_marquee_2_design_direction" DEFAULT 'ltr',
  	"design_pause_on_hover" boolean DEFAULT true,
  	"settings_html_tag" "enum_pages_blocks_marquee_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_marquee_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_blocks_spacer_2_height" DEFAULT 'md',
  	"design_spacing" "enum_pages_blocks_spacer_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_spacer_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_spacer_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_spacer_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_2_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_2_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"field_type" "enum_pages_blocks_contact_form_2_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"design_spacing" "enum_pages_blocks_contact_form_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_contact_form_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_contact_form_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_contact_form_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_2_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_2_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" "enum_pages_blocks_pricing_2_plans_period" DEFAULT 'monthly',
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_link" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_pricing_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_pricing_2_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum_pages_blocks_pricing_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_pricing_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_pricing_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"design_spacing" "enum_pages_blocks_banner_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_banner_2_design_spacing_type" DEFAULT 'padding',
  	"design_type" "enum_pages_blocks_banner_2_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"settings_html_tag" "enum_pages_blocks_banner_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_banner_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_faq_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_faq_2_design_spacing_type" DEFAULT 'padding',
  	"design_allow_multiple" boolean DEFAULT false,
  	"settings_html_tag" "enum_pages_blocks_faq_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_faq_2_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_nested_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_accordion_type" "enum_pages_blocks_accordion_nested_2_design_accordion_type" DEFAULT 'single',
  	"design_alignment" "enum_pages_blocks_accordion_nested_2_design_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section_nested_2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_section_nested_2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_section_nested_2_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_section_nested_2_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_cta_section_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_background" "enum_pages_blocks_cta_section_nested_2_design_background" DEFAULT 'default',
  	"design_alignment" "enum_pages_blocks_cta_section_nested_2_design_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_nested_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum_pages_blocks_stats_nested_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_stats_nested_2_design_columns" DEFAULT '4',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_nested_2_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum_pages_blocks_gallery_nested_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_gallery_nested_2_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_aspect_ratio" "enum_pages_blocks_video_nested_2_design_aspect_ratio" DEFAULT '16/9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"design_type" "enum_pages_blocks_banner_nested_2_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_nested_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_allow_multiple" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_columns_2_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_align_self" "enum_pages_blocks_columns_2_columns_settings_align_self" DEFAULT 'auto',
  	"settings_width_base" "enum_pages_blocks_columns_2_columns_settings_width_base" DEFAULT '12',
  	"settings_width_xs" "enum_pages_blocks_columns_2_columns_settings_width_xs",
  	"settings_width_sm" "enum_pages_blocks_columns_2_columns_settings_width_sm",
  	"settings_width_md" "enum_pages_blocks_columns_2_columns_settings_width_md",
  	"settings_width_lg" "enum_pages_blocks_columns_2_columns_settings_width_lg",
  	"settings_width_xl" "enum_pages_blocks_columns_2_columns_settings_width_xl"
  );
  
  CREATE TABLE "pages_blocks_columns_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" jsonb,
  	"suffix" jsonb,
  	"design_spacing" "enum_pages_blocks_columns_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_columns_2_design_spacing_type" DEFAULT 'padding',
  	"design_gap" "enum_pages_blocks_columns_2_design_gap" DEFAULT 'md',
  	"design_vertical_alignment" "enum_pages_blocks_columns_2_design_vertical_alignment",
  	"design_advanced_column_settings" boolean DEFAULT false,
  	"design_align_self" "enum_pages_blocks_columns_2_design_align_self",
  	"design_width_base" "enum_pages_blocks_columns_2_design_width_base" DEFAULT '12',
  	"design_width_xs" "enum_pages_blocks_columns_2_design_width_xs",
  	"design_width_sm" "enum_pages_blocks_columns_2_design_width_sm",
  	"design_width_md" "enum_pages_blocks_columns_2_design_width_md",
  	"design_width_lg" "enum_pages_blocks_columns_2_design_width_lg",
  	"design_width_xl" "enum_pages_blocks_columns_2_design_width_xl",
  	"settings_html_tag" "enum_pages_blocks_columns_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_columns_2_settings_container_type" DEFAULT 'default',
  	"settings_with_prefix" boolean DEFAULT true,
  	"settings_with_suffix" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"design_spacing" "enum_pages_blocks_rich_text_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_rich_text_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_rich_text_3_settings_html_tag" DEFAULT 'div',
  	"settings_container_type" "enum_pages_blocks_rich_text_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_spacing" "enum_pages_blocks_accordion_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_accordion_3_design_spacing_type" DEFAULT 'padding',
  	"design_accordion_type" "enum_pages_blocks_accordion_3_design_accordion_type" DEFAULT 'single',
  	"design_width_type" "enum_pages_blocks_accordion_3_design_width_type" DEFAULT 'preset',
  	"design_width_preset_base" "enum_pages_blocks_accordion_3_design_width_preset_base" DEFAULT 'lg',
  	"design_width_preset_xs" "enum_pages_blocks_accordion_3_design_width_preset_xs" DEFAULT '',
  	"design_width_preset_sm" "enum_pages_blocks_accordion_3_design_width_preset_sm" DEFAULT '',
  	"design_width_preset_md" "enum_pages_blocks_accordion_3_design_width_preset_md" DEFAULT '',
  	"design_width_preset_lg" "enum_pages_blocks_accordion_3_design_width_preset_lg" DEFAULT '',
  	"design_width_preset_xl" "enum_pages_blocks_accordion_3_design_width_preset_xl" DEFAULT '',
  	"design_width_custom_base" numeric,
  	"design_width_custom_xs" numeric,
  	"design_width_custom_sm" numeric,
  	"design_width_custom_md" numeric,
  	"design_width_custom_lg" numeric,
  	"design_width_custom_xl" numeric,
  	"design_alignment" "enum_pages_blocks_accordion_3_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_accordion_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_accordion_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_article_listing_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 12,
  	"columns" "enum_pages_blocks_article_listing_3_columns" DEFAULT '3',
  	"sort" "enum_pages_blocks_article_listing_3_sort" DEFAULT '-publishedDate',
  	"show_pagination" boolean DEFAULT true,
  	"design_spacing" "enum_pages_blocks_article_listing_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_article_listing_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_article_listing_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_article_listing_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_3_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_hero_3_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_hero_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum_pages_blocks_hero_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_hero_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_hero_3_design_layout" DEFAULT 'contentLeft',
  	"settings_html_tag" "enum_pages_blocks_hero_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_hero_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "pages_blocks_features_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_features_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_features_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_features_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_features_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_features_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_features_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section_3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_section_3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_section_3_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_section_3_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_cta_section_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_spacing" "enum_pages_blocks_cta_section_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_cta_section_3_design_spacing_type" DEFAULT 'padding',
  	"design_background" "enum_pages_blocks_cta_section_3_design_background" DEFAULT 'default',
  	"design_alignment" "enum_pages_blocks_cta_section_3_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_cta_section_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_cta_section_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_stats_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_stats_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_stats_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_stats_3_design_columns" DEFAULT '4',
  	"settings_html_tag" "enum_pages_blocks_stats_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_stats_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"author_avatar_id" uuid
  );
  
  CREATE TABLE "pages_blocks_testimonials_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_testimonials_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_testimonials_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_testimonials_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_testimonials_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_testimonials_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_testimonials_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_3_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_logo_cloud_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_logo_cloud_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_logo_cloud_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_logo_cloud_3_design_columns" DEFAULT '5',
  	"settings_html_tag" "enum_pages_blocks_logo_cloud_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_logo_cloud_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum_pages_blocks_two_column_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_two_column_3_design_spacing_type" DEFAULT 'padding',
  	"design_media_position" "enum_pages_blocks_two_column_3_design_media_position" DEFAULT 'right',
  	"design_vertical_alignment" "enum_pages_blocks_two_column_3_design_vertical_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum_pages_blocks_two_column_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_two_column_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_3_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_gallery_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_gallery_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum_pages_blocks_gallery_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_gallery_3_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"settings_html_tag" "enum_pages_blocks_gallery_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_gallery_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_spacing" "enum_pages_blocks_video_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_video_3_design_spacing_type" DEFAULT 'padding',
  	"design_aspect_ratio" "enum_pages_blocks_video_3_design_aspect_ratio" DEFAULT '16/9',
  	"settings_html_tag" "enum_pages_blocks_video_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_video_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_3_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_team_3_members_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_3_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" jsonb,
  	"photo_id" uuid
  );
  
  CREATE TABLE "pages_blocks_team_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_team_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_team_3_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum_pages_blocks_team_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_team_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_team_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_marquee_3_items_type" DEFAULT 'text',
  	"text" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "pages_blocks_marquee_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_spacing" "enum_pages_blocks_marquee_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_marquee_3_design_spacing_type" DEFAULT 'padding',
  	"design_speed" "enum_pages_blocks_marquee_3_design_speed" DEFAULT 'normal',
  	"design_direction" "enum_pages_blocks_marquee_3_design_direction" DEFAULT 'ltr',
  	"design_pause_on_hover" boolean DEFAULT true,
  	"settings_html_tag" "enum_pages_blocks_marquee_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_marquee_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_blocks_spacer_3_height" DEFAULT 'md',
  	"design_spacing" "enum_pages_blocks_spacer_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_spacer_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_spacer_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_spacer_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_3_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_3_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"field_type" "enum_pages_blocks_contact_form_3_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"design_spacing" "enum_pages_blocks_contact_form_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_contact_form_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum_pages_blocks_contact_form_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_contact_form_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_3_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_3_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" "enum_pages_blocks_pricing_3_plans_period" DEFAULT 'monthly',
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_link" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_pricing_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_pricing_3_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum_pages_blocks_pricing_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum_pages_blocks_pricing_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_pricing_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"design_spacing" "enum_pages_blocks_banner_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_banner_3_design_spacing_type" DEFAULT 'padding',
  	"design_type" "enum_pages_blocks_banner_3_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"settings_html_tag" "enum_pages_blocks_banner_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_banner_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum_pages_blocks_faq_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_faq_3_design_spacing_type" DEFAULT 'padding',
  	"design_allow_multiple" boolean DEFAULT false,
  	"settings_html_tag" "enum_pages_blocks_faq_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_faq_3_settings_container_type" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_nested_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"design_accordion_type" "enum_pages_blocks_accordion_nested_3_design_accordion_type" DEFAULT 'single',
  	"design_alignment" "enum_pages_blocks_accordion_nested_3_design_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section_nested_3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_section_nested_3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_section_nested_3_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_section_nested_3_links_link_size" DEFAULT 'md'
  );
  
  CREATE TABLE "pages_blocks_cta_section_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_background" "enum_pages_blocks_cta_section_nested_3_design_background" DEFAULT 'default',
  	"design_alignment" "enum_pages_blocks_cta_section_nested_3_design_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_nested_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum_pages_blocks_stats_nested_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_stats_nested_3_design_columns" DEFAULT '4',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_nested_3_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum_pages_blocks_gallery_nested_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum_pages_blocks_gallery_nested_3_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_aspect_ratio" "enum_pages_blocks_video_nested_3_design_aspect_ratio" DEFAULT '16/9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"design_type" "enum_pages_blocks_banner_nested_3_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_nested_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_allow_multiple" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_columns_3_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_align_self" "enum_pages_blocks_columns_3_columns_settings_align_self" DEFAULT 'auto',
  	"settings_width_base" "enum_pages_blocks_columns_3_columns_settings_width_base" DEFAULT '12',
  	"settings_width_xs" "enum_pages_blocks_columns_3_columns_settings_width_xs",
  	"settings_width_sm" "enum_pages_blocks_columns_3_columns_settings_width_sm",
  	"settings_width_md" "enum_pages_blocks_columns_3_columns_settings_width_md",
  	"settings_width_lg" "enum_pages_blocks_columns_3_columns_settings_width_lg",
  	"settings_width_xl" "enum_pages_blocks_columns_3_columns_settings_width_xl"
  );
  
  CREATE TABLE "pages_blocks_columns_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" jsonb,
  	"suffix" jsonb,
  	"design_spacing" "enum_pages_blocks_columns_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum_pages_blocks_columns_3_design_spacing_type" DEFAULT 'padding',
  	"design_gap" "enum_pages_blocks_columns_3_design_gap" DEFAULT 'md',
  	"design_vertical_alignment" "enum_pages_blocks_columns_3_design_vertical_alignment",
  	"design_advanced_column_settings" boolean DEFAULT false,
  	"design_align_self" "enum_pages_blocks_columns_3_design_align_self",
  	"design_width_base" "enum_pages_blocks_columns_3_design_width_base" DEFAULT '12',
  	"design_width_xs" "enum_pages_blocks_columns_3_design_width_xs",
  	"design_width_sm" "enum_pages_blocks_columns_3_design_width_sm",
  	"design_width_md" "enum_pages_blocks_columns_3_design_width_md",
  	"design_width_lg" "enum_pages_blocks_columns_3_design_width_lg",
  	"design_width_xl" "enum_pages_blocks_columns_3_design_width_xl",
  	"settings_html_tag" "enum_pages_blocks_columns_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum_pages_blocks_columns_3_settings_container_type" DEFAULT 'default',
  	"settings_with_prefix" boolean DEFAULT true,
  	"settings_with_suffix" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"is_home" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"pathname" varchar,
  	"type" "enum_pages_type" DEFAULT 'standard',
  	"dynamic_collection" "enum_pages_dynamic_collection" DEFAULT 'articles',
  	"settings_query_where" jsonb,
  	"parent_id" uuid,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" uuid,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"data" jsonb,
  	"design_spacing" "enum__pages_v_blocks_rich_text_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_rich_text_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_rich_text_settings_html_tag" DEFAULT 'div',
  	"settings_container_type" "enum__pages_v_blocks_rich_text_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_spacing" "enum__pages_v_blocks_accordion_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_accordion_design_spacing_type" DEFAULT 'padding',
  	"design_accordion_type" "enum__pages_v_blocks_accordion_design_accordion_type" DEFAULT 'single',
  	"design_width_type" "enum__pages_v_blocks_accordion_design_width_type" DEFAULT 'preset',
  	"design_width_preset_base" "enum__pages_v_blocks_accordion_design_width_preset_base" DEFAULT 'lg',
  	"design_width_preset_xs" "enum__pages_v_blocks_accordion_design_width_preset_xs" DEFAULT '',
  	"design_width_preset_sm" "enum__pages_v_blocks_accordion_design_width_preset_sm" DEFAULT '',
  	"design_width_preset_md" "enum__pages_v_blocks_accordion_design_width_preset_md" DEFAULT '',
  	"design_width_preset_lg" "enum__pages_v_blocks_accordion_design_width_preset_lg" DEFAULT '',
  	"design_width_preset_xl" "enum__pages_v_blocks_accordion_design_width_preset_xl" DEFAULT '',
  	"design_width_custom_base" numeric,
  	"design_width_custom_xs" numeric,
  	"design_width_custom_sm" numeric,
  	"design_width_custom_md" numeric,
  	"design_width_custom_lg" numeric,
  	"design_width_custom_xl" numeric,
  	"design_alignment" "enum__pages_v_blocks_accordion_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_accordion_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_accordion_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_listing" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"limit" numeric DEFAULT 12,
  	"columns" "enum__pages_v_blocks_article_listing_columns" DEFAULT '3',
  	"sort" "enum__pages_v_blocks_article_listing_sort" DEFAULT '-publishedDate',
  	"show_pagination" boolean DEFAULT true,
  	"design_spacing" "enum__pages_v_blocks_article_listing_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_article_listing_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_article_listing_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_article_listing_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_hero_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_hero_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_hero_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_hero_design_layout" DEFAULT 'contentLeft',
  	"settings_html_tag" "enum__pages_v_blocks_hero_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_hero_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_features_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_features_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_features_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_features_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_features_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_features_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_section_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_section_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_section_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_spacing" "enum__pages_v_blocks_cta_section_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_cta_section_design_spacing_type" DEFAULT 'padding',
  	"design_background" "enum__pages_v_blocks_cta_section_design_background" DEFAULT 'default',
  	"design_alignment" "enum__pages_v_blocks_cta_section_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_cta_section_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_cta_section_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_stats_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_stats_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_stats_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_stats_design_columns" DEFAULT '4',
  	"settings_html_tag" "enum__pages_v_blocks_stats_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_stats_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"quote" jsonb,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"author_avatar_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_testimonials_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_testimonials_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_testimonials_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_testimonials_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_testimonials_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_testimonials_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_logo_cloud_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_logo_cloud_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_logo_cloud_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_logo_cloud_design_columns" DEFAULT '5',
  	"settings_html_tag" "enum__pages_v_blocks_logo_cloud_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_logo_cloud_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_two_column_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_two_column_design_spacing_type" DEFAULT 'padding',
  	"design_media_position" "enum__pages_v_blocks_two_column_design_media_position" DEFAULT 'right',
  	"design_vertical_alignment" "enum__pages_v_blocks_two_column_design_vertical_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_two_column_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_two_column_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_gallery_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_gallery_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_gallery_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_gallery_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"settings_html_tag" "enum__pages_v_blocks_gallery_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_gallery_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_video_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_video_design_spacing_type" DEFAULT 'padding',
  	"design_aspect_ratio" "enum__pages_v_blocks_video_design_aspect_ratio" DEFAULT '16/9',
  	"settings_html_tag" "enum__pages_v_blocks_video_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_video_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"platform" "enum__pages_v_blocks_team_members_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" jsonb,
  	"photo_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_team_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_team_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum__pages_v_blocks_team_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_team_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_team_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum__pages_v_blocks_marquee_items_type" DEFAULT 'text',
  	"text" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_spacing" "enum__pages_v_blocks_marquee_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_marquee_design_spacing_type" DEFAULT 'padding',
  	"design_speed" "enum__pages_v_blocks_marquee_design_speed" DEFAULT 'normal',
  	"design_direction" "enum__pages_v_blocks_marquee_design_direction" DEFAULT 'ltr',
  	"design_pause_on_hover" boolean DEFAULT true,
  	"settings_html_tag" "enum__pages_v_blocks_marquee_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_marquee_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"height" "enum__pages_v_blocks_spacer_height" DEFAULT 'md',
  	"design_spacing" "enum__pages_v_blocks_spacer_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_spacer_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_spacer_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_spacer_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"field_type" "enum__pages_v_blocks_contact_form_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"design_spacing" "enum__pages_v_blocks_contact_form_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_contact_form_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_contact_form_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_contact_form_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" "enum__pages_v_blocks_pricing_plans_period" DEFAULT 'monthly',
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_link" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_pricing_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_pricing_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum__pages_v_blocks_pricing_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_pricing_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_pricing_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb,
  	"design_spacing" "enum__pages_v_blocks_banner_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_banner_design_spacing_type" DEFAULT 'padding',
  	"design_type" "enum__pages_v_blocks_banner_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"settings_html_tag" "enum__pages_v_blocks_banner_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_banner_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_faq_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_faq_design_spacing_type" DEFAULT 'padding',
  	"design_allow_multiple" boolean DEFAULT false,
  	"settings_html_tag" "enum__pages_v_blocks_faq_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_faq_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_nested_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_accordion_type" "enum__pages_v_blocks_accordion_nested_design_accordion_type" DEFAULT 'single',
  	"design_alignment" "enum__pages_v_blocks_accordion_nested_design_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_nested_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_section_nested_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_section_nested_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_section_nested_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_background" "enum__pages_v_blocks_cta_section_nested_design_background" DEFAULT 'default',
  	"design_alignment" "enum__pages_v_blocks_cta_section_nested_design_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_nested_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum__pages_v_blocks_stats_nested_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_stats_nested_design_columns" DEFAULT '4',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_nested_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum__pages_v_blocks_gallery_nested_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_gallery_nested_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_aspect_ratio" "enum__pages_v_blocks_video_nested_design_aspect_ratio" DEFAULT '16/9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"height" "enum__pages_v_blocks_spacer_nested_height" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"field_type" "enum__pages_v_blocks_contact_form_nested_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb,
  	"design_type" "enum__pages_v_blocks_banner_nested_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_nested_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_nested" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_allow_multiple" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"settings_align_self" "enum__pages_v_blocks_columns_columns_settings_align_self" DEFAULT 'auto',
  	"settings_width_base" "enum__pages_v_blocks_columns_columns_settings_width_base" DEFAULT '12',
  	"settings_width_xs" "enum__pages_v_blocks_columns_columns_settings_width_xs",
  	"settings_width_sm" "enum__pages_v_blocks_columns_columns_settings_width_sm",
  	"settings_width_md" "enum__pages_v_blocks_columns_columns_settings_width_md",
  	"settings_width_lg" "enum__pages_v_blocks_columns_columns_settings_width_lg",
  	"settings_width_xl" "enum__pages_v_blocks_columns_columns_settings_width_xl",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"prefix" jsonb,
  	"suffix" jsonb,
  	"design_spacing" "enum__pages_v_blocks_columns_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_columns_design_spacing_type" DEFAULT 'padding',
  	"design_gap" "enum__pages_v_blocks_columns_design_gap" DEFAULT 'md',
  	"design_vertical_alignment" "enum__pages_v_blocks_columns_design_vertical_alignment",
  	"design_advanced_column_settings" boolean DEFAULT false,
  	"design_align_self" "enum__pages_v_blocks_columns_design_align_self",
  	"design_width_base" "enum__pages_v_blocks_columns_design_width_base" DEFAULT '12',
  	"design_width_xs" "enum__pages_v_blocks_columns_design_width_xs",
  	"design_width_sm" "enum__pages_v_blocks_columns_design_width_sm",
  	"design_width_md" "enum__pages_v_blocks_columns_design_width_md",
  	"design_width_lg" "enum__pages_v_blocks_columns_design_width_lg",
  	"design_width_xl" "enum__pages_v_blocks_columns_design_width_xl",
  	"settings_html_tag" "enum__pages_v_blocks_columns_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_columns_settings_container_type" DEFAULT 'default',
  	"settings_with_prefix" boolean DEFAULT true,
  	"settings_with_suffix" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"data" jsonb,
  	"design_spacing" "enum__pages_v_blocks_rich_text_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_rich_text_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_rich_text_2_settings_html_tag" DEFAULT 'div',
  	"settings_container_type" "enum__pages_v_blocks_rich_text_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_spacing" "enum__pages_v_blocks_accordion_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_accordion_2_design_spacing_type" DEFAULT 'padding',
  	"design_accordion_type" "enum__pages_v_blocks_accordion_2_design_accordion_type" DEFAULT 'single',
  	"design_width_type" "enum__pages_v_blocks_accordion_2_design_width_type" DEFAULT 'preset',
  	"design_width_preset_base" "enum__pages_v_blocks_accordion_2_design_width_preset_base" DEFAULT 'lg',
  	"design_width_preset_xs" "enum__pages_v_blocks_accordion_2_design_width_preset_xs" DEFAULT '',
  	"design_width_preset_sm" "enum__pages_v_blocks_accordion_2_design_width_preset_sm" DEFAULT '',
  	"design_width_preset_md" "enum__pages_v_blocks_accordion_2_design_width_preset_md" DEFAULT '',
  	"design_width_preset_lg" "enum__pages_v_blocks_accordion_2_design_width_preset_lg" DEFAULT '',
  	"design_width_preset_xl" "enum__pages_v_blocks_accordion_2_design_width_preset_xl" DEFAULT '',
  	"design_width_custom_base" numeric,
  	"design_width_custom_xs" numeric,
  	"design_width_custom_sm" numeric,
  	"design_width_custom_md" numeric,
  	"design_width_custom_lg" numeric,
  	"design_width_custom_xl" numeric,
  	"design_alignment" "enum__pages_v_blocks_accordion_2_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_accordion_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_accordion_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_listing_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"limit" numeric DEFAULT 12,
  	"columns" "enum__pages_v_blocks_article_listing_2_columns" DEFAULT '3',
  	"sort" "enum__pages_v_blocks_article_listing_2_sort" DEFAULT '-publishedDate',
  	"show_pagination" boolean DEFAULT true,
  	"design_spacing" "enum__pages_v_blocks_article_listing_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_article_listing_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_article_listing_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_article_listing_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_2_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_hero_2_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_hero_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_hero_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_hero_2_design_layout" DEFAULT 'contentLeft',
  	"settings_html_tag" "enum__pages_v_blocks_hero_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_hero_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_features_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_features_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_features_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_features_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_features_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_features_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_section_2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_section_2_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_section_2_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_spacing" "enum__pages_v_blocks_cta_section_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_cta_section_2_design_spacing_type" DEFAULT 'padding',
  	"design_background" "enum__pages_v_blocks_cta_section_2_design_background" DEFAULT 'default',
  	"design_alignment" "enum__pages_v_blocks_cta_section_2_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_cta_section_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_cta_section_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_stats_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_stats_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_stats_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_stats_2_design_columns" DEFAULT '4',
  	"settings_html_tag" "enum__pages_v_blocks_stats_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_stats_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"quote" jsonb,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"author_avatar_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_testimonials_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_testimonials_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_testimonials_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_testimonials_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_testimonials_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_testimonials_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_2_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_logo_cloud_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_logo_cloud_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_logo_cloud_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_logo_cloud_2_design_columns" DEFAULT '5',
  	"settings_html_tag" "enum__pages_v_blocks_logo_cloud_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_logo_cloud_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_column_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_two_column_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_two_column_2_design_spacing_type" DEFAULT 'padding',
  	"design_media_position" "enum__pages_v_blocks_two_column_2_design_media_position" DEFAULT 'right',
  	"design_vertical_alignment" "enum__pages_v_blocks_two_column_2_design_vertical_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_two_column_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_two_column_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_2_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_gallery_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_gallery_2_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_gallery_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_gallery_2_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"settings_html_tag" "enum__pages_v_blocks_gallery_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_gallery_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_video_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_video_2_design_spacing_type" DEFAULT 'padding',
  	"design_aspect_ratio" "enum__pages_v_blocks_video_2_design_aspect_ratio" DEFAULT '16/9',
  	"settings_html_tag" "enum__pages_v_blocks_video_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_video_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_2_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"platform" "enum__pages_v_blocks_team_2_members_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_2_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" jsonb,
  	"photo_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_team_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_team_2_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum__pages_v_blocks_team_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_team_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_team_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum__pages_v_blocks_marquee_2_items_type" DEFAULT 'text',
  	"text" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_spacing" "enum__pages_v_blocks_marquee_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_marquee_2_design_spacing_type" DEFAULT 'padding',
  	"design_speed" "enum__pages_v_blocks_marquee_2_design_speed" DEFAULT 'normal',
  	"design_direction" "enum__pages_v_blocks_marquee_2_design_direction" DEFAULT 'ltr',
  	"design_pause_on_hover" boolean DEFAULT true,
  	"settings_html_tag" "enum__pages_v_blocks_marquee_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_marquee_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"height" "enum__pages_v_blocks_spacer_2_height" DEFAULT 'md',
  	"design_spacing" "enum__pages_v_blocks_spacer_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_spacer_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_spacer_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_spacer_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_2_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_2_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"field_type" "enum__pages_v_blocks_contact_form_2_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"design_spacing" "enum__pages_v_blocks_contact_form_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_contact_form_2_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_contact_form_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_contact_form_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_2_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_2_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" "enum__pages_v_blocks_pricing_2_plans_period" DEFAULT 'monthly',
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_link" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_pricing_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_pricing_2_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum__pages_v_blocks_pricing_2_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_pricing_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_pricing_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb,
  	"design_spacing" "enum__pages_v_blocks_banner_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_banner_2_design_spacing_type" DEFAULT 'padding',
  	"design_type" "enum__pages_v_blocks_banner_2_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"settings_html_tag" "enum__pages_v_blocks_banner_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_banner_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_faq_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_faq_2_design_spacing_type" DEFAULT 'padding',
  	"design_allow_multiple" boolean DEFAULT false,
  	"settings_html_tag" "enum__pages_v_blocks_faq_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_faq_2_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_nested_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_accordion_type" "enum__pages_v_blocks_accordion_nested_2_design_accordion_type" DEFAULT 'single',
  	"design_alignment" "enum__pages_v_blocks_accordion_nested_2_design_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_nested_2_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_section_nested_2_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_section_nested_2_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_section_nested_2_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_background" "enum__pages_v_blocks_cta_section_nested_2_design_background" DEFAULT 'default',
  	"design_alignment" "enum__pages_v_blocks_cta_section_nested_2_design_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_nested_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum__pages_v_blocks_stats_nested_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_stats_nested_2_design_columns" DEFAULT '4',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_nested_2_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum__pages_v_blocks_gallery_nested_2_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_gallery_nested_2_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_aspect_ratio" "enum__pages_v_blocks_video_nested_2_design_aspect_ratio" DEFAULT '16/9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb,
  	"design_type" "enum__pages_v_blocks_banner_nested_2_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_nested_2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_nested_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_allow_multiple" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_2_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"settings_align_self" "enum__pages_v_blocks_columns_2_columns_settings_align_self" DEFAULT 'auto',
  	"settings_width_base" "enum__pages_v_blocks_columns_2_columns_settings_width_base" DEFAULT '12',
  	"settings_width_xs" "enum__pages_v_blocks_columns_2_columns_settings_width_xs",
  	"settings_width_sm" "enum__pages_v_blocks_columns_2_columns_settings_width_sm",
  	"settings_width_md" "enum__pages_v_blocks_columns_2_columns_settings_width_md",
  	"settings_width_lg" "enum__pages_v_blocks_columns_2_columns_settings_width_lg",
  	"settings_width_xl" "enum__pages_v_blocks_columns_2_columns_settings_width_xl",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_2" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"prefix" jsonb,
  	"suffix" jsonb,
  	"design_spacing" "enum__pages_v_blocks_columns_2_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_columns_2_design_spacing_type" DEFAULT 'padding',
  	"design_gap" "enum__pages_v_blocks_columns_2_design_gap" DEFAULT 'md',
  	"design_vertical_alignment" "enum__pages_v_blocks_columns_2_design_vertical_alignment",
  	"design_advanced_column_settings" boolean DEFAULT false,
  	"design_align_self" "enum__pages_v_blocks_columns_2_design_align_self",
  	"design_width_base" "enum__pages_v_blocks_columns_2_design_width_base" DEFAULT '12',
  	"design_width_xs" "enum__pages_v_blocks_columns_2_design_width_xs",
  	"design_width_sm" "enum__pages_v_blocks_columns_2_design_width_sm",
  	"design_width_md" "enum__pages_v_blocks_columns_2_design_width_md",
  	"design_width_lg" "enum__pages_v_blocks_columns_2_design_width_lg",
  	"design_width_xl" "enum__pages_v_blocks_columns_2_design_width_xl",
  	"settings_html_tag" "enum__pages_v_blocks_columns_2_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_columns_2_settings_container_type" DEFAULT 'default',
  	"settings_with_prefix" boolean DEFAULT true,
  	"settings_with_suffix" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"data" jsonb,
  	"design_spacing" "enum__pages_v_blocks_rich_text_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_rich_text_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_rich_text_3_settings_html_tag" DEFAULT 'div',
  	"settings_container_type" "enum__pages_v_blocks_rich_text_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_spacing" "enum__pages_v_blocks_accordion_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_accordion_3_design_spacing_type" DEFAULT 'padding',
  	"design_accordion_type" "enum__pages_v_blocks_accordion_3_design_accordion_type" DEFAULT 'single',
  	"design_width_type" "enum__pages_v_blocks_accordion_3_design_width_type" DEFAULT 'preset',
  	"design_width_preset_base" "enum__pages_v_blocks_accordion_3_design_width_preset_base" DEFAULT 'lg',
  	"design_width_preset_xs" "enum__pages_v_blocks_accordion_3_design_width_preset_xs" DEFAULT '',
  	"design_width_preset_sm" "enum__pages_v_blocks_accordion_3_design_width_preset_sm" DEFAULT '',
  	"design_width_preset_md" "enum__pages_v_blocks_accordion_3_design_width_preset_md" DEFAULT '',
  	"design_width_preset_lg" "enum__pages_v_blocks_accordion_3_design_width_preset_lg" DEFAULT '',
  	"design_width_preset_xl" "enum__pages_v_blocks_accordion_3_design_width_preset_xl" DEFAULT '',
  	"design_width_custom_base" numeric,
  	"design_width_custom_xs" numeric,
  	"design_width_custom_sm" numeric,
  	"design_width_custom_md" numeric,
  	"design_width_custom_lg" numeric,
  	"design_width_custom_xl" numeric,
  	"design_alignment" "enum__pages_v_blocks_accordion_3_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_accordion_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_accordion_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_listing_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"limit" numeric DEFAULT 12,
  	"columns" "enum__pages_v_blocks_article_listing_3_columns" DEFAULT '3',
  	"sort" "enum__pages_v_blocks_article_listing_3_sort" DEFAULT '-publishedDate',
  	"show_pagination" boolean DEFAULT true,
  	"design_spacing" "enum__pages_v_blocks_article_listing_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_article_listing_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_article_listing_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_article_listing_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_3_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_hero_3_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"body" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_hero_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_hero_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_hero_3_design_layout" DEFAULT 'contentLeft',
  	"settings_html_tag" "enum__pages_v_blocks_hero_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_hero_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_features_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_features_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_features_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_features_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_features_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_features_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_section_3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_section_3_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_section_3_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_spacing" "enum__pages_v_blocks_cta_section_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_cta_section_3_design_spacing_type" DEFAULT 'padding',
  	"design_background" "enum__pages_v_blocks_cta_section_3_design_background" DEFAULT 'default',
  	"design_alignment" "enum__pages_v_blocks_cta_section_3_design_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_cta_section_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_cta_section_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_stats_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_stats_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_stats_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_stats_3_design_columns" DEFAULT '4',
  	"settings_html_tag" "enum__pages_v_blocks_stats_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_stats_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"quote" jsonb,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"author_avatar_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_testimonials_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_testimonials_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_testimonials_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_testimonials_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_testimonials_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_testimonials_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_3_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_logo_cloud_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_logo_cloud_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_logo_cloud_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_logo_cloud_3_design_columns" DEFAULT '5',
  	"settings_html_tag" "enum__pages_v_blocks_logo_cloud_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_logo_cloud_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_column_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"media_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_two_column_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_two_column_3_design_spacing_type" DEFAULT 'padding',
  	"design_media_position" "enum__pages_v_blocks_two_column_3_design_media_position" DEFAULT 'right',
  	"design_vertical_alignment" "enum__pages_v_blocks_two_column_3_design_vertical_alignment" DEFAULT 'center',
  	"settings_html_tag" "enum__pages_v_blocks_two_column_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_two_column_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_3_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_gallery_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_gallery_3_design_spacing_type" DEFAULT 'padding',
  	"design_layout" "enum__pages_v_blocks_gallery_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_gallery_3_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"settings_html_tag" "enum__pages_v_blocks_gallery_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_gallery_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_spacing" "enum__pages_v_blocks_video_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_video_3_design_spacing_type" DEFAULT 'padding',
  	"design_aspect_ratio" "enum__pages_v_blocks_video_3_design_aspect_ratio" DEFAULT '16/9',
  	"settings_html_tag" "enum__pages_v_blocks_video_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_video_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_3_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"platform" "enum__pages_v_blocks_team_3_members_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_3_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" jsonb,
  	"photo_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_team_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_team_3_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum__pages_v_blocks_team_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_team_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_team_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum__pages_v_blocks_marquee_3_items_type" DEFAULT 'text',
  	"text" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_spacing" "enum__pages_v_blocks_marquee_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_marquee_3_design_spacing_type" DEFAULT 'padding',
  	"design_speed" "enum__pages_v_blocks_marquee_3_design_speed" DEFAULT 'normal',
  	"design_direction" "enum__pages_v_blocks_marquee_3_design_direction" DEFAULT 'ltr',
  	"design_pause_on_hover" boolean DEFAULT true,
  	"settings_html_tag" "enum__pages_v_blocks_marquee_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_marquee_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"height" "enum__pages_v_blocks_spacer_3_height" DEFAULT 'md',
  	"design_spacing" "enum__pages_v_blocks_spacer_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_spacer_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_spacer_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_spacer_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_3_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_3_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"field_type" "enum__pages_v_blocks_contact_form_3_fields_field_type" DEFAULT 'text',
  	"required" boolean DEFAULT false,
  	"placeholder" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thank you! We will get back to you soon.',
  	"endpoint" varchar,
  	"design_spacing" "enum__pages_v_blocks_contact_form_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_contact_form_3_design_spacing_type" DEFAULT 'padding',
  	"settings_html_tag" "enum__pages_v_blocks_contact_form_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_contact_form_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_3_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_3_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" "enum__pages_v_blocks_pricing_3_plans_period" DEFAULT 'monthly',
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_link" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_pricing_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_pricing_3_design_spacing_type" DEFAULT 'padding',
  	"design_columns" "enum__pages_v_blocks_pricing_3_design_columns" DEFAULT '3',
  	"settings_html_tag" "enum__pages_v_blocks_pricing_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_pricing_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb,
  	"design_spacing" "enum__pages_v_blocks_banner_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_banner_3_design_spacing_type" DEFAULT 'padding',
  	"design_type" "enum__pages_v_blocks_banner_3_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"settings_html_tag" "enum__pages_v_blocks_banner_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_banner_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_spacing" "enum__pages_v_blocks_faq_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_faq_3_design_spacing_type" DEFAULT 'padding',
  	"design_allow_multiple" boolean DEFAULT false,
  	"settings_html_tag" "enum__pages_v_blocks_faq_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_faq_3_settings_container_type" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_nested_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"design_accordion_type" "enum__pages_v_blocks_accordion_nested_3_design_accordion_type" DEFAULT 'single',
  	"design_alignment" "enum__pages_v_blocks_accordion_nested_3_design_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_nested_3_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_section_nested_3_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_section_nested_3_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_section_nested_3_links_link_size" DEFAULT 'md',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"design_background" "enum__pages_v_blocks_cta_section_nested_3_design_background" DEFAULT 'default',
  	"design_alignment" "enum__pages_v_blocks_cta_section_nested_3_design_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_nested_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum__pages_v_blocks_stats_nested_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_stats_nested_3_design_columns" DEFAULT '4',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_nested_3_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_layout" "enum__pages_v_blocks_gallery_nested_3_design_layout" DEFAULT 'grid',
  	"design_columns" "enum__pages_v_blocks_gallery_nested_3_design_columns" DEFAULT '3',
  	"design_lightbox" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"poster_id" uuid,
  	"design_aspect_ratio" "enum__pages_v_blocks_video_nested_3_design_aspect_ratio" DEFAULT '16/9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb,
  	"design_type" "enum__pages_v_blocks_banner_nested_3_design_type" DEFAULT 'info',
  	"design_dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_nested_3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_nested_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"design_allow_multiple" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_3_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"settings_align_self" "enum__pages_v_blocks_columns_3_columns_settings_align_self" DEFAULT 'auto',
  	"settings_width_base" "enum__pages_v_blocks_columns_3_columns_settings_width_base" DEFAULT '12',
  	"settings_width_xs" "enum__pages_v_blocks_columns_3_columns_settings_width_xs",
  	"settings_width_sm" "enum__pages_v_blocks_columns_3_columns_settings_width_sm",
  	"settings_width_md" "enum__pages_v_blocks_columns_3_columns_settings_width_md",
  	"settings_width_lg" "enum__pages_v_blocks_columns_3_columns_settings_width_lg",
  	"settings_width_xl" "enum__pages_v_blocks_columns_3_columns_settings_width_xl",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_3" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"prefix" jsonb,
  	"suffix" jsonb,
  	"design_spacing" "enum__pages_v_blocks_columns_3_design_spacing" DEFAULT 'none',
  	"design_spacing_type" "enum__pages_v_blocks_columns_3_design_spacing_type" DEFAULT 'padding',
  	"design_gap" "enum__pages_v_blocks_columns_3_design_gap" DEFAULT 'md',
  	"design_vertical_alignment" "enum__pages_v_blocks_columns_3_design_vertical_alignment",
  	"design_advanced_column_settings" boolean DEFAULT false,
  	"design_align_self" "enum__pages_v_blocks_columns_3_design_align_self",
  	"design_width_base" "enum__pages_v_blocks_columns_3_design_width_base" DEFAULT '12',
  	"design_width_xs" "enum__pages_v_blocks_columns_3_design_width_xs",
  	"design_width_sm" "enum__pages_v_blocks_columns_3_design_width_sm",
  	"design_width_md" "enum__pages_v_blocks_columns_3_design_width_md",
  	"design_width_lg" "enum__pages_v_blocks_columns_3_design_width_lg",
  	"design_width_xl" "enum__pages_v_blocks_columns_3_design_width_xl",
  	"settings_html_tag" "enum__pages_v_blocks_columns_3_settings_html_tag" DEFAULT 'section',
  	"settings_container_type" "enum__pages_v_blocks_columns_3_settings_container_type" DEFAULT 'default',
  	"settings_with_prefix" boolean DEFAULT true,
  	"settings_with_suffix" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_is_home" boolean DEFAULT false,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_pathname" varchar,
  	"version_type" "enum__pages_v_version_type" DEFAULT 'standard',
  	"version_dynamic_collection" "enum__pages_v_version_dynamic_collection" DEFAULT 'articles',
  	"version_settings_query_where" jsonb,
  	"version_parent_id" uuid,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" uuid,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "accounts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_accounts_type" NOT NULL,
  	"balance" numeric DEFAULT 0 NOT NULL,
  	"credit_limit" numeric,
  	"currency" "enum_accounts_currency" DEFAULT 'USD' NOT NULL,
  	"color" varchar,
  	"status" "enum_accounts_status" DEFAULT 'active',
  	"owner_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "budgets" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"month" varchar NOT NULL,
  	"category_id" uuid NOT NULL,
  	"amount" numeric NOT NULL,
  	"locked" boolean DEFAULT false,
  	"status" "enum_budgets_status" DEFAULT 'active',
  	"current_spend" numeric DEFAULT 0,
  	"recurrence_group_id" varchar,
  	"recurrence_type" "enum_budgets_recurrence_type" DEFAULT 'monthly',
  	"owner_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_categories_type" NOT NULL,
  	"icon" varchar,
  	"color" varchar,
  	"is_default" boolean DEFAULT false,
  	"owner_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "members_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "members" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"first_name" varchar NOT NULL,
  	"second_name" varchar,
  	"last_name" varchar NOT NULL,
  	"second_last_name" varchar,
  	"currency" "enum_members_currency" DEFAULT 'USD' NOT NULL,
  	"has_completed_tour" boolean DEFAULT false,
  	"has_completed_import_tour" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "scheduled_transactions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"amount" numeric NOT NULL,
  	"frequency" "enum_scheduled_transactions_frequency" DEFAULT 'monthly' NOT NULL,
  	"next_due_date" timestamp(3) with time zone NOT NULL,
  	"category_id" uuid,
  	"account_id" uuid,
  	"owner_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "transactions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"amount" numeric NOT NULL,
  	"type" "enum_transactions_type" NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"description" varchar,
  	"account_id" uuid NOT NULL,
  	"to_account_id" uuid,
  	"category_id" uuid,
  	"budget_id" uuid,
  	"status" "enum_transactions_status" DEFAULT 'active',
  	"owner_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_users_roles",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "invitation_codes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"code" varchar,
  	"status" "enum_invitation_codes_status" DEFAULT 'available',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" uuid,
  	"media_id" uuid,
  	"pages_id" uuid,
  	"accounts_id" uuid,
  	"budgets_id" uuid,
  	"categories_id" uuid,
  	"members_id" uuid,
  	"scheduled_transactions_id" uuid,
  	"transactions_id" uuid,
  	"users_id" uuid,
  	"invitation_codes_id" uuid,
  	"tags_id" uuid,
  	"payload_folders_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"members_id" uuid,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_navigation_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_contact_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_contact_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"navigation_title" varchar DEFAULT 'Navigation',
  	"contact_title" varchar DEFAULT 'Contact',
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"legal_legal_name" varchar,
  	"legal_title" varchar DEFAULT 'Legal',
  	"legal_copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "general_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"typography_heading_font" "enum_general_settings_typography_heading_font" DEFAULT 'Inter',
  	"typography_body_font" "enum_general_settings_typography_body_font" DEFAULT 'Inter',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"logo_type" "enum_header_logo_type" DEFAULT 'none',
  	"logo_image_id" uuid,
  	"logo_text" varchar,
  	"cta_enabled" boolean DEFAULT false,
  	"cta_link_type" "enum_header_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"articles_id" uuid
  );
  
  CREATE TABLE "seo_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"site_name" varchar,
  	"tagline" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "import_settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tutorial_url" varchar DEFAULT 'https://www.youtube.com/watch?v=10XdeMVqK6Q' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "invitations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar DEFAULT 'We would like everyone to be in our home, but we do not have that much of an space' NOT NULL,
  	"subtitle" varchar DEFAULT 'If you have an invitation code, please put it here' NOT NULL,
  	"mock_phrase" varchar DEFAULT 'So, you dare and try to enter this place without an invitation? I''ll tell your mom how bad of a person you''re' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "articles" ADD CONSTRAINT "articles_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_texts" ADD CONSTRAINT "media_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_listing" ADD CONSTRAINT "pages_blocks_article_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_links" ADD CONSTRAINT "pages_blocks_cta_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section" ADD CONSTRAINT "pages_blocks_cta_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column" ADD CONSTRAINT "pages_blocks_two_column_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column" ADD CONSTRAINT "pages_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members_social_links" ADD CONSTRAINT "pages_blocks_team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer" ADD CONSTRAINT "pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_fields" ADD CONSTRAINT "pages_blocks_contact_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans_features" ADD CONSTRAINT "pages_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans" ADD CONSTRAINT "pages_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_nested_items" ADD CONSTRAINT "pages_blocks_accordion_nested_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_nested" ADD CONSTRAINT "pages_blocks_accordion_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_nested_links" ADD CONSTRAINT "pages_blocks_cta_section_nested_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_section_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_nested" ADD CONSTRAINT "pages_blocks_cta_section_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_nested_items" ADD CONSTRAINT "pages_blocks_stats_nested_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_nested" ADD CONSTRAINT "pages_blocks_stats_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_images" ADD CONSTRAINT "pages_blocks_gallery_nested_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_images" ADD CONSTRAINT "pages_blocks_gallery_nested_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested" ADD CONSTRAINT "pages_blocks_gallery_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_nested" ADD CONSTRAINT "pages_blocks_video_nested_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_nested" ADD CONSTRAINT "pages_blocks_video_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_nested" ADD CONSTRAINT "pages_blocks_spacer_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_nested_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_nested_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested_fields" ADD CONSTRAINT "pages_blocks_contact_form_nested_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_nested" ADD CONSTRAINT "pages_blocks_contact_form_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_nested" ADD CONSTRAINT "pages_blocks_banner_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_nested_items" ADD CONSTRAINT "pages_blocks_faq_nested_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_nested" ADD CONSTRAINT "pages_blocks_faq_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns" ADD CONSTRAINT "pages_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_2" ADD CONSTRAINT "pages_blocks_rich_text_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_2_items" ADD CONSTRAINT "pages_blocks_accordion_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_2" ADD CONSTRAINT "pages_blocks_accordion_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_listing_2" ADD CONSTRAINT "pages_blocks_article_listing_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_2_links" ADD CONSTRAINT "pages_blocks_hero_2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_2" ADD CONSTRAINT "pages_blocks_hero_2_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_2" ADD CONSTRAINT "pages_blocks_hero_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_2_items" ADD CONSTRAINT "pages_blocks_features_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_2" ADD CONSTRAINT "pages_blocks_features_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_2_links" ADD CONSTRAINT "pages_blocks_cta_section_2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_section_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_2" ADD CONSTRAINT "pages_blocks_cta_section_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_2_items" ADD CONSTRAINT "pages_blocks_stats_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_2" ADD CONSTRAINT "pages_blocks_stats_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_2_items" ADD CONSTRAINT "pages_blocks_testimonials_2_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_2_items" ADD CONSTRAINT "pages_blocks_testimonials_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_2" ADD CONSTRAINT "pages_blocks_testimonials_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_2_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_2_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_2_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_2_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_2" ADD CONSTRAINT "pages_blocks_logo_cloud_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_2" ADD CONSTRAINT "pages_blocks_two_column_2_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_2" ADD CONSTRAINT "pages_blocks_two_column_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_2_images" ADD CONSTRAINT "pages_blocks_gallery_2_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_2_images" ADD CONSTRAINT "pages_blocks_gallery_2_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_2" ADD CONSTRAINT "pages_blocks_gallery_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_2" ADD CONSTRAINT "pages_blocks_video_2_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_2" ADD CONSTRAINT "pages_blocks_video_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_2_members_social_links" ADD CONSTRAINT "pages_blocks_team_2_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_2_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_2_members" ADD CONSTRAINT "pages_blocks_team_2_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_2_members" ADD CONSTRAINT "pages_blocks_team_2_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_2" ADD CONSTRAINT "pages_blocks_team_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_2_items" ADD CONSTRAINT "pages_blocks_marquee_2_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_2_items" ADD CONSTRAINT "pages_blocks_marquee_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_2" ADD CONSTRAINT "pages_blocks_marquee_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_2" ADD CONSTRAINT "pages_blocks_spacer_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_2_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_2_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_2_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_2_fields" ADD CONSTRAINT "pages_blocks_contact_form_2_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_2" ADD CONSTRAINT "pages_blocks_contact_form_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_2_plans_features" ADD CONSTRAINT "pages_blocks_pricing_2_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_2_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_2_plans" ADD CONSTRAINT "pages_blocks_pricing_2_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_2" ADD CONSTRAINT "pages_blocks_pricing_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_2" ADD CONSTRAINT "pages_blocks_banner_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_2_items" ADD CONSTRAINT "pages_blocks_faq_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_2" ADD CONSTRAINT "pages_blocks_faq_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_nested_2_items" ADD CONSTRAINT "pages_blocks_accordion_nested_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_nested_2" ADD CONSTRAINT "pages_blocks_accordion_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_nested_2_links" ADD CONSTRAINT "pages_blocks_cta_section_nested_2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_section_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_nested_2" ADD CONSTRAINT "pages_blocks_cta_section_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_nested_2_items" ADD CONSTRAINT "pages_blocks_stats_nested_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_nested_2" ADD CONSTRAINT "pages_blocks_stats_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_2_images" ADD CONSTRAINT "pages_blocks_gallery_nested_2_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_2_images" ADD CONSTRAINT "pages_blocks_gallery_nested_2_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_2" ADD CONSTRAINT "pages_blocks_gallery_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_nested_2" ADD CONSTRAINT "pages_blocks_video_nested_2_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_nested_2" ADD CONSTRAINT "pages_blocks_video_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_nested_2" ADD CONSTRAINT "pages_blocks_banner_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_nested_2_items" ADD CONSTRAINT "pages_blocks_faq_nested_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_nested_2" ADD CONSTRAINT "pages_blocks_faq_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_2_columns" ADD CONSTRAINT "pages_blocks_columns_2_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_2" ADD CONSTRAINT "pages_blocks_columns_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_3" ADD CONSTRAINT "pages_blocks_rich_text_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_3_items" ADD CONSTRAINT "pages_blocks_accordion_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_3" ADD CONSTRAINT "pages_blocks_accordion_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_listing_3" ADD CONSTRAINT "pages_blocks_article_listing_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_3_links" ADD CONSTRAINT "pages_blocks_hero_3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_3" ADD CONSTRAINT "pages_blocks_hero_3_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_3" ADD CONSTRAINT "pages_blocks_hero_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_3_items" ADD CONSTRAINT "pages_blocks_features_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_3" ADD CONSTRAINT "pages_blocks_features_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_3_links" ADD CONSTRAINT "pages_blocks_cta_section_3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_section_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_3" ADD CONSTRAINT "pages_blocks_cta_section_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_3_items" ADD CONSTRAINT "pages_blocks_stats_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_3" ADD CONSTRAINT "pages_blocks_stats_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_3_items" ADD CONSTRAINT "pages_blocks_testimonials_3_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_3_items" ADD CONSTRAINT "pages_blocks_testimonials_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_3" ADD CONSTRAINT "pages_blocks_testimonials_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_3_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_3_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_3_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_3_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_3" ADD CONSTRAINT "pages_blocks_logo_cloud_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_3" ADD CONSTRAINT "pages_blocks_two_column_3_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_3" ADD CONSTRAINT "pages_blocks_two_column_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_3_images" ADD CONSTRAINT "pages_blocks_gallery_3_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_3_images" ADD CONSTRAINT "pages_blocks_gallery_3_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_3" ADD CONSTRAINT "pages_blocks_gallery_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_3" ADD CONSTRAINT "pages_blocks_video_3_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_3" ADD CONSTRAINT "pages_blocks_video_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_3_members_social_links" ADD CONSTRAINT "pages_blocks_team_3_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_3_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_3_members" ADD CONSTRAINT "pages_blocks_team_3_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_3_members" ADD CONSTRAINT "pages_blocks_team_3_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_3" ADD CONSTRAINT "pages_blocks_team_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_3_items" ADD CONSTRAINT "pages_blocks_marquee_3_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_3_items" ADD CONSTRAINT "pages_blocks_marquee_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_3" ADD CONSTRAINT "pages_blocks_marquee_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_3" ADD CONSTRAINT "pages_blocks_spacer_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_3_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_3_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_3_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_3_fields" ADD CONSTRAINT "pages_blocks_contact_form_3_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_3" ADD CONSTRAINT "pages_blocks_contact_form_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_3_plans_features" ADD CONSTRAINT "pages_blocks_pricing_3_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_3_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_3_plans" ADD CONSTRAINT "pages_blocks_pricing_3_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_3" ADD CONSTRAINT "pages_blocks_pricing_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_3" ADD CONSTRAINT "pages_blocks_banner_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_3_items" ADD CONSTRAINT "pages_blocks_faq_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_3" ADD CONSTRAINT "pages_blocks_faq_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_nested_3_items" ADD CONSTRAINT "pages_blocks_accordion_nested_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_nested_3" ADD CONSTRAINT "pages_blocks_accordion_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_nested_3_links" ADD CONSTRAINT "pages_blocks_cta_section_nested_3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_section_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section_nested_3" ADD CONSTRAINT "pages_blocks_cta_section_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_nested_3_items" ADD CONSTRAINT "pages_blocks_stats_nested_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_nested_3" ADD CONSTRAINT "pages_blocks_stats_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_3_images" ADD CONSTRAINT "pages_blocks_gallery_nested_3_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_3_images" ADD CONSTRAINT "pages_blocks_gallery_nested_3_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_nested_3" ADD CONSTRAINT "pages_blocks_gallery_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_nested_3" ADD CONSTRAINT "pages_blocks_video_nested_3_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_nested_3" ADD CONSTRAINT "pages_blocks_video_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_nested_3" ADD CONSTRAINT "pages_blocks_banner_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_nested_3_items" ADD CONSTRAINT "pages_blocks_faq_nested_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_nested_3" ADD CONSTRAINT "pages_blocks_faq_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_3_columns" ADD CONSTRAINT "pages_blocks_columns_3_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_3" ADD CONSTRAINT "pages_blocks_columns_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_listing" ADD CONSTRAINT "_pages_v_blocks_article_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_links" ADD CONSTRAINT "_pages_v_blocks_cta_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section" ADD CONSTRAINT "_pages_v_blocks_cta_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column" ADD CONSTRAINT "_pages_v_blocks_two_column_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column" ADD CONSTRAINT "_pages_v_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members_social_links" ADD CONSTRAINT "_pages_v_blocks_team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer" ADD CONSTRAINT "_pages_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_nested_items" ADD CONSTRAINT "_pages_v_blocks_accordion_nested_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_nested" ADD CONSTRAINT "_pages_v_blocks_accordion_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_links" ADD CONSTRAINT "_pages_v_blocks_cta_section_nested_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_section_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_nested" ADD CONSTRAINT "_pages_v_blocks_cta_section_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_nested_items" ADD CONSTRAINT "_pages_v_blocks_stats_nested_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_nested" ADD CONSTRAINT "_pages_v_blocks_stats_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_images" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_images" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_nested" ADD CONSTRAINT "_pages_v_blocks_video_nested_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_nested" ADD CONSTRAINT "_pages_v_blocks_video_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_nested" ADD CONSTRAINT "_pages_v_blocks_spacer_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_nested_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_nested" ADD CONSTRAINT "_pages_v_blocks_contact_form_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_nested" ADD CONSTRAINT "_pages_v_blocks_banner_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_nested_items" ADD CONSTRAINT "_pages_v_blocks_faq_nested_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_nested"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_nested" ADD CONSTRAINT "_pages_v_blocks_faq_nested_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns" ADD CONSTRAINT "_pages_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_2" ADD CONSTRAINT "_pages_v_blocks_rich_text_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_2_items" ADD CONSTRAINT "_pages_v_blocks_accordion_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_2" ADD CONSTRAINT "_pages_v_blocks_accordion_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_listing_2" ADD CONSTRAINT "_pages_v_blocks_article_listing_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_2_links" ADD CONSTRAINT "_pages_v_blocks_hero_2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_2" ADD CONSTRAINT "_pages_v_blocks_hero_2_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_2" ADD CONSTRAINT "_pages_v_blocks_hero_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_2_items" ADD CONSTRAINT "_pages_v_blocks_features_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_2" ADD CONSTRAINT "_pages_v_blocks_features_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_2_links" ADD CONSTRAINT "_pages_v_blocks_cta_section_2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_section_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_2" ADD CONSTRAINT "_pages_v_blocks_cta_section_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_2_items" ADD CONSTRAINT "_pages_v_blocks_stats_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_2" ADD CONSTRAINT "_pages_v_blocks_stats_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_2_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_2_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_2_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_2" ADD CONSTRAINT "_pages_v_blocks_testimonials_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_2_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_2_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_2_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_2_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_2" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_2" ADD CONSTRAINT "_pages_v_blocks_two_column_2_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_2" ADD CONSTRAINT "_pages_v_blocks_two_column_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_2_images" ADD CONSTRAINT "_pages_v_blocks_gallery_2_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_2_images" ADD CONSTRAINT "_pages_v_blocks_gallery_2_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_2" ADD CONSTRAINT "_pages_v_blocks_gallery_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_2" ADD CONSTRAINT "_pages_v_blocks_video_2_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_2" ADD CONSTRAINT "_pages_v_blocks_video_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_2_members_social_links" ADD CONSTRAINT "_pages_v_blocks_team_2_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_2_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_2_members" ADD CONSTRAINT "_pages_v_blocks_team_2_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_2_members" ADD CONSTRAINT "_pages_v_blocks_team_2_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_2" ADD CONSTRAINT "_pages_v_blocks_team_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_2_items" ADD CONSTRAINT "_pages_v_blocks_marquee_2_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_2_items" ADD CONSTRAINT "_pages_v_blocks_marquee_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_2" ADD CONSTRAINT "_pages_v_blocks_marquee_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_2" ADD CONSTRAINT "_pages_v_blocks_spacer_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_2_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_2_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_2_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_2_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_2_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_2" ADD CONSTRAINT "_pages_v_blocks_contact_form_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_2_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_2_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_2_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_2_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_2_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_2" ADD CONSTRAINT "_pages_v_blocks_pricing_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_2" ADD CONSTRAINT "_pages_v_blocks_banner_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_2_items" ADD CONSTRAINT "_pages_v_blocks_faq_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_2" ADD CONSTRAINT "_pages_v_blocks_faq_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_nested_2_items" ADD CONSTRAINT "_pages_v_blocks_accordion_nested_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_nested_2" ADD CONSTRAINT "_pages_v_blocks_accordion_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_2_links" ADD CONSTRAINT "_pages_v_blocks_cta_section_nested_2_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_section_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_2" ADD CONSTRAINT "_pages_v_blocks_cta_section_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_nested_2_items" ADD CONSTRAINT "_pages_v_blocks_stats_nested_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_nested_2" ADD CONSTRAINT "_pages_v_blocks_stats_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_2_images" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_2_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_2_images" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_2_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_2" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_nested_2" ADD CONSTRAINT "_pages_v_blocks_video_nested_2_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_nested_2" ADD CONSTRAINT "_pages_v_blocks_video_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_nested_2" ADD CONSTRAINT "_pages_v_blocks_banner_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_nested_2_items" ADD CONSTRAINT "_pages_v_blocks_faq_nested_2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_nested_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_nested_2" ADD CONSTRAINT "_pages_v_blocks_faq_nested_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_2_columns" ADD CONSTRAINT "_pages_v_blocks_columns_2_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns_2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_2" ADD CONSTRAINT "_pages_v_blocks_columns_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_3" ADD CONSTRAINT "_pages_v_blocks_rich_text_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_3_items" ADD CONSTRAINT "_pages_v_blocks_accordion_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_3" ADD CONSTRAINT "_pages_v_blocks_accordion_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_listing_3" ADD CONSTRAINT "_pages_v_blocks_article_listing_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_3_links" ADD CONSTRAINT "_pages_v_blocks_hero_3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_3" ADD CONSTRAINT "_pages_v_blocks_hero_3_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_3" ADD CONSTRAINT "_pages_v_blocks_hero_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_3_items" ADD CONSTRAINT "_pages_v_blocks_features_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_3" ADD CONSTRAINT "_pages_v_blocks_features_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_3_links" ADD CONSTRAINT "_pages_v_blocks_cta_section_3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_section_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_3" ADD CONSTRAINT "_pages_v_blocks_cta_section_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_3_items" ADD CONSTRAINT "_pages_v_blocks_stats_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_3" ADD CONSTRAINT "_pages_v_blocks_stats_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_3_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_3_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_3_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_3" ADD CONSTRAINT "_pages_v_blocks_testimonials_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_3_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_3_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_3_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_3_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_3" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_3" ADD CONSTRAINT "_pages_v_blocks_two_column_3_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_3" ADD CONSTRAINT "_pages_v_blocks_two_column_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_3_images" ADD CONSTRAINT "_pages_v_blocks_gallery_3_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_3_images" ADD CONSTRAINT "_pages_v_blocks_gallery_3_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_3" ADD CONSTRAINT "_pages_v_blocks_gallery_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_3" ADD CONSTRAINT "_pages_v_blocks_video_3_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_3" ADD CONSTRAINT "_pages_v_blocks_video_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_3_members_social_links" ADD CONSTRAINT "_pages_v_blocks_team_3_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_3_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_3_members" ADD CONSTRAINT "_pages_v_blocks_team_3_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_3_members" ADD CONSTRAINT "_pages_v_blocks_team_3_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_3" ADD CONSTRAINT "_pages_v_blocks_team_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_3_items" ADD CONSTRAINT "_pages_v_blocks_marquee_3_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_3_items" ADD CONSTRAINT "_pages_v_blocks_marquee_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_3" ADD CONSTRAINT "_pages_v_blocks_marquee_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_3" ADD CONSTRAINT "_pages_v_blocks_spacer_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_3_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_3_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_3_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_3_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_3_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_3" ADD CONSTRAINT "_pages_v_blocks_contact_form_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_3_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_3_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_3_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_3_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_3_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_3" ADD CONSTRAINT "_pages_v_blocks_pricing_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_3" ADD CONSTRAINT "_pages_v_blocks_banner_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_3_items" ADD CONSTRAINT "_pages_v_blocks_faq_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_3" ADD CONSTRAINT "_pages_v_blocks_faq_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_nested_3_items" ADD CONSTRAINT "_pages_v_blocks_accordion_nested_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_nested_3" ADD CONSTRAINT "_pages_v_blocks_accordion_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_3_links" ADD CONSTRAINT "_pages_v_blocks_cta_section_nested_3_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_section_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section_nested_3" ADD CONSTRAINT "_pages_v_blocks_cta_section_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_nested_3_items" ADD CONSTRAINT "_pages_v_blocks_stats_nested_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_nested_3" ADD CONSTRAINT "_pages_v_blocks_stats_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_3_images" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_3_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_3_images" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_3_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_nested_3" ADD CONSTRAINT "_pages_v_blocks_gallery_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_nested_3" ADD CONSTRAINT "_pages_v_blocks_video_nested_3_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_nested_3" ADD CONSTRAINT "_pages_v_blocks_video_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_nested_3" ADD CONSTRAINT "_pages_v_blocks_banner_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_nested_3_items" ADD CONSTRAINT "_pages_v_blocks_faq_nested_3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_nested_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_nested_3" ADD CONSTRAINT "_pages_v_blocks_faq_nested_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_3_columns" ADD CONSTRAINT "_pages_v_blocks_columns_3_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns_3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_3" ADD CONSTRAINT "_pages_v_blocks_columns_3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_texts" ADD CONSTRAINT "_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accounts" ADD CONSTRAINT "accounts_owner_id_members_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "budgets" ADD CONSTRAINT "budgets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "budgets" ADD CONSTRAINT "budgets_owner_id_members_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_owner_id_members_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_sessions" ADD CONSTRAINT "members_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scheduled_transactions" ADD CONSTRAINT "scheduled_transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "scheduled_transactions" ADD CONSTRAINT "scheduled_transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "scheduled_transactions" ADD CONSTRAINT "scheduled_transactions_owner_id_members_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_budget_id_budgets_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budgets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_owner_id_members_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accounts_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_budgets_fk" FOREIGN KEY ("budgets_id") REFERENCES "public"."budgets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_scheduled_transactions_fk" FOREIGN KEY ("scheduled_transactions_id") REFERENCES "public"."scheduled_transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_invitation_codes_fk" FOREIGN KEY ("invitation_codes_id") REFERENCES "public"."invitation_codes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_navigation_links" ADD CONSTRAINT "footer_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_contact_social_links" ADD CONSTRAINT "footer_contact_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_links" ADD CONSTRAINT "header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_pathname_idx" ON "articles" USING btree ("pathname");
  CREATE INDEX "articles_featured_image_idx" ON "articles" USING btree ("featured_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_deleted_at_idx" ON "articles" USING btree ("deleted_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_users_id_idx" ON "articles_rels" USING btree ("users_id");
  CREATE INDEX "articles_rels_tags_id_idx" ON "articles_rels" USING btree ("tags_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_pathname_idx" ON "_articles_v" USING btree ("version_pathname");
  CREATE INDEX "_articles_v_version_version_featured_image_idx" ON "_articles_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version_deleted_at_idx" ON "_articles_v" USING btree ("version_deleted_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_users_id_idx" ON "_articles_v_rels" USING btree ("users_id");
  CREATE INDEX "_articles_v_rels_tags_id_idx" ON "_articles_v_rels" USING btree ("tags_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_texts_order_parent" ON "media_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_items_order_idx" ON "pages_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_items_parent_id_idx" ON "pages_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_article_listing_order_idx" ON "pages_blocks_article_listing" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_listing_parent_id_idx" ON "pages_blocks_article_listing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_listing_path_idx" ON "pages_blocks_article_listing" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_features_items_order_idx" ON "pages_blocks_features_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_items_parent_id_idx" ON "pages_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_links_order_idx" ON "pages_blocks_cta_section_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_links_parent_id_idx" ON "pages_blocks_cta_section_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_order_idx" ON "pages_blocks_cta_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_parent_id_idx" ON "pages_blocks_cta_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_path_idx" ON "pages_blocks_cta_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_author_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("author_avatar_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_image_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_order_idx" ON "pages_blocks_two_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_parent_id_idx" ON "pages_blocks_two_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_path_idx" ON "pages_blocks_two_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_media_idx" ON "pages_blocks_two_column" USING btree ("media_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_poster_idx" ON "pages_blocks_video" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_team_members_social_links_order_idx" ON "pages_blocks_team_members_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_social_links_parent_id_idx" ON "pages_blocks_team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_marquee_items_order_idx" ON "pages_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_items_parent_id_idx" ON "pages_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_items_image_idx" ON "pages_blocks_marquee_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_order_idx" ON "pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_parent_id_idx" ON "pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_path_idx" ON "pages_blocks_spacer" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_fields_options_order_idx" ON "pages_blocks_contact_form_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_fields_options_parent_id_idx" ON "pages_blocks_contact_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_fields_order_idx" ON "pages_blocks_contact_form_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_fields_parent_id_idx" ON "pages_blocks_contact_form_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_plans_features_order_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_features_parent_id_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_plans_order_idx" ON "pages_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_parent_id_idx" ON "pages_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_nested_items_order_idx" ON "pages_blocks_accordion_nested_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_nested_items_parent_id_idx" ON "pages_blocks_accordion_nested_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_nested_order_idx" ON "pages_blocks_accordion_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_nested_parent_id_idx" ON "pages_blocks_accordion_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_nested_path_idx" ON "pages_blocks_accordion_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_nested_links_order_idx" ON "pages_blocks_cta_section_nested_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_nested_links_parent_id_idx" ON "pages_blocks_cta_section_nested_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_nested_order_idx" ON "pages_blocks_cta_section_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_nested_parent_id_idx" ON "pages_blocks_cta_section_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_nested_path_idx" ON "pages_blocks_cta_section_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_nested_items_order_idx" ON "pages_blocks_stats_nested_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_nested_items_parent_id_idx" ON "pages_blocks_stats_nested_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_nested_order_idx" ON "pages_blocks_stats_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_nested_parent_id_idx" ON "pages_blocks_stats_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_nested_path_idx" ON "pages_blocks_stats_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_nested_images_order_idx" ON "pages_blocks_gallery_nested_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_nested_images_parent_id_idx" ON "pages_blocks_gallery_nested_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_nested_images_image_idx" ON "pages_blocks_gallery_nested_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_nested_order_idx" ON "pages_blocks_gallery_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_nested_parent_id_idx" ON "pages_blocks_gallery_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_nested_path_idx" ON "pages_blocks_gallery_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_nested_order_idx" ON "pages_blocks_video_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_nested_parent_id_idx" ON "pages_blocks_video_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_nested_path_idx" ON "pages_blocks_video_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_nested_poster_idx" ON "pages_blocks_video_nested" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_spacer_nested_order_idx" ON "pages_blocks_spacer_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_nested_parent_id_idx" ON "pages_blocks_spacer_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_nested_path_idx" ON "pages_blocks_spacer_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_nested_fields_options_order_idx" ON "pages_blocks_contact_form_nested_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_fields_options_parent_id_idx" ON "pages_blocks_contact_form_nested_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_fields_order_idx" ON "pages_blocks_contact_form_nested_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_fields_parent_id_idx" ON "pages_blocks_contact_form_nested_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_order_idx" ON "pages_blocks_contact_form_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_nested_parent_id_idx" ON "pages_blocks_contact_form_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_nested_path_idx" ON "pages_blocks_contact_form_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_nested_order_idx" ON "pages_blocks_banner_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_nested_parent_id_idx" ON "pages_blocks_banner_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_nested_path_idx" ON "pages_blocks_banner_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_nested_items_order_idx" ON "pages_blocks_faq_nested_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_nested_items_parent_id_idx" ON "pages_blocks_faq_nested_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_nested_order_idx" ON "pages_blocks_faq_nested" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_nested_parent_id_idx" ON "pages_blocks_faq_nested" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_nested_path_idx" ON "pages_blocks_faq_nested" USING btree ("_path");
  CREATE INDEX "pages_blocks_columns_columns_order_idx" ON "pages_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_columns_parent_id_idx" ON "pages_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_order_idx" ON "pages_blocks_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_parent_id_idx" ON "pages_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_path_idx" ON "pages_blocks_columns" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_2_order_idx" ON "pages_blocks_rich_text_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_2_parent_id_idx" ON "pages_blocks_rich_text_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_2_path_idx" ON "pages_blocks_rich_text_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_2_items_order_idx" ON "pages_blocks_accordion_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_2_items_parent_id_idx" ON "pages_blocks_accordion_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_2_order_idx" ON "pages_blocks_accordion_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_2_parent_id_idx" ON "pages_blocks_accordion_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_2_path_idx" ON "pages_blocks_accordion_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_article_listing_2_order_idx" ON "pages_blocks_article_listing_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_listing_2_parent_id_idx" ON "pages_blocks_article_listing_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_listing_2_path_idx" ON "pages_blocks_article_listing_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_2_links_order_idx" ON "pages_blocks_hero_2_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_2_links_parent_id_idx" ON "pages_blocks_hero_2_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_2_order_idx" ON "pages_blocks_hero_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_2_parent_id_idx" ON "pages_blocks_hero_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_2_path_idx" ON "pages_blocks_hero_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_2_media_idx" ON "pages_blocks_hero_2" USING btree ("media_id");
  CREATE INDEX "pages_blocks_features_2_items_order_idx" ON "pages_blocks_features_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_2_items_parent_id_idx" ON "pages_blocks_features_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_2_order_idx" ON "pages_blocks_features_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_2_parent_id_idx" ON "pages_blocks_features_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_2_path_idx" ON "pages_blocks_features_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_2_links_order_idx" ON "pages_blocks_cta_section_2_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_2_links_parent_id_idx" ON "pages_blocks_cta_section_2_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_2_order_idx" ON "pages_blocks_cta_section_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_2_parent_id_idx" ON "pages_blocks_cta_section_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_2_path_idx" ON "pages_blocks_cta_section_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_2_items_order_idx" ON "pages_blocks_stats_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_2_items_parent_id_idx" ON "pages_blocks_stats_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_2_order_idx" ON "pages_blocks_stats_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_2_parent_id_idx" ON "pages_blocks_stats_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_2_path_idx" ON "pages_blocks_stats_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_2_items_order_idx" ON "pages_blocks_testimonials_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_2_items_parent_id_idx" ON "pages_blocks_testimonials_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_2_items_author_avatar_idx" ON "pages_blocks_testimonials_2_items" USING btree ("author_avatar_id");
  CREATE INDEX "pages_blocks_testimonials_2_order_idx" ON "pages_blocks_testimonials_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_2_parent_id_idx" ON "pages_blocks_testimonials_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_2_path_idx" ON "pages_blocks_testimonials_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_2_logos_order_idx" ON "pages_blocks_logo_cloud_2_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_2_logos_parent_id_idx" ON "pages_blocks_logo_cloud_2_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_2_logos_image_idx" ON "pages_blocks_logo_cloud_2_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logo_cloud_2_order_idx" ON "pages_blocks_logo_cloud_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_2_parent_id_idx" ON "pages_blocks_logo_cloud_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_2_path_idx" ON "pages_blocks_logo_cloud_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_2_order_idx" ON "pages_blocks_two_column_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_2_parent_id_idx" ON "pages_blocks_two_column_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_2_path_idx" ON "pages_blocks_two_column_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_2_media_idx" ON "pages_blocks_two_column_2" USING btree ("media_id");
  CREATE INDEX "pages_blocks_gallery_2_images_order_idx" ON "pages_blocks_gallery_2_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_2_images_parent_id_idx" ON "pages_blocks_gallery_2_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_2_images_image_idx" ON "pages_blocks_gallery_2_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_2_order_idx" ON "pages_blocks_gallery_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_2_parent_id_idx" ON "pages_blocks_gallery_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_2_path_idx" ON "pages_blocks_gallery_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_2_order_idx" ON "pages_blocks_video_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_2_parent_id_idx" ON "pages_blocks_video_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_2_path_idx" ON "pages_blocks_video_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_2_poster_idx" ON "pages_blocks_video_2" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_team_2_members_social_links_order_idx" ON "pages_blocks_team_2_members_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_2_members_social_links_parent_id_idx" ON "pages_blocks_team_2_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_2_members_order_idx" ON "pages_blocks_team_2_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_2_members_parent_id_idx" ON "pages_blocks_team_2_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_2_members_photo_idx" ON "pages_blocks_team_2_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_2_order_idx" ON "pages_blocks_team_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_2_parent_id_idx" ON "pages_blocks_team_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_2_path_idx" ON "pages_blocks_team_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_marquee_2_items_order_idx" ON "pages_blocks_marquee_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_2_items_parent_id_idx" ON "pages_blocks_marquee_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_2_items_image_idx" ON "pages_blocks_marquee_2_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_marquee_2_order_idx" ON "pages_blocks_marquee_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_2_parent_id_idx" ON "pages_blocks_marquee_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_2_path_idx" ON "pages_blocks_marquee_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_2_order_idx" ON "pages_blocks_spacer_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_2_parent_id_idx" ON "pages_blocks_spacer_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_2_path_idx" ON "pages_blocks_spacer_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_2_fields_options_order_idx" ON "pages_blocks_contact_form_2_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_2_fields_options_parent_id_idx" ON "pages_blocks_contact_form_2_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_2_fields_order_idx" ON "pages_blocks_contact_form_2_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_2_fields_parent_id_idx" ON "pages_blocks_contact_form_2_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_2_order_idx" ON "pages_blocks_contact_form_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_2_parent_id_idx" ON "pages_blocks_contact_form_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_2_path_idx" ON "pages_blocks_contact_form_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_2_plans_features_order_idx" ON "pages_blocks_pricing_2_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_2_plans_features_parent_id_idx" ON "pages_blocks_pricing_2_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_2_plans_order_idx" ON "pages_blocks_pricing_2_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_2_plans_parent_id_idx" ON "pages_blocks_pricing_2_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_2_order_idx" ON "pages_blocks_pricing_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_2_parent_id_idx" ON "pages_blocks_pricing_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_2_path_idx" ON "pages_blocks_pricing_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_2_order_idx" ON "pages_blocks_banner_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_2_parent_id_idx" ON "pages_blocks_banner_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_2_path_idx" ON "pages_blocks_banner_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_2_items_order_idx" ON "pages_blocks_faq_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_2_items_parent_id_idx" ON "pages_blocks_faq_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_2_order_idx" ON "pages_blocks_faq_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_2_parent_id_idx" ON "pages_blocks_faq_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_2_path_idx" ON "pages_blocks_faq_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_nested_2_items_order_idx" ON "pages_blocks_accordion_nested_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_nested_2_items_parent_id_idx" ON "pages_blocks_accordion_nested_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_nested_2_order_idx" ON "pages_blocks_accordion_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_nested_2_parent_id_idx" ON "pages_blocks_accordion_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_nested_2_path_idx" ON "pages_blocks_accordion_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_nested_2_links_order_idx" ON "pages_blocks_cta_section_nested_2_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_nested_2_links_parent_id_idx" ON "pages_blocks_cta_section_nested_2_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_nested_2_order_idx" ON "pages_blocks_cta_section_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_nested_2_parent_id_idx" ON "pages_blocks_cta_section_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_nested_2_path_idx" ON "pages_blocks_cta_section_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_nested_2_items_order_idx" ON "pages_blocks_stats_nested_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_nested_2_items_parent_id_idx" ON "pages_blocks_stats_nested_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_nested_2_order_idx" ON "pages_blocks_stats_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_nested_2_parent_id_idx" ON "pages_blocks_stats_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_nested_2_path_idx" ON "pages_blocks_stats_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_nested_2_images_order_idx" ON "pages_blocks_gallery_nested_2_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_nested_2_images_parent_id_idx" ON "pages_blocks_gallery_nested_2_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_nested_2_images_image_idx" ON "pages_blocks_gallery_nested_2_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_nested_2_order_idx" ON "pages_blocks_gallery_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_nested_2_parent_id_idx" ON "pages_blocks_gallery_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_nested_2_path_idx" ON "pages_blocks_gallery_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_nested_2_order_idx" ON "pages_blocks_video_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_nested_2_parent_id_idx" ON "pages_blocks_video_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_nested_2_path_idx" ON "pages_blocks_video_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_nested_2_poster_idx" ON "pages_blocks_video_nested_2" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_banner_nested_2_order_idx" ON "pages_blocks_banner_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_nested_2_parent_id_idx" ON "pages_blocks_banner_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_nested_2_path_idx" ON "pages_blocks_banner_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_nested_2_items_order_idx" ON "pages_blocks_faq_nested_2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_nested_2_items_parent_id_idx" ON "pages_blocks_faq_nested_2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_nested_2_order_idx" ON "pages_blocks_faq_nested_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_nested_2_parent_id_idx" ON "pages_blocks_faq_nested_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_nested_2_path_idx" ON "pages_blocks_faq_nested_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_columns_2_columns_order_idx" ON "pages_blocks_columns_2_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_2_columns_parent_id_idx" ON "pages_blocks_columns_2_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_2_order_idx" ON "pages_blocks_columns_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_2_parent_id_idx" ON "pages_blocks_columns_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_2_path_idx" ON "pages_blocks_columns_2" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_3_order_idx" ON "pages_blocks_rich_text_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_3_parent_id_idx" ON "pages_blocks_rich_text_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_3_path_idx" ON "pages_blocks_rich_text_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_3_items_order_idx" ON "pages_blocks_accordion_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_3_items_parent_id_idx" ON "pages_blocks_accordion_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_3_order_idx" ON "pages_blocks_accordion_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_3_parent_id_idx" ON "pages_blocks_accordion_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_3_path_idx" ON "pages_blocks_accordion_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_article_listing_3_order_idx" ON "pages_blocks_article_listing_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_listing_3_parent_id_idx" ON "pages_blocks_article_listing_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_listing_3_path_idx" ON "pages_blocks_article_listing_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_3_links_order_idx" ON "pages_blocks_hero_3_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_3_links_parent_id_idx" ON "pages_blocks_hero_3_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_3_order_idx" ON "pages_blocks_hero_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_3_parent_id_idx" ON "pages_blocks_hero_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_3_path_idx" ON "pages_blocks_hero_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_3_media_idx" ON "pages_blocks_hero_3" USING btree ("media_id");
  CREATE INDEX "pages_blocks_features_3_items_order_idx" ON "pages_blocks_features_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_3_items_parent_id_idx" ON "pages_blocks_features_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_3_order_idx" ON "pages_blocks_features_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_3_parent_id_idx" ON "pages_blocks_features_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_3_path_idx" ON "pages_blocks_features_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_3_links_order_idx" ON "pages_blocks_cta_section_3_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_3_links_parent_id_idx" ON "pages_blocks_cta_section_3_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_3_order_idx" ON "pages_blocks_cta_section_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_3_parent_id_idx" ON "pages_blocks_cta_section_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_3_path_idx" ON "pages_blocks_cta_section_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_3_items_order_idx" ON "pages_blocks_stats_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_3_items_parent_id_idx" ON "pages_blocks_stats_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_3_order_idx" ON "pages_blocks_stats_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_3_parent_id_idx" ON "pages_blocks_stats_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_3_path_idx" ON "pages_blocks_stats_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_3_items_order_idx" ON "pages_blocks_testimonials_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_3_items_parent_id_idx" ON "pages_blocks_testimonials_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_3_items_author_avatar_idx" ON "pages_blocks_testimonials_3_items" USING btree ("author_avatar_id");
  CREATE INDEX "pages_blocks_testimonials_3_order_idx" ON "pages_blocks_testimonials_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_3_parent_id_idx" ON "pages_blocks_testimonials_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_3_path_idx" ON "pages_blocks_testimonials_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_3_logos_order_idx" ON "pages_blocks_logo_cloud_3_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_3_logos_parent_id_idx" ON "pages_blocks_logo_cloud_3_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_3_logos_image_idx" ON "pages_blocks_logo_cloud_3_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logo_cloud_3_order_idx" ON "pages_blocks_logo_cloud_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_3_parent_id_idx" ON "pages_blocks_logo_cloud_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_3_path_idx" ON "pages_blocks_logo_cloud_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_3_order_idx" ON "pages_blocks_two_column_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_3_parent_id_idx" ON "pages_blocks_two_column_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_3_path_idx" ON "pages_blocks_two_column_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_3_media_idx" ON "pages_blocks_two_column_3" USING btree ("media_id");
  CREATE INDEX "pages_blocks_gallery_3_images_order_idx" ON "pages_blocks_gallery_3_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_3_images_parent_id_idx" ON "pages_blocks_gallery_3_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_3_images_image_idx" ON "pages_blocks_gallery_3_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_3_order_idx" ON "pages_blocks_gallery_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_3_parent_id_idx" ON "pages_blocks_gallery_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_3_path_idx" ON "pages_blocks_gallery_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_3_order_idx" ON "pages_blocks_video_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_3_parent_id_idx" ON "pages_blocks_video_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_3_path_idx" ON "pages_blocks_video_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_3_poster_idx" ON "pages_blocks_video_3" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_team_3_members_social_links_order_idx" ON "pages_blocks_team_3_members_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_3_members_social_links_parent_id_idx" ON "pages_blocks_team_3_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_3_members_order_idx" ON "pages_blocks_team_3_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_3_members_parent_id_idx" ON "pages_blocks_team_3_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_3_members_photo_idx" ON "pages_blocks_team_3_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_3_order_idx" ON "pages_blocks_team_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_3_parent_id_idx" ON "pages_blocks_team_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_3_path_idx" ON "pages_blocks_team_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_marquee_3_items_order_idx" ON "pages_blocks_marquee_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_3_items_parent_id_idx" ON "pages_blocks_marquee_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_3_items_image_idx" ON "pages_blocks_marquee_3_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_marquee_3_order_idx" ON "pages_blocks_marquee_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_3_parent_id_idx" ON "pages_blocks_marquee_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_3_path_idx" ON "pages_blocks_marquee_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_3_order_idx" ON "pages_blocks_spacer_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_3_parent_id_idx" ON "pages_blocks_spacer_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_3_path_idx" ON "pages_blocks_spacer_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_3_fields_options_order_idx" ON "pages_blocks_contact_form_3_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_3_fields_options_parent_id_idx" ON "pages_blocks_contact_form_3_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_3_fields_order_idx" ON "pages_blocks_contact_form_3_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_3_fields_parent_id_idx" ON "pages_blocks_contact_form_3_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_3_order_idx" ON "pages_blocks_contact_form_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_3_parent_id_idx" ON "pages_blocks_contact_form_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_3_path_idx" ON "pages_blocks_contact_form_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_3_plans_features_order_idx" ON "pages_blocks_pricing_3_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_3_plans_features_parent_id_idx" ON "pages_blocks_pricing_3_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_3_plans_order_idx" ON "pages_blocks_pricing_3_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_3_plans_parent_id_idx" ON "pages_blocks_pricing_3_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_3_order_idx" ON "pages_blocks_pricing_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_3_parent_id_idx" ON "pages_blocks_pricing_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_3_path_idx" ON "pages_blocks_pricing_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_3_order_idx" ON "pages_blocks_banner_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_3_parent_id_idx" ON "pages_blocks_banner_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_3_path_idx" ON "pages_blocks_banner_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_3_items_order_idx" ON "pages_blocks_faq_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_3_items_parent_id_idx" ON "pages_blocks_faq_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_3_order_idx" ON "pages_blocks_faq_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_3_parent_id_idx" ON "pages_blocks_faq_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_3_path_idx" ON "pages_blocks_faq_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_nested_3_items_order_idx" ON "pages_blocks_accordion_nested_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_nested_3_items_parent_id_idx" ON "pages_blocks_accordion_nested_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_nested_3_order_idx" ON "pages_blocks_accordion_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_nested_3_parent_id_idx" ON "pages_blocks_accordion_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_nested_3_path_idx" ON "pages_blocks_accordion_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_nested_3_links_order_idx" ON "pages_blocks_cta_section_nested_3_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_nested_3_links_parent_id_idx" ON "pages_blocks_cta_section_nested_3_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_nested_3_order_idx" ON "pages_blocks_cta_section_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_nested_3_parent_id_idx" ON "pages_blocks_cta_section_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_nested_3_path_idx" ON "pages_blocks_cta_section_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_nested_3_items_order_idx" ON "pages_blocks_stats_nested_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_nested_3_items_parent_id_idx" ON "pages_blocks_stats_nested_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_nested_3_order_idx" ON "pages_blocks_stats_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_nested_3_parent_id_idx" ON "pages_blocks_stats_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_nested_3_path_idx" ON "pages_blocks_stats_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_nested_3_images_order_idx" ON "pages_blocks_gallery_nested_3_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_nested_3_images_parent_id_idx" ON "pages_blocks_gallery_nested_3_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_nested_3_images_image_idx" ON "pages_blocks_gallery_nested_3_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_nested_3_order_idx" ON "pages_blocks_gallery_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_nested_3_parent_id_idx" ON "pages_blocks_gallery_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_nested_3_path_idx" ON "pages_blocks_gallery_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_nested_3_order_idx" ON "pages_blocks_video_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_nested_3_parent_id_idx" ON "pages_blocks_video_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_nested_3_path_idx" ON "pages_blocks_video_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_nested_3_poster_idx" ON "pages_blocks_video_nested_3" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_banner_nested_3_order_idx" ON "pages_blocks_banner_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_nested_3_parent_id_idx" ON "pages_blocks_banner_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_nested_3_path_idx" ON "pages_blocks_banner_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_nested_3_items_order_idx" ON "pages_blocks_faq_nested_3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_nested_3_items_parent_id_idx" ON "pages_blocks_faq_nested_3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_nested_3_order_idx" ON "pages_blocks_faq_nested_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_nested_3_parent_id_idx" ON "pages_blocks_faq_nested_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_nested_3_path_idx" ON "pages_blocks_faq_nested_3" USING btree ("_path");
  CREATE INDEX "pages_blocks_columns_3_columns_order_idx" ON "pages_blocks_columns_3_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_3_columns_parent_id_idx" ON "pages_blocks_columns_3_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_3_order_idx" ON "pages_blocks_columns_3" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_3_parent_id_idx" ON "pages_blocks_columns_3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_3_path_idx" ON "pages_blocks_columns_3" USING btree ("_path");
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "pages_pathname_idx" ON "pages" USING btree ("pathname");
  CREATE INDEX "pages_type_idx" ON "pages" USING btree ("type");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_deleted_at_idx" ON "pages" USING btree ("deleted_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_tags_id_idx" ON "pages_rels" USING btree ("tags_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_items_order_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_article_listing_order_idx" ON "_pages_v_blocks_article_listing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_listing_parent_id_idx" ON "_pages_v_blocks_article_listing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_listing_path_idx" ON "_pages_v_blocks_article_listing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_features_items_order_idx" ON "_pages_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_items_parent_id_idx" ON "_pages_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_links_order_idx" ON "_pages_v_blocks_cta_section_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_links_parent_id_idx" ON "_pages_v_blocks_cta_section_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_order_idx" ON "_pages_v_blocks_cta_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_parent_id_idx" ON "_pages_v_blocks_cta_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_path_idx" ON "_pages_v_blocks_cta_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_author_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("author_avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_image_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_order_idx" ON "_pages_v_blocks_two_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_column_parent_id_idx" ON "_pages_v_blocks_two_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_path_idx" ON "_pages_v_blocks_two_column" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_media_idx" ON "_pages_v_blocks_two_column" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_poster_idx" ON "_pages_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_order_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_parent_id_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_marquee_items_order_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_items_parent_id_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_items_image_idx" ON "_pages_v_blocks_marquee_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_order_idx" ON "_pages_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_parent_id_idx" ON "_pages_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_path_idx" ON "_pages_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_fields_options_order_idx" ON "_pages_v_blocks_contact_form_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_fields_order_idx" ON "_pages_v_blocks_contact_form_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_order_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_plans_order_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_parent_id_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_nested_items_order_idx" ON "_pages_v_blocks_accordion_nested_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_nested_items_parent_id_idx" ON "_pages_v_blocks_accordion_nested_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_nested_order_idx" ON "_pages_v_blocks_accordion_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_nested_parent_id_idx" ON "_pages_v_blocks_accordion_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_nested_path_idx" ON "_pages_v_blocks_accordion_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_links_order_idx" ON "_pages_v_blocks_cta_section_nested_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_links_parent_id_idx" ON "_pages_v_blocks_cta_section_nested_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_order_idx" ON "_pages_v_blocks_cta_section_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_parent_id_idx" ON "_pages_v_blocks_cta_section_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_path_idx" ON "_pages_v_blocks_cta_section_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_nested_items_order_idx" ON "_pages_v_blocks_stats_nested_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_nested_items_parent_id_idx" ON "_pages_v_blocks_stats_nested_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_nested_order_idx" ON "_pages_v_blocks_stats_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_nested_parent_id_idx" ON "_pages_v_blocks_stats_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_nested_path_idx" ON "_pages_v_blocks_stats_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_nested_images_order_idx" ON "_pages_v_blocks_gallery_nested_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_nested_images_parent_id_idx" ON "_pages_v_blocks_gallery_nested_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_images_image_idx" ON "_pages_v_blocks_gallery_nested_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_order_idx" ON "_pages_v_blocks_gallery_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_nested_parent_id_idx" ON "_pages_v_blocks_gallery_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_path_idx" ON "_pages_v_blocks_gallery_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_nested_order_idx" ON "_pages_v_blocks_video_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_nested_parent_id_idx" ON "_pages_v_blocks_video_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_nested_path_idx" ON "_pages_v_blocks_video_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_nested_poster_idx" ON "_pages_v_blocks_video_nested" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_spacer_nested_order_idx" ON "_pages_v_blocks_spacer_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_nested_parent_id_idx" ON "_pages_v_blocks_spacer_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_nested_path_idx" ON "_pages_v_blocks_spacer_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_fields_options_order_idx" ON "_pages_v_blocks_contact_form_nested_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_fields_order_idx" ON "_pages_v_blocks_contact_form_nested_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_nested_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_order_idx" ON "_pages_v_blocks_contact_form_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_parent_id_idx" ON "_pages_v_blocks_contact_form_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_nested_path_idx" ON "_pages_v_blocks_contact_form_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_nested_order_idx" ON "_pages_v_blocks_banner_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_nested_parent_id_idx" ON "_pages_v_blocks_banner_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_nested_path_idx" ON "_pages_v_blocks_banner_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_nested_items_order_idx" ON "_pages_v_blocks_faq_nested_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_nested_items_parent_id_idx" ON "_pages_v_blocks_faq_nested_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_nested_order_idx" ON "_pages_v_blocks_faq_nested" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_nested_parent_id_idx" ON "_pages_v_blocks_faq_nested" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_nested_path_idx" ON "_pages_v_blocks_faq_nested" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_columns_columns_order_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_columns_parent_id_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_order_idx" ON "_pages_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_parent_id_idx" ON "_pages_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_path_idx" ON "_pages_v_blocks_columns" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_2_order_idx" ON "_pages_v_blocks_rich_text_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_2_parent_id_idx" ON "_pages_v_blocks_rich_text_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_2_path_idx" ON "_pages_v_blocks_rich_text_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_2_items_order_idx" ON "_pages_v_blocks_accordion_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_2_items_parent_id_idx" ON "_pages_v_blocks_accordion_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_2_order_idx" ON "_pages_v_blocks_accordion_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_2_parent_id_idx" ON "_pages_v_blocks_accordion_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_2_path_idx" ON "_pages_v_blocks_accordion_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_article_listing_2_order_idx" ON "_pages_v_blocks_article_listing_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_listing_2_parent_id_idx" ON "_pages_v_blocks_article_listing_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_listing_2_path_idx" ON "_pages_v_blocks_article_listing_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_2_links_order_idx" ON "_pages_v_blocks_hero_2_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_2_links_parent_id_idx" ON "_pages_v_blocks_hero_2_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_2_order_idx" ON "_pages_v_blocks_hero_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_2_parent_id_idx" ON "_pages_v_blocks_hero_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_2_path_idx" ON "_pages_v_blocks_hero_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_2_media_idx" ON "_pages_v_blocks_hero_2" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_features_2_items_order_idx" ON "_pages_v_blocks_features_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_2_items_parent_id_idx" ON "_pages_v_blocks_features_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_2_order_idx" ON "_pages_v_blocks_features_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_2_parent_id_idx" ON "_pages_v_blocks_features_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_2_path_idx" ON "_pages_v_blocks_features_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_2_links_order_idx" ON "_pages_v_blocks_cta_section_2_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_2_links_parent_id_idx" ON "_pages_v_blocks_cta_section_2_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_2_order_idx" ON "_pages_v_blocks_cta_section_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_2_parent_id_idx" ON "_pages_v_blocks_cta_section_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_2_path_idx" ON "_pages_v_blocks_cta_section_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_2_items_order_idx" ON "_pages_v_blocks_stats_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_2_items_parent_id_idx" ON "_pages_v_blocks_stats_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_2_order_idx" ON "_pages_v_blocks_stats_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_2_parent_id_idx" ON "_pages_v_blocks_stats_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_2_path_idx" ON "_pages_v_blocks_stats_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_2_items_order_idx" ON "_pages_v_blocks_testimonials_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_2_items_parent_id_idx" ON "_pages_v_blocks_testimonials_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_2_items_author_avatar_idx" ON "_pages_v_blocks_testimonials_2_items" USING btree ("author_avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_2_order_idx" ON "_pages_v_blocks_testimonials_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_2_parent_id_idx" ON "_pages_v_blocks_testimonials_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_2_path_idx" ON "_pages_v_blocks_testimonials_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_logos_order_idx" ON "_pages_v_blocks_logo_cloud_2_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_2_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_logos_image_idx" ON "_pages_v_blocks_logo_cloud_2_logos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_order_idx" ON "_pages_v_blocks_logo_cloud_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_parent_id_idx" ON "_pages_v_blocks_logo_cloud_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_2_path_idx" ON "_pages_v_blocks_logo_cloud_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_2_order_idx" ON "_pages_v_blocks_two_column_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_column_2_parent_id_idx" ON "_pages_v_blocks_two_column_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_2_path_idx" ON "_pages_v_blocks_two_column_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_2_media_idx" ON "_pages_v_blocks_two_column_2" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_gallery_2_images_order_idx" ON "_pages_v_blocks_gallery_2_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_2_images_parent_id_idx" ON "_pages_v_blocks_gallery_2_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_2_images_image_idx" ON "_pages_v_blocks_gallery_2_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_2_order_idx" ON "_pages_v_blocks_gallery_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_2_parent_id_idx" ON "_pages_v_blocks_gallery_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_2_path_idx" ON "_pages_v_blocks_gallery_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_2_order_idx" ON "_pages_v_blocks_video_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_2_parent_id_idx" ON "_pages_v_blocks_video_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_2_path_idx" ON "_pages_v_blocks_video_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_2_poster_idx" ON "_pages_v_blocks_video_2" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_team_2_members_social_links_order_idx" ON "_pages_v_blocks_team_2_members_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_2_members_social_links_parent_id_idx" ON "_pages_v_blocks_team_2_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_2_members_order_idx" ON "_pages_v_blocks_team_2_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_2_members_parent_id_idx" ON "_pages_v_blocks_team_2_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_2_members_photo_idx" ON "_pages_v_blocks_team_2_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_2_order_idx" ON "_pages_v_blocks_team_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_2_parent_id_idx" ON "_pages_v_blocks_team_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_2_path_idx" ON "_pages_v_blocks_team_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_marquee_2_items_order_idx" ON "_pages_v_blocks_marquee_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_2_items_parent_id_idx" ON "_pages_v_blocks_marquee_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_2_items_image_idx" ON "_pages_v_blocks_marquee_2_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_marquee_2_order_idx" ON "_pages_v_blocks_marquee_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_2_parent_id_idx" ON "_pages_v_blocks_marquee_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_2_path_idx" ON "_pages_v_blocks_marquee_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_2_order_idx" ON "_pages_v_blocks_spacer_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_2_parent_id_idx" ON "_pages_v_blocks_spacer_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_2_path_idx" ON "_pages_v_blocks_spacer_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_2_fields_options_order_idx" ON "_pages_v_blocks_contact_form_2_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_2_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_2_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_2_fields_order_idx" ON "_pages_v_blocks_contact_form_2_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_2_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_2_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_2_order_idx" ON "_pages_v_blocks_contact_form_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_2_parent_id_idx" ON "_pages_v_blocks_contact_form_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_2_path_idx" ON "_pages_v_blocks_contact_form_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_2_plans_features_order_idx" ON "_pages_v_blocks_pricing_2_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_2_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_2_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_2_plans_order_idx" ON "_pages_v_blocks_pricing_2_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_2_plans_parent_id_idx" ON "_pages_v_blocks_pricing_2_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_2_order_idx" ON "_pages_v_blocks_pricing_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_2_parent_id_idx" ON "_pages_v_blocks_pricing_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_2_path_idx" ON "_pages_v_blocks_pricing_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_2_order_idx" ON "_pages_v_blocks_banner_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_2_parent_id_idx" ON "_pages_v_blocks_banner_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_2_path_idx" ON "_pages_v_blocks_banner_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_2_items_order_idx" ON "_pages_v_blocks_faq_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_2_items_parent_id_idx" ON "_pages_v_blocks_faq_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_2_order_idx" ON "_pages_v_blocks_faq_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_2_parent_id_idx" ON "_pages_v_blocks_faq_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_2_path_idx" ON "_pages_v_blocks_faq_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_items_order_idx" ON "_pages_v_blocks_accordion_nested_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_items_parent_id_idx" ON "_pages_v_blocks_accordion_nested_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_order_idx" ON "_pages_v_blocks_accordion_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_parent_id_idx" ON "_pages_v_blocks_accordion_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_nested_2_path_idx" ON "_pages_v_blocks_accordion_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_links_order_idx" ON "_pages_v_blocks_cta_section_nested_2_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_links_parent_id_idx" ON "_pages_v_blocks_cta_section_nested_2_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_order_idx" ON "_pages_v_blocks_cta_section_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_parent_id_idx" ON "_pages_v_blocks_cta_section_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_2_path_idx" ON "_pages_v_blocks_cta_section_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_items_order_idx" ON "_pages_v_blocks_stats_nested_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_items_parent_id_idx" ON "_pages_v_blocks_stats_nested_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_order_idx" ON "_pages_v_blocks_stats_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_parent_id_idx" ON "_pages_v_blocks_stats_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_nested_2_path_idx" ON "_pages_v_blocks_stats_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_images_order_idx" ON "_pages_v_blocks_gallery_nested_2_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_images_parent_id_idx" ON "_pages_v_blocks_gallery_nested_2_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_images_image_idx" ON "_pages_v_blocks_gallery_nested_2_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_order_idx" ON "_pages_v_blocks_gallery_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_parent_id_idx" ON "_pages_v_blocks_gallery_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_2_path_idx" ON "_pages_v_blocks_gallery_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_nested_2_order_idx" ON "_pages_v_blocks_video_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_nested_2_parent_id_idx" ON "_pages_v_blocks_video_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_nested_2_path_idx" ON "_pages_v_blocks_video_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_nested_2_poster_idx" ON "_pages_v_blocks_video_nested_2" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_banner_nested_2_order_idx" ON "_pages_v_blocks_banner_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_nested_2_parent_id_idx" ON "_pages_v_blocks_banner_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_nested_2_path_idx" ON "_pages_v_blocks_banner_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_items_order_idx" ON "_pages_v_blocks_faq_nested_2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_items_parent_id_idx" ON "_pages_v_blocks_faq_nested_2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_order_idx" ON "_pages_v_blocks_faq_nested_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_parent_id_idx" ON "_pages_v_blocks_faq_nested_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_nested_2_path_idx" ON "_pages_v_blocks_faq_nested_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_columns_2_columns_order_idx" ON "_pages_v_blocks_columns_2_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_2_columns_parent_id_idx" ON "_pages_v_blocks_columns_2_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_2_order_idx" ON "_pages_v_blocks_columns_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_2_parent_id_idx" ON "_pages_v_blocks_columns_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_2_path_idx" ON "_pages_v_blocks_columns_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_3_order_idx" ON "_pages_v_blocks_rich_text_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_3_parent_id_idx" ON "_pages_v_blocks_rich_text_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_3_path_idx" ON "_pages_v_blocks_rich_text_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_3_items_order_idx" ON "_pages_v_blocks_accordion_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_3_items_parent_id_idx" ON "_pages_v_blocks_accordion_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_3_order_idx" ON "_pages_v_blocks_accordion_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_3_parent_id_idx" ON "_pages_v_blocks_accordion_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_3_path_idx" ON "_pages_v_blocks_accordion_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_article_listing_3_order_idx" ON "_pages_v_blocks_article_listing_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_listing_3_parent_id_idx" ON "_pages_v_blocks_article_listing_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_listing_3_path_idx" ON "_pages_v_blocks_article_listing_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_3_links_order_idx" ON "_pages_v_blocks_hero_3_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_3_links_parent_id_idx" ON "_pages_v_blocks_hero_3_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_3_order_idx" ON "_pages_v_blocks_hero_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_3_parent_id_idx" ON "_pages_v_blocks_hero_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_3_path_idx" ON "_pages_v_blocks_hero_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_3_media_idx" ON "_pages_v_blocks_hero_3" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_features_3_items_order_idx" ON "_pages_v_blocks_features_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_3_items_parent_id_idx" ON "_pages_v_blocks_features_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_3_order_idx" ON "_pages_v_blocks_features_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_3_parent_id_idx" ON "_pages_v_blocks_features_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_3_path_idx" ON "_pages_v_blocks_features_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_3_links_order_idx" ON "_pages_v_blocks_cta_section_3_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_3_links_parent_id_idx" ON "_pages_v_blocks_cta_section_3_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_3_order_idx" ON "_pages_v_blocks_cta_section_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_3_parent_id_idx" ON "_pages_v_blocks_cta_section_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_3_path_idx" ON "_pages_v_blocks_cta_section_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_3_items_order_idx" ON "_pages_v_blocks_stats_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_3_items_parent_id_idx" ON "_pages_v_blocks_stats_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_3_order_idx" ON "_pages_v_blocks_stats_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_3_parent_id_idx" ON "_pages_v_blocks_stats_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_3_path_idx" ON "_pages_v_blocks_stats_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_3_items_order_idx" ON "_pages_v_blocks_testimonials_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_3_items_parent_id_idx" ON "_pages_v_blocks_testimonials_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_3_items_author_avatar_idx" ON "_pages_v_blocks_testimonials_3_items" USING btree ("author_avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_3_order_idx" ON "_pages_v_blocks_testimonials_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_3_parent_id_idx" ON "_pages_v_blocks_testimonials_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_3_path_idx" ON "_pages_v_blocks_testimonials_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_logos_order_idx" ON "_pages_v_blocks_logo_cloud_3_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_3_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_logos_image_idx" ON "_pages_v_blocks_logo_cloud_3_logos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_order_idx" ON "_pages_v_blocks_logo_cloud_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_parent_id_idx" ON "_pages_v_blocks_logo_cloud_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_3_path_idx" ON "_pages_v_blocks_logo_cloud_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_3_order_idx" ON "_pages_v_blocks_two_column_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_column_3_parent_id_idx" ON "_pages_v_blocks_two_column_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_3_path_idx" ON "_pages_v_blocks_two_column_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_3_media_idx" ON "_pages_v_blocks_two_column_3" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_gallery_3_images_order_idx" ON "_pages_v_blocks_gallery_3_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_3_images_parent_id_idx" ON "_pages_v_blocks_gallery_3_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_3_images_image_idx" ON "_pages_v_blocks_gallery_3_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_3_order_idx" ON "_pages_v_blocks_gallery_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_3_parent_id_idx" ON "_pages_v_blocks_gallery_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_3_path_idx" ON "_pages_v_blocks_gallery_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_3_order_idx" ON "_pages_v_blocks_video_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_3_parent_id_idx" ON "_pages_v_blocks_video_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_3_path_idx" ON "_pages_v_blocks_video_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_3_poster_idx" ON "_pages_v_blocks_video_3" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_team_3_members_social_links_order_idx" ON "_pages_v_blocks_team_3_members_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_3_members_social_links_parent_id_idx" ON "_pages_v_blocks_team_3_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_3_members_order_idx" ON "_pages_v_blocks_team_3_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_3_members_parent_id_idx" ON "_pages_v_blocks_team_3_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_3_members_photo_idx" ON "_pages_v_blocks_team_3_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_3_order_idx" ON "_pages_v_blocks_team_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_3_parent_id_idx" ON "_pages_v_blocks_team_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_3_path_idx" ON "_pages_v_blocks_team_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_marquee_3_items_order_idx" ON "_pages_v_blocks_marquee_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_3_items_parent_id_idx" ON "_pages_v_blocks_marquee_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_3_items_image_idx" ON "_pages_v_blocks_marquee_3_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_marquee_3_order_idx" ON "_pages_v_blocks_marquee_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_3_parent_id_idx" ON "_pages_v_blocks_marquee_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_3_path_idx" ON "_pages_v_blocks_marquee_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_3_order_idx" ON "_pages_v_blocks_spacer_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_3_parent_id_idx" ON "_pages_v_blocks_spacer_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_3_path_idx" ON "_pages_v_blocks_spacer_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_3_fields_options_order_idx" ON "_pages_v_blocks_contact_form_3_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_3_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_3_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_3_fields_order_idx" ON "_pages_v_blocks_contact_form_3_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_3_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_3_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_3_order_idx" ON "_pages_v_blocks_contact_form_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_3_parent_id_idx" ON "_pages_v_blocks_contact_form_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_3_path_idx" ON "_pages_v_blocks_contact_form_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_3_plans_features_order_idx" ON "_pages_v_blocks_pricing_3_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_3_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_3_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_3_plans_order_idx" ON "_pages_v_blocks_pricing_3_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_3_plans_parent_id_idx" ON "_pages_v_blocks_pricing_3_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_3_order_idx" ON "_pages_v_blocks_pricing_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_3_parent_id_idx" ON "_pages_v_blocks_pricing_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_3_path_idx" ON "_pages_v_blocks_pricing_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_3_order_idx" ON "_pages_v_blocks_banner_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_3_parent_id_idx" ON "_pages_v_blocks_banner_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_3_path_idx" ON "_pages_v_blocks_banner_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_3_items_order_idx" ON "_pages_v_blocks_faq_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_3_items_parent_id_idx" ON "_pages_v_blocks_faq_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_3_order_idx" ON "_pages_v_blocks_faq_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_3_parent_id_idx" ON "_pages_v_blocks_faq_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_3_path_idx" ON "_pages_v_blocks_faq_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_items_order_idx" ON "_pages_v_blocks_accordion_nested_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_items_parent_id_idx" ON "_pages_v_blocks_accordion_nested_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_order_idx" ON "_pages_v_blocks_accordion_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_parent_id_idx" ON "_pages_v_blocks_accordion_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_nested_3_path_idx" ON "_pages_v_blocks_accordion_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_links_order_idx" ON "_pages_v_blocks_cta_section_nested_3_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_links_parent_id_idx" ON "_pages_v_blocks_cta_section_nested_3_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_order_idx" ON "_pages_v_blocks_cta_section_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_parent_id_idx" ON "_pages_v_blocks_cta_section_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_nested_3_path_idx" ON "_pages_v_blocks_cta_section_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_items_order_idx" ON "_pages_v_blocks_stats_nested_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_items_parent_id_idx" ON "_pages_v_blocks_stats_nested_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_order_idx" ON "_pages_v_blocks_stats_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_parent_id_idx" ON "_pages_v_blocks_stats_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_nested_3_path_idx" ON "_pages_v_blocks_stats_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_images_order_idx" ON "_pages_v_blocks_gallery_nested_3_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_images_parent_id_idx" ON "_pages_v_blocks_gallery_nested_3_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_images_image_idx" ON "_pages_v_blocks_gallery_nested_3_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_order_idx" ON "_pages_v_blocks_gallery_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_parent_id_idx" ON "_pages_v_blocks_gallery_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_nested_3_path_idx" ON "_pages_v_blocks_gallery_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_nested_3_order_idx" ON "_pages_v_blocks_video_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_nested_3_parent_id_idx" ON "_pages_v_blocks_video_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_nested_3_path_idx" ON "_pages_v_blocks_video_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_nested_3_poster_idx" ON "_pages_v_blocks_video_nested_3" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_banner_nested_3_order_idx" ON "_pages_v_blocks_banner_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_nested_3_parent_id_idx" ON "_pages_v_blocks_banner_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_nested_3_path_idx" ON "_pages_v_blocks_banner_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_items_order_idx" ON "_pages_v_blocks_faq_nested_3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_items_parent_id_idx" ON "_pages_v_blocks_faq_nested_3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_order_idx" ON "_pages_v_blocks_faq_nested_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_parent_id_idx" ON "_pages_v_blocks_faq_nested_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_nested_3_path_idx" ON "_pages_v_blocks_faq_nested_3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_columns_3_columns_order_idx" ON "_pages_v_blocks_columns_3_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_3_columns_parent_id_idx" ON "_pages_v_blocks_columns_3_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_3_order_idx" ON "_pages_v_blocks_columns_3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_3_parent_id_idx" ON "_pages_v_blocks_columns_3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_3_path_idx" ON "_pages_v_blocks_columns_3" USING btree ("_path");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_pathname_idx" ON "_pages_v" USING btree ("version_pathname");
  CREATE INDEX "_pages_v_version_version_type_idx" ON "_pages_v" USING btree ("version_type");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version_deleted_at_idx" ON "_pages_v" USING btree ("version_deleted_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_texts_order_parent" ON "_pages_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_tags_id_idx" ON "_pages_v_rels" USING btree ("tags_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "accounts_status_idx" ON "accounts" USING btree ("status");
  CREATE INDEX "accounts_owner_idx" ON "accounts" USING btree ("owner_id");
  CREATE INDEX "accounts_updated_at_idx" ON "accounts" USING btree ("updated_at");
  CREATE INDEX "accounts_created_at_idx" ON "accounts" USING btree ("created_at");
  CREATE INDEX "budgets_category_idx" ON "budgets" USING btree ("category_id");
  CREATE INDEX "budgets_status_idx" ON "budgets" USING btree ("status");
  CREATE INDEX "budgets_recurrence_group_id_idx" ON "budgets" USING btree ("recurrence_group_id");
  CREATE INDEX "budgets_owner_idx" ON "budgets" USING btree ("owner_id");
  CREATE INDEX "budgets_updated_at_idx" ON "budgets" USING btree ("updated_at");
  CREATE INDEX "budgets_created_at_idx" ON "budgets" USING btree ("created_at");
  CREATE INDEX "categories_owner_idx" ON "categories" USING btree ("owner_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "members_sessions_order_idx" ON "members_sessions" USING btree ("_order");
  CREATE INDEX "members_sessions_parent_id_idx" ON "members_sessions" USING btree ("_parent_id");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE UNIQUE INDEX "members_email_idx" ON "members" USING btree ("email");
  CREATE INDEX "scheduled_transactions_category_idx" ON "scheduled_transactions" USING btree ("category_id");
  CREATE INDEX "scheduled_transactions_account_idx" ON "scheduled_transactions" USING btree ("account_id");
  CREATE INDEX "scheduled_transactions_owner_idx" ON "scheduled_transactions" USING btree ("owner_id");
  CREATE INDEX "scheduled_transactions_updated_at_idx" ON "scheduled_transactions" USING btree ("updated_at");
  CREATE INDEX "scheduled_transactions_created_at_idx" ON "scheduled_transactions" USING btree ("created_at");
  CREATE INDEX "transactions_account_idx" ON "transactions" USING btree ("account_id");
  CREATE INDEX "transactions_to_account_idx" ON "transactions" USING btree ("to_account_id");
  CREATE INDEX "transactions_category_idx" ON "transactions" USING btree ("category_id");
  CREATE INDEX "transactions_budget_idx" ON "transactions" USING btree ("budget_id");
  CREATE INDEX "transactions_status_idx" ON "transactions" USING btree ("status");
  CREATE INDEX "transactions_owner_idx" ON "transactions" USING btree ("owner_id");
  CREATE INDEX "transactions_updated_at_idx" ON "transactions" USING btree ("updated_at");
  CREATE INDEX "transactions_created_at_idx" ON "transactions" USING btree ("created_at");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "invitation_codes_code_idx" ON "invitation_codes" USING btree ("code");
  CREATE INDEX "invitation_codes_updated_at_idx" ON "invitation_codes" USING btree ("updated_at");
  CREATE INDEX "invitation_codes_created_at_idx" ON "invitation_codes" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE UNIQUE INDEX "tags_name_idx" ON "tags" USING btree ("name");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "tags_deleted_at_idx" ON "tags" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("accounts_id");
  CREATE INDEX "payload_locked_documents_rels_budgets_id_idx" ON "payload_locked_documents_rels" USING btree ("budgets_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_scheduled_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("scheduled_transactions_id");
  CREATE INDEX "payload_locked_documents_rels_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("transactions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_invitation_codes_id_idx" ON "payload_locked_documents_rels" USING btree ("invitation_codes_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_members_id_idx" ON "payload_preferences_rels" USING btree ("members_id");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "footer_navigation_links_order_idx" ON "footer_navigation_links" USING btree ("_order");
  CREATE INDEX "footer_navigation_links_parent_id_idx" ON "footer_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_social_links_order_idx" ON "footer_contact_social_links" USING btree ("_order");
  CREATE INDEX "footer_contact_social_links_parent_id_idx" ON "footer_contact_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_articles_id_idx" ON "footer_rels" USING btree ("articles_id");
  CREATE INDEX "header_nav_links_order_idx" ON "header_nav_links" USING btree ("_order");
  CREATE INDEX "header_nav_links_parent_id_idx" ON "header_nav_links" USING btree ("_parent_id");
  CREATE INDEX "header_logo_logo_image_idx" ON "header" USING btree ("logo_image_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_articles_id_idx" ON "header_rels" USING btree ("articles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_texts" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_article_listing" CASCADE;
  DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_features_items" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_cta_section_links" CASCADE;
  DROP TABLE "pages_blocks_cta_section" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_two_column" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_team_members_social_links" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_spacer" CASCADE;
  DROP TABLE "pages_blocks_contact_form_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_accordion_nested_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_nested" CASCADE;
  DROP TABLE "pages_blocks_cta_section_nested_links" CASCADE;
  DROP TABLE "pages_blocks_cta_section_nested" CASCADE;
  DROP TABLE "pages_blocks_stats_nested_items" CASCADE;
  DROP TABLE "pages_blocks_stats_nested" CASCADE;
  DROP TABLE "pages_blocks_gallery_nested_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_nested" CASCADE;
  DROP TABLE "pages_blocks_video_nested" CASCADE;
  DROP TABLE "pages_blocks_spacer_nested" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form_nested" CASCADE;
  DROP TABLE "pages_blocks_banner_nested" CASCADE;
  DROP TABLE "pages_blocks_faq_nested_items" CASCADE;
  DROP TABLE "pages_blocks_faq_nested" CASCADE;
  DROP TABLE "pages_blocks_columns_columns" CASCADE;
  DROP TABLE "pages_blocks_columns" CASCADE;
  DROP TABLE "pages_blocks_rich_text_2" CASCADE;
  DROP TABLE "pages_blocks_accordion_2_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_2" CASCADE;
  DROP TABLE "pages_blocks_article_listing_2" CASCADE;
  DROP TABLE "pages_blocks_hero_2_links" CASCADE;
  DROP TABLE "pages_blocks_hero_2" CASCADE;
  DROP TABLE "pages_blocks_features_2_items" CASCADE;
  DROP TABLE "pages_blocks_features_2" CASCADE;
  DROP TABLE "pages_blocks_cta_section_2_links" CASCADE;
  DROP TABLE "pages_blocks_cta_section_2" CASCADE;
  DROP TABLE "pages_blocks_stats_2_items" CASCADE;
  DROP TABLE "pages_blocks_stats_2" CASCADE;
  DROP TABLE "pages_blocks_testimonials_2_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials_2" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_2_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_2" CASCADE;
  DROP TABLE "pages_blocks_two_column_2" CASCADE;
  DROP TABLE "pages_blocks_gallery_2_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_2" CASCADE;
  DROP TABLE "pages_blocks_video_2" CASCADE;
  DROP TABLE "pages_blocks_team_2_members_social_links" CASCADE;
  DROP TABLE "pages_blocks_team_2_members" CASCADE;
  DROP TABLE "pages_blocks_team_2" CASCADE;
  DROP TABLE "pages_blocks_marquee_2_items" CASCADE;
  DROP TABLE "pages_blocks_marquee_2" CASCADE;
  DROP TABLE "pages_blocks_spacer_2" CASCADE;
  DROP TABLE "pages_blocks_contact_form_2_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_2_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form_2" CASCADE;
  DROP TABLE "pages_blocks_pricing_2_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_2_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_2" CASCADE;
  DROP TABLE "pages_blocks_banner_2" CASCADE;
  DROP TABLE "pages_blocks_faq_2_items" CASCADE;
  DROP TABLE "pages_blocks_faq_2" CASCADE;
  DROP TABLE "pages_blocks_accordion_nested_2_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_nested_2" CASCADE;
  DROP TABLE "pages_blocks_cta_section_nested_2_links" CASCADE;
  DROP TABLE "pages_blocks_cta_section_nested_2" CASCADE;
  DROP TABLE "pages_blocks_stats_nested_2_items" CASCADE;
  DROP TABLE "pages_blocks_stats_nested_2" CASCADE;
  DROP TABLE "pages_blocks_gallery_nested_2_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_nested_2" CASCADE;
  DROP TABLE "pages_blocks_video_nested_2" CASCADE;
  DROP TABLE "pages_blocks_banner_nested_2" CASCADE;
  DROP TABLE "pages_blocks_faq_nested_2_items" CASCADE;
  DROP TABLE "pages_blocks_faq_nested_2" CASCADE;
  DROP TABLE "pages_blocks_columns_2_columns" CASCADE;
  DROP TABLE "pages_blocks_columns_2" CASCADE;
  DROP TABLE "pages_blocks_rich_text_3" CASCADE;
  DROP TABLE "pages_blocks_accordion_3_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_3" CASCADE;
  DROP TABLE "pages_blocks_article_listing_3" CASCADE;
  DROP TABLE "pages_blocks_hero_3_links" CASCADE;
  DROP TABLE "pages_blocks_hero_3" CASCADE;
  DROP TABLE "pages_blocks_features_3_items" CASCADE;
  DROP TABLE "pages_blocks_features_3" CASCADE;
  DROP TABLE "pages_blocks_cta_section_3_links" CASCADE;
  DROP TABLE "pages_blocks_cta_section_3" CASCADE;
  DROP TABLE "pages_blocks_stats_3_items" CASCADE;
  DROP TABLE "pages_blocks_stats_3" CASCADE;
  DROP TABLE "pages_blocks_testimonials_3_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials_3" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_3_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_3" CASCADE;
  DROP TABLE "pages_blocks_two_column_3" CASCADE;
  DROP TABLE "pages_blocks_gallery_3_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_3" CASCADE;
  DROP TABLE "pages_blocks_video_3" CASCADE;
  DROP TABLE "pages_blocks_team_3_members_social_links" CASCADE;
  DROP TABLE "pages_blocks_team_3_members" CASCADE;
  DROP TABLE "pages_blocks_team_3" CASCADE;
  DROP TABLE "pages_blocks_marquee_3_items" CASCADE;
  DROP TABLE "pages_blocks_marquee_3" CASCADE;
  DROP TABLE "pages_blocks_spacer_3" CASCADE;
  DROP TABLE "pages_blocks_contact_form_3_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_3_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_form_3" CASCADE;
  DROP TABLE "pages_blocks_pricing_3_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_3_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_3" CASCADE;
  DROP TABLE "pages_blocks_banner_3" CASCADE;
  DROP TABLE "pages_blocks_faq_3_items" CASCADE;
  DROP TABLE "pages_blocks_faq_3" CASCADE;
  DROP TABLE "pages_blocks_accordion_nested_3_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_nested_3" CASCADE;
  DROP TABLE "pages_blocks_cta_section_nested_3_links" CASCADE;
  DROP TABLE "pages_blocks_cta_section_nested_3" CASCADE;
  DROP TABLE "pages_blocks_stats_nested_3_items" CASCADE;
  DROP TABLE "pages_blocks_stats_nested_3" CASCADE;
  DROP TABLE "pages_blocks_gallery_nested_3_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_nested_3" CASCADE;
  DROP TABLE "pages_blocks_video_nested_3" CASCADE;
  DROP TABLE "pages_blocks_banner_nested_3" CASCADE;
  DROP TABLE "pages_blocks_faq_nested_3_items" CASCADE;
  DROP TABLE "pages_blocks_faq_nested_3" CASCADE;
  DROP TABLE "pages_blocks_columns_3_columns" CASCADE;
  DROP TABLE "pages_blocks_columns_3" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_article_listing" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_nested_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_nested_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_nested_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_nested_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_video_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_nested_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_nested" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_2" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_2" CASCADE;
  DROP TABLE "_pages_v_blocks_article_listing_2" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_2_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_2" CASCADE;
  DROP TABLE "_pages_v_blocks_features_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features_2" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_2_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_2" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_2" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_2" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_2_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_2" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column_2" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_2_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_2" CASCADE;
  DROP TABLE "_pages_v_blocks_video_2" CASCADE;
  DROP TABLE "_pages_v_blocks_team_2_members_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_team_2_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_2" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_2" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_2" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_2_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_2_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_2" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_2_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_2_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_2" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_2" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_2" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_nested_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_nested_2_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_nested_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_nested_2_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_video_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_nested_2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_nested_2" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_2_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_2" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_3" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_3" CASCADE;
  DROP TABLE "_pages_v_blocks_article_listing_3" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_3_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_3" CASCADE;
  DROP TABLE "_pages_v_blocks_features_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features_3" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_3_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_3" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_3" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_3" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_3_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_3" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column_3" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_3_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_3" CASCADE;
  DROP TABLE "_pages_v_blocks_video_3" CASCADE;
  DROP TABLE "_pages_v_blocks_team_3_members_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_team_3_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_3" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_3" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_3" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_3_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_3_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_3" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_3_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_3_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_3" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_3" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_3" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_nested_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_nested_3_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_nested_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_nested_3_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_video_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_nested_3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_nested_3" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_3_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_3" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_texts" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "accounts" CASCADE;
  DROP TABLE "budgets" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "members_sessions" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "scheduled_transactions" CASCADE;
  DROP TABLE "transactions" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "invitation_codes" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "footer_navigation_links" CASCADE;
  DROP TABLE "footer_contact_social_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "general_settings" CASCADE;
  DROP TABLE "header_nav_links" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "seo_settings" CASCADE;
  DROP TABLE "import_settings" CASCADE;
  DROP TABLE "invitations" CASCADE;
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_pages_blocks_rich_text_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_rich_text_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_accordion_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_preset_base";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_preset_xs";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_preset_sm";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_preset_md";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_preset_lg";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_width_preset_xl";
  DROP TYPE "public"."enum_pages_blocks_accordion_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_accordion_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_accordion_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_article_listing_columns";
  DROP TYPE "public"."enum_pages_blocks_article_listing_sort";
  DROP TYPE "public"."enum_pages_blocks_article_listing_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_article_listing_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_article_listing_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_article_listing_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_hero_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_hero_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_hero_design_layout";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_features_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_features_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_features_design_layout";
  DROP TYPE "public"."enum_pages_blocks_features_design_columns";
  DROP TYPE "public"."enum_pages_blocks_features_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_features_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_section_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_cta_section_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_section_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_design_background";
  DROP TYPE "public"."enum_pages_blocks_cta_section_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_section_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_cta_section_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_stats_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_stats_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_stats_design_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_design_columns";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_testimonials_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_design_layout";
  DROP TYPE "public"."enum_pages_blocks_testimonials_design_columns";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_design_layout";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_design_columns";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_two_column_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_design_media_position";
  DROP TYPE "public"."enum_pages_blocks_two_column_design_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_two_column_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_gallery_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_design_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_design_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_video_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_video_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_video_design_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_video_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_team_members_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_team_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_team_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_team_design_columns";
  DROP TYPE "public"."enum_pages_blocks_team_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_team_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_items_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_marquee_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_design_speed";
  DROP TYPE "public"."enum_pages_blocks_marquee_design_direction";
  DROP TYPE "public"."enum_pages_blocks_marquee_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_marquee_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_height";
  DROP TYPE "public"."enum_pages_blocks_spacer_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_spacer_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_spacer_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_contact_form_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_contact_form_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_plans_period";
  DROP TYPE "public"."enum_pages_blocks_pricing_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_pricing_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_design_columns";
  DROP TYPE "public"."enum_pages_blocks_pricing_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_pricing_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_banner_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_banner_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_banner_design_type";
  DROP TYPE "public"."enum_pages_blocks_banner_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_banner_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_faq_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_nested_design_accordion_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_nested_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_design_background";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_stats_nested_design_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_nested_design_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_nested_design_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_nested_design_columns";
  DROP TYPE "public"."enum_pages_blocks_video_nested_design_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_spacer_nested_height";
  DROP TYPE "public"."enum_pages_blocks_contact_form_nested_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_banner_nested_design_type";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_align_self";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_width_base";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_width_xs";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_width_sm";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_width_md";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_width_lg";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_settings_width_xl";
  DROP TYPE "public"."enum_pages_blocks_columns_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_columns_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_columns_design_gap";
  DROP TYPE "public"."enum_pages_blocks_columns_design_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_columns_design_align_self";
  DROP TYPE "public"."enum_pages_blocks_columns_design_width_base";
  DROP TYPE "public"."enum_pages_blocks_columns_design_width_xs";
  DROP TYPE "public"."enum_pages_blocks_columns_design_width_sm";
  DROP TYPE "public"."enum_pages_blocks_columns_design_width_md";
  DROP TYPE "public"."enum_pages_blocks_columns_design_width_lg";
  DROP TYPE "public"."enum_pages_blocks_columns_design_width_xl";
  DROP TYPE "public"."enum_pages_blocks_columns_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_columns_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_rich_text_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_rich_text_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_accordion_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_base";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_xs";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_sm";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_md";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_lg";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_width_preset_xl";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_accordion_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_article_listing_2_columns";
  DROP TYPE "public"."enum_pages_blocks_article_listing_2_sort";
  DROP TYPE "public"."enum_pages_blocks_article_listing_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_article_listing_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_article_listing_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_article_listing_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_hero_2_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_2_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_2_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_hero_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_hero_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_hero_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_hero_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_hero_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_features_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_features_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_features_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_features_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_features_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_features_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_design_background";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_cta_section_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_stats_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_stats_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_stats_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_stats_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_stats_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_testimonials_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_testimonials_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_testimonials_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_testimonials_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_two_column_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_2_design_media_position";
  DROP TYPE "public"."enum_pages_blocks_two_column_2_design_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_two_column_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_gallery_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_gallery_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_video_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_video_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_video_2_design_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_video_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_team_2_members_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_team_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_team_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_team_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_team_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_team_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_items_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_design_speed";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_design_direction";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_marquee_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_2_height";
  DROP TYPE "public"."enum_pages_blocks_spacer_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_spacer_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_spacer_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_2_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_contact_form_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_contact_form_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_2_plans_period";
  DROP TYPE "public"."enum_pages_blocks_pricing_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_pricing_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_pricing_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_pricing_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_banner_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_banner_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_banner_2_design_type";
  DROP TYPE "public"."enum_pages_blocks_banner_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_banner_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_faq_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_faq_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_faq_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_nested_2_design_accordion_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_nested_2_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_2_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_2_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_2_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_2_design_background";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_2_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_stats_nested_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_nested_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_nested_2_design_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_nested_2_design_columns";
  DROP TYPE "public"."enum_pages_blocks_video_nested_2_design_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_banner_nested_2_design_type";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_align_self";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_base";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_xs";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_sm";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_md";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_lg";
  DROP TYPE "public"."enum_pages_blocks_columns_2_columns_settings_width_xl";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_gap";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_align_self";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_width_base";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_width_xs";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_width_sm";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_width_md";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_width_lg";
  DROP TYPE "public"."enum_pages_blocks_columns_2_design_width_xl";
  DROP TYPE "public"."enum_pages_blocks_columns_2_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_columns_2_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_rich_text_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_rich_text_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_accordion_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_base";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_xs";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_sm";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_md";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_lg";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_width_preset_xl";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_accordion_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_article_listing_3_columns";
  DROP TYPE "public"."enum_pages_blocks_article_listing_3_sort";
  DROP TYPE "public"."enum_pages_blocks_article_listing_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_article_listing_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_article_listing_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_article_listing_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_hero_3_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_3_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_3_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_hero_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_hero_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_hero_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_hero_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_hero_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_features_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_features_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_features_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_features_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_features_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_features_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_design_background";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_cta_section_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_stats_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_stats_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_stats_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_stats_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_stats_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_testimonials_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_testimonials_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_testimonials_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_testimonials_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_two_column_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_3_design_media_position";
  DROP TYPE "public"."enum_pages_blocks_two_column_3_design_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_two_column_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_gallery_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_gallery_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_video_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_video_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_video_3_design_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_video_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_team_3_members_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_team_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_team_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_team_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_team_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_team_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_items_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_design_speed";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_design_direction";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_marquee_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_3_height";
  DROP TYPE "public"."enum_pages_blocks_spacer_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_spacer_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_spacer_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_3_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_contact_form_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_contact_form_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_3_plans_period";
  DROP TYPE "public"."enum_pages_blocks_pricing_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_pricing_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_pricing_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_pricing_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_banner_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_banner_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_banner_3_design_type";
  DROP TYPE "public"."enum_pages_blocks_banner_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_banner_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_faq_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_faq_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_faq_3_settings_container_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_nested_3_design_accordion_type";
  DROP TYPE "public"."enum_pages_blocks_accordion_nested_3_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_3_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_3_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_3_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_3_design_background";
  DROP TYPE "public"."enum_pages_blocks_cta_section_nested_3_design_alignment";
  DROP TYPE "public"."enum_pages_blocks_stats_nested_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_stats_nested_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_nested_3_design_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_nested_3_design_columns";
  DROP TYPE "public"."enum_pages_blocks_video_nested_3_design_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_banner_nested_3_design_type";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_align_self";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_base";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_xs";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_sm";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_md";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_lg";
  DROP TYPE "public"."enum_pages_blocks_columns_3_columns_settings_width_xl";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_spacing";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_spacing_type";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_gap";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_align_self";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_width_base";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_width_xs";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_width_sm";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_width_md";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_width_lg";
  DROP TYPE "public"."enum_pages_blocks_columns_3_design_width_xl";
  DROP TYPE "public"."enum_pages_blocks_columns_3_settings_html_tag";
  DROP TYPE "public"."enum_pages_blocks_columns_3_settings_container_type";
  DROP TYPE "public"."enum_pages_type";
  DROP TYPE "public"."enum_pages_dynamic_collection";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_base";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_xs";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_sm";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_md";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_lg";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_width_preset_xl";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_columns";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_sort";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hero_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_features_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_features_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_features_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_features_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_design_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_stats_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_design_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_design_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_video_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_design_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_video_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_members_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_team_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_team_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_team_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_team_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_items_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_design_speed";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_design_direction";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_height";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_plans_period";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_banner_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_design_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_banner_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_nested_design_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_nested_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_design_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_stats_nested_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_nested_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_nested_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_nested_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_video_nested_design_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_nested_height";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_nested_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_nested_design_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_align_self";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_base";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_xs";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_sm";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_md";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_lg";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_settings_width_xl";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_gap";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_align_self";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_width_base";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_width_xs";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_width_sm";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_width_md";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_width_lg";
  DROP TYPE "public"."enum__pages_v_blocks_columns_design_width_xl";
  DROP TYPE "public"."enum__pages_v_blocks_columns_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_columns_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_base";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_xs";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_sm";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_md";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_lg";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_width_preset_xl";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_2_columns";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_2_sort";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_hero_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_features_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_features_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_features_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_features_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_design_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_stats_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_stats_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_stats_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_2_design_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_2_design_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_video_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_2_design_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_video_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_2_members_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_team_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_team_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_team_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_team_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_items_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_design_speed";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_design_direction";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_2_height";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_2_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_2_plans_period";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_banner_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_2_design_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_banner_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_faq_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_nested_2_design_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_nested_2_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_design_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_2_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_stats_nested_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_nested_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_nested_2_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_nested_2_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_video_nested_2_design_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_banner_nested_2_design_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_align_self";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_base";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_xs";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_sm";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_md";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_lg";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_columns_settings_width_xl";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_gap";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_align_self";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_width_base";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_width_xs";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_width_sm";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_width_md";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_width_lg";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_design_width_xl";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_columns_2_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_base";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_xs";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_sm";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_md";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_lg";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_width_preset_xl";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_3_columns";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_3_sort";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_article_listing_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_hero_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_features_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_features_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_features_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_features_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_design_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_stats_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_stats_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_stats_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_3_design_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_3_design_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_video_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_3_design_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_video_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_3_members_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_team_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_team_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_team_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_team_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_items_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_design_speed";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_design_direction";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_3_height";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_3_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_3_plans_period";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_banner_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_3_design_type";
  DROP TYPE "public"."enum__pages_v_blocks_banner_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_banner_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_faq_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_nested_3_design_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_nested_3_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_design_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_nested_3_design_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_stats_nested_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_stats_nested_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_nested_3_design_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_nested_3_design_columns";
  DROP TYPE "public"."enum__pages_v_blocks_video_nested_3_design_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_banner_nested_3_design_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_align_self";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_base";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_xs";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_sm";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_md";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_lg";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_columns_settings_width_xl";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_spacing_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_gap";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_align_self";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_width_base";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_width_xs";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_width_sm";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_width_md";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_width_lg";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_design_width_xl";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_settings_html_tag";
  DROP TYPE "public"."enum__pages_v_blocks_columns_3_settings_container_type";
  DROP TYPE "public"."enum__pages_v_version_type";
  DROP TYPE "public"."enum__pages_v_version_dynamic_collection";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_accounts_type";
  DROP TYPE "public"."enum_accounts_currency";
  DROP TYPE "public"."enum_accounts_status";
  DROP TYPE "public"."enum_budgets_status";
  DROP TYPE "public"."enum_budgets_recurrence_type";
  DROP TYPE "public"."enum_categories_type";
  DROP TYPE "public"."enum_members_currency";
  DROP TYPE "public"."enum_scheduled_transactions_frequency";
  DROP TYPE "public"."enum_transactions_type";
  DROP TYPE "public"."enum_transactions_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_invitation_codes_status";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_footer_navigation_links_link_type";
  DROP TYPE "public"."enum_footer_contact_social_links_platform";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum_general_settings_typography_heading_font";
  DROP TYPE "public"."enum_general_settings_typography_body_font";
  DROP TYPE "public"."enum_header_nav_links_link_type";
  DROP TYPE "public"."enum_header_logo_type";
  DROP TYPE "public"."enum_header_cta_link_type";`)
}
