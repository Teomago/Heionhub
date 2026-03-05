export enum IconCategory {
  Text = 'text',
  Design = 'design',
  Layout = 'layout',
  Navigation = 'navigation',
  Social = 'social',
}
export const iconsData: Array<{
  name: string
  categories: string[]
  tags: string[]
}> = [
  // ─── Navigation & Arrows ───
  { name: 'arrow-right', categories: ['navigation'], tags: ['forward', 'next', 'direction'] },
  { name: 'arrow-left', categories: ['navigation'], tags: ['back', 'previous', 'direction'] },
  { name: 'arrow-up', categories: ['navigation'], tags: ['up', 'direction'] },
  { name: 'arrow-down', categories: ['navigation'], tags: ['down', 'direction'] },
  { name: 'arrow-up-right', categories: ['navigation'], tags: ['external', 'link', 'diagonal'] },
  { name: 'chevron-right', categories: ['navigation'], tags: ['next', 'forward', 'arrow'] },
  { name: 'chevron-left', categories: ['navigation'], tags: ['back', 'previous', 'arrow'] },
  { name: 'chevron-down', categories: ['navigation'], tags: ['expand', 'dropdown', 'arrow'] },
  { name: 'chevron-up', categories: ['navigation'], tags: ['collapse', 'arrow'] },
  { name: 'external-link', categories: ['navigation'], tags: ['link', 'open', 'new tab'] },
  { name: 'menu', categories: ['navigation'], tags: ['hamburger', 'navigation', 'sidebar'] },
  { name: 'x', categories: ['navigation'], tags: ['close', 'dismiss', 'cancel'] },

  // ─── Social & Communication ───
  { name: 'globe', categories: ['social'], tags: ['website', 'world', 'internet', 'language'] },
  { name: 'mail', categories: ['social'], tags: ['email', 'message', 'envelope', 'contact'] },
  { name: 'phone', categories: ['social'], tags: ['call', 'contact', 'telephone'] },
  { name: 'share-2', categories: ['social'], tags: ['share', 'social', 'network'] },
  { name: 'message-circle', categories: ['social'], tags: ['chat', 'comment', 'feedback'] },
  { name: 'send', categories: ['social'], tags: ['submit', 'email', 'paper plane'] },
  { name: 'map-pin', categories: ['social'], tags: ['location', 'address', 'place', 'marker'] },

  // ─── Content & Media ───
  { name: 'file-text', categories: ['text'], tags: ['document', 'page', 'article'] },
  { name: 'image', categories: ['design'], tags: ['photo', 'picture', 'media'] },
  { name: 'video', categories: ['design'], tags: ['film', 'movie', 'media', 'play'] },
  { name: 'newspaper', categories: ['text'], tags: ['article', 'blog', 'news', 'press'] },
  { name: 'book-open', categories: ['text'], tags: ['read', 'documentation', 'guide'] },
  { name: 'tag', categories: ['text'], tags: ['label', 'category', 'price'] },
  { name: 'quote', categories: ['text'], tags: ['blockquote', 'citation', 'testimonial'] },

  // ─── UI Elements ───
  { name: 'check', categories: ['design'], tags: ['done', 'complete', 'success', 'tick'] },
  { name: 'check-circle', categories: ['design'], tags: ['done', 'approved', 'verified'] },
  { name: 'star', categories: ['design'], tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'heart', categories: ['design'], tags: ['love', 'like', 'favorite'] },
  { name: 'search', categories: ['navigation'], tags: ['find', 'magnifying glass', 'lookup'] },
  { name: 'settings', categories: ['design'], tags: ['gear', 'preferences', 'configuration'] },
  { name: 'user', categories: ['social'], tags: ['person', 'account', 'profile'] },
  { name: 'users', categories: ['social'], tags: ['people', 'group', 'team'] },
  { name: 'bell', categories: ['design'], tags: ['notification', 'alert', 'reminder'] },
  { name: 'calendar', categories: ['design'], tags: ['date', 'schedule', 'event'] },
  { name: 'clock', categories: ['design'], tags: ['time', 'schedule', 'duration'] },
  { name: 'download', categories: ['navigation'], tags: ['save', 'export', 'file'] },
  { name: 'upload', categories: ['navigation'], tags: ['import', 'file', 'cloud'] },
  { name: 'plus', categories: ['design'], tags: ['add', 'create', 'new'] },
  { name: 'minus', categories: ['design'], tags: ['remove', 'subtract', 'less'] },
  { name: 'info', categories: ['design'], tags: ['information', 'help', 'about'] },
  { name: 'alert-triangle', categories: ['design'], tags: ['warning', 'caution', 'danger'] },

  // ─── Layout & Design ───
  { name: 'layout-grid', categories: ['layout'], tags: ['grid', 'gallery', 'masonry'] },
  { name: 'columns-3', categories: ['layout'], tags: ['layout', 'grid', 'split'] },
  { name: 'list', categories: ['layout'], tags: ['items', 'menu', 'bullet'] },
  { name: 'panel-top', categories: ['layout'], tags: ['header', 'navigation', 'top'] },
  { name: 'panel-bottom', categories: ['layout'], tags: ['footer', 'bottom', 'bar'] },
  { name: 'maximize-2', categories: ['layout'], tags: ['fullscreen', 'expand', 'resize'] },
  { name: 'eye', categories: ['design'], tags: ['view', 'visible', 'preview'] },
  { name: 'zap', categories: ['design'], tags: ['flash', 'lightning', 'energy', 'fast'] },
  { name: 'sparkles', categories: ['design'], tags: ['ai', 'magic', 'new', 'special'] },
]
