'use client'

import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Menu,
  X,
  Globe,
  Mail,
  Phone,
  Share2,
  MessageCircle,
  Send,
  MapPin,
  FileText,
  Image,
  Video,
  Newspaper,
  BookOpen,
  Tag,
  Quote,
  Check,
  CheckCircle,
  Star,
  Heart,
  Search,
  Settings,
  User,
  Users,
  Bell,
  Calendar,
  Clock,
  Download,
  Upload,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  LayoutGrid,
  Columns3,
  List,
  PanelTop,
  PanelBottom,
  Maximize2,
  Eye,
  Zap,
  Sparkles,
  type LucideProps,
} from 'lucide-react'

const iconComponents: Record<string, React.FC<LucideProps>> = {
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-up-right': ArrowUpRight,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'external-link': ExternalLink,
  menu: Menu,
  x: X,
  globe: Globe,
  mail: Mail,
  phone: Phone,
  'share-2': Share2,
  'message-circle': MessageCircle,
  send: Send,
  'map-pin': MapPin,
  'file-text': FileText,
  image: Image,
  video: Video,
  newspaper: Newspaper,
  'book-open': BookOpen,
  tag: Tag,
  quote: Quote,
  check: Check,
  'check-circle': CheckCircle,
  star: Star,
  heart: Heart,
  search: Search,
  settings: Settings,
  user: User,
  users: Users,
  bell: Bell,
  calendar: Calendar,
  clock: Clock,
  download: Download,
  upload: Upload,
  plus: Plus,
  minus: Minus,
  info: Info,
  'alert-triangle': AlertTriangle,
  'layout-grid': LayoutGrid,
  'columns-3': Columns3,
  list: List,
  'panel-top': PanelTop,
  'panel-bottom': PanelBottom,
  'maximize-2': Maximize2,
  eye: Eye,
  zap: Zap,
  sparkles: Sparkles,
}

interface IconProps {
  /** Lucide icon name in kebab-case (e.g., "arrow-right", "shield-check") */
  name: string
  /** Icon size in pixels */
  size?: number
  /** Additional CSS class names */
  className?: string
}

/**
 * Renders a Lucide icon by name (kebab-case).
 * Uses a static map to prevent 1500+ chunk compilation issues.
 */
export function Icon({ name, size = 24, className }: IconProps) {
  if (!name) return null
  const IconComponent = iconComponents[name]
  if (!IconComponent)
    return (
      <span
        style={{ width: size, height: size, display: 'inline-block' }}
        className={className}
        title={name}
      >
        ?
      </span>
    )
  return <IconComponent size={size} className={className} />
}
