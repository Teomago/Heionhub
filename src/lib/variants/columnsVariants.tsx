import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Grid columns variants for the Columns block
 *
 * Uses CSS Grid with responsive breakpoints.
 * For equal columns: use gridCols directly
 * For custom widths: use grid-cols-12 with col-span-{n}
 */
export const columnsVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    cols: 2,
    gap: 'md',
    align: 'stretch',
  },
})

export type ColumnsVariantProps = VariantProps<typeof columnsVariants>

/**
 * Smart responsive defaults based on column count
 * Mobile-first: stacks on mobile, progressively shows more columns
 */
export const LAYOUT_DEFAULTS: Record<number, { base: number; sm: number; md: number; lg: number }> =
  {
    2: { base: 1, sm: 2, md: 2, lg: 2 },
    3: { base: 1, sm: 2, md: 3, lg: 3 },
    4: { base: 1, sm: 2, md: 4, lg: 4 },
    5: { base: 1, sm: 2, md: 3, lg: 5 },
    6: { base: 1, sm: 2, md: 3, lg: 6 },
  }

export type LayoutBreakpoint = 'base' | 'sm' | 'md' | 'lg'
export type LayoutConfig = Partial<Record<LayoutBreakpoint, number | string | null>>

/**
 * Responsive grid column classes for equal-width mode
 */
export const responsiveGridColsClasses = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  },
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  },
} as const

/**
 * Responsive column span classes for custom width mode
 */
export const responsiveColSpanClasses = {
  base: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  },
  xs: {
    1: 'xs:col-span-1',
    2: 'xs:col-span-2',
    3: 'xs:col-span-3',
    4: 'xs:col-span-4',
    5: 'xs:col-span-5',
    6: 'xs:col-span-6',
    7: 'xs:col-span-7',
    8: 'xs:col-span-8',
    9: 'xs:col-span-9',
    10: 'xs:col-span-10',
    11: 'xs:col-span-11',
    12: 'xs:col-span-12',
  },
  sm: {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6',
    7: 'sm:col-span-7',
    8: 'sm:col-span-8',
    9: 'sm:col-span-9',
    10: 'sm:col-span-10',
    11: 'sm:col-span-11',
    12: 'sm:col-span-12',
  },
  md: {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  },
  lg: {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  },
  xl: {
    1: 'xl:col-span-1',
    2: 'xl:col-span-2',
    3: 'xl:col-span-3',
    4: 'xl:col-span-4',
    5: 'xl:col-span-5',
    6: 'xl:col-span-6',
    7: 'xl:col-span-7',
    8: 'xl:col-span-8',
    9: 'xl:col-span-9',
    10: 'xl:col-span-10',
    11: 'xl:col-span-11',
    12: 'xl:col-span-12',
  },
} as const

type ColSpanKey = keyof typeof responsiveColSpanClasses.base
type GridColsKey = keyof typeof responsiveGridColsClasses.base

/**
 * Generate responsive grid classes for equal-width columns
 *
 * Uses mobile-first cascading: if a breakpoint is empty, it inherits from the previous.
 *
 * @param columnCount - Number of columns (2-6)
 * @param layout - Custom layout config (overrides defaults)
 * @returns Array of Tailwind classes
 */
export const getResponsiveGridClasses = (
  columnCount: number,
  layout?: LayoutConfig | null,
): string[] => {
  const defaults = LAYOUT_DEFAULTS[columnCount] || LAYOUT_DEFAULTS[2]
  const classes: string[] = []

  const getValue = (breakpoint: LayoutBreakpoint, defaultVal: number): number | null => {
    const customVal = layout?.[breakpoint]
    if (customVal === '' || customVal === null || customVal === undefined) {
      return layout ? null : defaultVal
    }
    return typeof customVal === 'number' ? customVal : parseInt(customVal, 10)
  }

  let lastValue = 1

  // Base (mobile)
  const baseValue = getValue('base', defaults.base)
  if (baseValue && baseValue > 0) {
    lastValue = baseValue
    classes.push(responsiveGridColsClasses.base[baseValue as GridColsKey])
  }

  // sm (tablet)
  const smValue = getValue('sm', defaults.sm)
  if (smValue && smValue > 0 && smValue !== lastValue) {
    lastValue = smValue
    classes.push(responsiveGridColsClasses.sm[smValue as GridColsKey])
  }

  // md (desktop)
  const mdValue = getValue('md', defaults.md)
  if (mdValue && mdValue > 0 && mdValue !== lastValue) {
    lastValue = mdValue
    classes.push(responsiveGridColsClasses.md[mdValue as GridColsKey])
  }

  // lg (large desktop)
  const lgValue = getValue('lg', defaults.lg)
  if (lgValue && lgValue > 0 && lgValue !== lastValue) {
    classes.push(responsiveGridColsClasses.lg[lgValue as GridColsKey])
  }

  return classes
}

export type ResponsiveWidth = {
  base?: string | null
  xs?: string | null
  sm?: string | null
  md?: string | null
  lg?: string | null
  xl?: string | null
  id?: string | null
}

/**
 * Generate responsive column span classes for a single column
 *
 * Uses mobile-first cascading: if a breakpoint is empty, it inherits from the previous.
 *
 * @param width - Width config with responsive values
 * @param fallbackSpan - Default span if no base is specified
 * @returns Combined class string
 */
export const getResponsiveColSpanClasses = (
  width: ResponsiveWidth | undefined,
  fallbackSpan: number = 12,
): string => {
  if (!width) {
    return responsiveColSpanClasses.base[fallbackSpan as ColSpanKey] || 'col-span-12'
  }

  const classes: string[] = []
  let lastValue = fallbackSpan

  const parseValue = (val: string | null | undefined): number | null => {
    if (!val || val === '') return null
    return parseInt(val, 10)
  }

  // Base
  const baseValue = parseValue(width.base)
  if (baseValue && baseValue > 0 && baseValue <= 12) {
    lastValue = baseValue
    classes.push(responsiveColSpanClasses.base[baseValue as ColSpanKey])
  } else {
    classes.push(responsiveColSpanClasses.base[fallbackSpan as ColSpanKey])
  }

  // xs
  const xsValue = parseValue(width.xs)
  if (xsValue && xsValue > 0 && xsValue <= 12 && xsValue !== lastValue) {
    lastValue = xsValue
    classes.push(responsiveColSpanClasses.xs[xsValue as ColSpanKey])
  }

  // sm
  const smValue = parseValue(width.sm)
  if (smValue && smValue > 0 && smValue <= 12 && smValue !== lastValue) {
    lastValue = smValue
    classes.push(responsiveColSpanClasses.sm[smValue as ColSpanKey])
  }

  // md
  const mdValue = parseValue(width.md)
  if (mdValue && mdValue > 0 && mdValue <= 12 && mdValue !== lastValue) {
    lastValue = mdValue
    classes.push(responsiveColSpanClasses.md[mdValue as ColSpanKey])
  }

  // lg
  const lgValue = parseValue(width.lg)
  if (lgValue && lgValue > 0 && lgValue <= 12 && lgValue !== lastValue) {
    lastValue = lgValue
    classes.push(responsiveColSpanClasses.lg[lgValue as ColSpanKey])
  }

  // xl
  const xlValue = parseValue(width.xl)
  if (xlValue && xlValue > 0 && xlValue <= 12 && xlValue !== lastValue) {
    classes.push(responsiveColSpanClasses.xl[xlValue as ColSpanKey])
  }

  return classes.join(' ')
}
