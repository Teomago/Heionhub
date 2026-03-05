import { deepMerge } from '@/lib/utils'
import type { Field, LabelFunction, Tab, TabsField } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'
import {
  getDesignDefaultFields,
  getGeneralDefaultFields,
  getSettingsDefaultFields,
  TAB_NAMES,
  type BlockTabsDefaultsConfig,
} from './defaults'
import { filterFieldsByRenderFor } from './renderFor'

type TabFieldsInput = Field[] | ((defaults: Field[]) => Field[])

/**
 * Per-tab fields when using the object form of `fields`.
 * Each key is optional; omitted tabs use their default fields.
 * Use field.admin.custom.renderIn ('block' | 'inline' | array) to restrict to variant (blockTabsFactory).
 */
export type BlockTabsFieldsByTab = {
  general?: Field[] | ((defaults: Field[]) => Field[])
  design?: TabFieldsInput
  settings?: TabFieldsInput
}

export type BlockTabsOptions = {
  /** When true, General tab gets blockPrefix() and Settings tab gets withPrefix checkbox. */
  prefix?: boolean
  /** When true, Settings tab gets withSuffix checkbox. */
  suffix?: boolean
  /**
   * Array = fields for the General tab only (defaults + these). Design and Settings use their defaults.
   * Object = per-tab: fields.general, fields.design, fields.settings (each optional; extend or replace defaults).
   * Use field.admin.custom.renderIn to restrict to block/inline variant (blockTabsFactory).
   */
  fields: Field[] | BlockTabsFieldsByTab
  /**
   * Config for default field options and default values (htmlTag, containerType, spacing, spacingType).
   * Lives outside fields; stable, extensible API.
   */
  defaults?: BlockTabsDefaultsConfig
  overrides?: Partial<TabsField>
  /** 'inline' = no block-level default fields (Design/Settings defaults omitted). Default 'block'. */
  variant?: 'block' | 'inline'
}

const TAB_LABELS: Record<(typeof TAB_NAMES)[number], LabelFunction> = {
  general: getTranslation('general:general'),
  design: getTranslation('fields:design'),
  settings: getTranslation('general:settings'),
}

const resolveFields = (input: TabFieldsInput | undefined, defaults: Field[]): Field[] => {
  if (input === undefined) return defaults
  if (typeof input === 'function') return input(defaults)
  return input
}

const resolveGeneralFields = (
  input: Field[] | ((defaults: Field[]) => Field[]) | undefined,
  defaults: Field[],
): Field[] => {
  if (input === undefined) return defaults
  if (typeof input === 'function') return input(defaults)
  return [...defaults, ...input]
}

/**
 * Build block fields with three tabs (General, Design, Settings).
 * - fields: array = General tab only (defaults + array); object = fields.general, fields.design, fields.settings.
 * - defaults: config for default field options/defaults (htmlTag, containerType, spacing, spacingType).
 * - Tabs with no fields are omitted; single tab = no tab wrapper.
 */
export const blockTabs = (options: BlockTabsOptions): Field[] => {
  const {
    prefix = false,
    suffix = false,
    fields,
    defaults: defaultsConfig,
    overrides = {},
    variant = 'block',
  } = options

  const generalDefaults = getGeneralDefaultFields(prefix, suffix)
  const designDefaults = getDesignDefaultFields(defaultsConfig, variant)
  const settingsDefaults = getSettingsDefaultFields(prefix, suffix, defaultsConfig, variant)

  const isArrayFields = Array.isArray(fields)

  const resolvedGeneral = isArrayFields
    ? [...generalDefaults, ...fields]
    : resolveGeneralFields(fields.general, generalDefaults)

  const resolvedDesign = isArrayFields
    ? designDefaults
    : resolveFields(fields.design, designDefaults)
  const resolvedSettings = isArrayFields
    ? settingsDefaults
    : resolveFields(fields.settings, settingsDefaults)

  // When variant is set (blockTabsFactory), filter by admin.custom.renderIn so only allowed fields are included.
  const forVariant = (arr: Field[]): Field[] => filterFieldsByRenderFor(arr, variant)
  const filteredGeneral = forVariant(resolvedGeneral)
  const filteredDesign = forVariant(resolvedDesign)
  const filteredSettings = forVariant(resolvedSettings)

  // General tab: label only, no name — fields are stored at block root (UnnamedTab).
  // Design and Settings: name + label — fields stored under data.design and data.settings (NamedTab).
  const tabs: Tab[] = []
  if (filteredGeneral.length > 0) {
    tabs.push({ label: TAB_LABELS.general, fields: filteredGeneral })
  }
  if (filteredDesign.length > 0) {
    tabs.push({ name: 'design', label: TAB_LABELS.design, fields: filteredDesign })
  }
  if (filteredSettings.length > 0) {
    tabs.push({ name: 'settings', label: TAB_LABELS.settings, fields: filteredSettings })
  }

  if (tabs.length === 0) {
    return []
  }
  if (tabs.length === 1) {
    return tabs[0].fields
  }

  const baseField: TabsField = {
    type: 'tabs',
    tabs,
  }
  return [deepMerge(baseField, overrides)]
}
