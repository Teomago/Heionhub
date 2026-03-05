import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  TextStateFeature,
  TreeViewFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

export const rootEditor = lexicalEditor({
  features: () => {
    const coreFeatures = [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      InlineCodeFeature(),
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      AlignFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
      InlineToolbarFeature(),
      LinkFeature(),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'disableCaption',
                type: 'checkbox',
              },
            ],
          },
        },
      }),
      BlocksFeature({ blocks: ['callToAction' as any], inlineBlocks: ['icon' as any] }),
      TextStateFeature({
        state: {
          color: {
            muted: {
              label: 'Muted',
              css: {
                color: 'light-dark(oklch(0.556 0 0), oklch(0.708 0 0))',
              },
            },
          },
        },
      }),
    ]

    if (process.env.LEXICAL_TREE_VIEW) {
      coreFeatures.push(TreeViewFeature())
    }

    return coreFeatures
  },
})
