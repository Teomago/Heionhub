/**
 * Feature key constants for Payload CMS Lexical editor
 */
export const FEATURE_KEYS = {
  // Text formatting
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  INLINE_CODE: 'inlineCode',
  SUPERSCRIPT: 'superscript',
  SUBSCRIPT: 'subscript',

  // Structure
  PARAGRAPH: 'paragraph',
  HEADING: 'heading',
  ALIGN: 'align',

  // Lists
  UNORDERED_LIST: 'unorderedList',
  ORDERED_LIST: 'orderedList',
  CHECKLIST: 'checklist',
  INDENT: 'indent',

  // Block elements
  BLOCKQUOTE: 'blockquote',
  HORIZONTAL_RULE: 'horizontalRule',

  // Interactive
  LINK: 'link',
  UPLOAD: 'upload',
  RELATIONSHIP: 'relationship',
  BLOCKS: 'blocks',

  // UI
  TOOLBAR_INLINE: 'toolbarInline',
  TREE_VIEW: 'treeView',

  TEXT_STATE: 'textState',
} as const
