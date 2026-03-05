import { cva, type VariantProps } from 'class-variance-authority'

export const containerVariants = cva(undefined, {
  variants: {
    type: {
      default: '',
      post: '',
      none: '',
    },
    container: {
      true: '',
      false: '',
    },
    variant: {
      standard: '',
      richText: '',
    },
  },
  compoundVariants: [
    {
      type: 'default',
      container: true,
      variant: 'standard',
      class: 'container',
    },
    {
      type: 'post',
      container: true,
      variant: 'standard',
      class: 'container-post',
    },
    {
      type: 'default',
      container: true,
      variant: 'richText',
      class: 'rich-text-container',
    },
    {
      type: 'post',
      container: true,
      variant: 'richText',
      class: 'rich-text-container-post',
    },
  ],
  defaultVariants: {
    type: 'default',
    container: true,
    variant: 'standard',
  },
})

export type ContainerVariantProps = VariantProps<typeof containerVariants>
