import { cva, type VariantProps } from 'class-variance-authority'

export const spaceVariants = cva('', {
  variants: {
    type: {
      margin: '',
      padding: '',
    },
    variant: {
      top: '',
      bottom: '',
      y: '',
    },
    size: {
      xs: '', // 32px (8)
      sm: '', // 48px (12)
      md: '', // 64px (16)
      lg: '', // 96px (24)
      xl: '', // 128px (32)
      none: '',
    },
  },
  compoundVariants: [
    // Margin Top
    {
      type: 'margin',
      variant: 'top',
      size: 'xs',
      class: 'mt-8',
    },
    {
      type: 'margin',
      variant: 'top',
      size: 'sm',
      class: 'mt-12',
    },
    {
      type: 'margin',
      variant: 'top',
      size: 'md',
      class: 'mt-16',
    },
    {
      type: 'margin',
      variant: 'top',
      size: 'lg',
      class: 'mt-24',
    },
    {
      type: 'margin',
      variant: 'top',
      size: 'xl',
      class: 'mt-32',
    },
    // Margin Bottom
    {
      type: 'margin',
      variant: 'bottom',
      size: 'xs',
      class: 'mb-8',
    },
    {
      type: 'margin',
      variant: 'bottom',
      size: 'sm',
      class: 'mb-12',
    },
    {
      type: 'margin',
      variant: 'bottom',
      size: 'md',
      class: 'mb-16',
    },
    {
      type: 'margin',
      variant: 'bottom',
      size: 'lg',
      class: 'mb-24',
    },
    {
      type: 'margin',
      variant: 'bottom',
      size: 'xl',
      class: 'mb-32',
    },
    // Margin Y (top & bottom)
    {
      type: 'margin',
      variant: 'y',
      size: 'xs',
      class: 'my-8',
    },
    {
      type: 'margin',
      variant: 'y',
      size: 'sm',
      class: 'my-12',
    },
    {
      type: 'margin',
      variant: 'y',
      size: 'md',
      class: 'my-16',
    },
    {
      type: 'margin',
      variant: 'y',
      size: 'lg',
      class: 'my-24',
    },
    {
      type: 'margin',
      variant: 'y',
      size: 'xl',
      class: 'my-32',
    },
    // Padding Top
    {
      type: 'padding',
      variant: 'top',
      size: 'xs',
      class: 'pt-8',
    },
    {
      type: 'padding',
      variant: 'top',
      size: 'sm',
      class: 'pt-12',
    },
    {
      type: 'padding',
      variant: 'top',
      size: 'md',
      class: 'pt-16',
    },
    {
      type: 'padding',
      variant: 'top',
      size: 'lg',
      class: 'pt-24',
    },
    {
      type: 'padding',
      variant: 'top',
      size: 'xl',
      class: 'pt-32',
    },
    // Padding Bottom
    {
      type: 'padding',
      variant: 'bottom',
      size: 'xs',
      class: 'pb-8',
    },
    {
      type: 'padding',
      variant: 'bottom',
      size: 'sm',
      class: 'pb-12',
    },
    {
      type: 'padding',
      variant: 'bottom',
      size: 'md',
      class: 'pb-16',
    },
    {
      type: 'padding',
      variant: 'bottom',
      size: 'lg',
      class: 'pb-24',
    },
    {
      type: 'padding',
      variant: 'bottom',
      size: 'xl',
      class: 'pb-32',
    },
    // Padding Y (top & bottom)
    {
      type: 'padding',
      variant: 'y',
      size: 'xs',
      class: 'py-8',
    },
    {
      type: 'padding',
      variant: 'y',
      size: 'sm',
      class: 'py-12',
    },
    {
      type: 'padding',
      variant: 'y',
      size: 'md',
      class: 'py-16',
    },
    {
      type: 'padding',
      variant: 'y',
      size: 'lg',
      class: 'py-24',
    },
    {
      type: 'padding',
      variant: 'y',
      size: 'xl',
      class: 'py-32',
    },
  ],
  defaultVariants: {
    type: 'margin',
    variant: 'y',
    size: 'md',
  },
})

export type SpaceVariantProps = VariantProps<typeof spaceVariants>
