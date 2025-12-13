'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Home,
  Utensils,
  Car,
  Zap,
  Music,
  Heart,
  GraduationCap,
  ShoppingBag,
  Plane,
  MoreHorizontal,
  Wallet,
  CreditCard,
  Laptop,
  Coffee,
  Gift,
  Pill,
  Dumbbell,
  Book,
  Briefcase,
  Bus,
  Train,
  Bike,
  Fuel,
  Wrench,
  Hammer,
  PaintBucket,
  Scissors,
  Shirt,
  DollarSign,
  TrendingUp,
  PiggyBank,
  Coins,
  Receipt,
  Tag,
  Smartphone,
  Tv,
  Gamepad2,
  Camera,
  Headphones,
  Watch,
  Pizza,
  Beer,
  Wine,
  IceCream,
  Cake,
  Apple,
  Carrot,
  Fish,
  Egg,
  Soup,
  Candy,
  Popcorn,
  Cookie,
  Donut,
  Croissant,
  CloudRain,
  Sun,
  Moon,
  Star,
  Sparkles,
  Trophy,
  Award,
  Medal,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  home: Home,
  food: Utensils,
  car: Car,
  utility: Zap,
  entertainment: Music,
  health: Heart,
  education: GraduationCap,
  shopping: ShoppingBag,
  travel: Plane,
  other: MoreHorizontal,
  wallet: Wallet,
  credit: CreditCard,
  laptop: Laptop,
  coffee: Coffee,
  gift: Gift,
  pill: Pill,
  gym: Dumbbell,
  book: Book,
  briefcase: Briefcase,
  bus: Bus,
  train: Train,
  bike: Bike,
  fuel: Fuel,
  wrench: Wrench,
  hammer: Hammer,
  paint: PaintBucket,
  scissors: Scissors,
  shirt: Shirt,
  dollar: DollarSign,
  trending: TrendingUp,
  piggy: PiggyBank,
  coins: Coins,
  receipt: Receipt,
  tag: Tag,
  phone: Smartphone,
  tv: Tv,
  game: Gamepad2,
  camera: Camera,
  headphones: Headphones,
  watch: Watch,
  pizza: Pizza,
  beer: Beer,
  wine: Wine,
  icecream: IceCream,
  cake: Cake,
  apple: Apple,
  carrot: Carrot,
  fish: Fish,
  egg: Egg,
  soup: Soup,
  candy: Candy,
  popcorn: Popcorn,
  cookie: Cookie,
  donut: Donut,
  croissant: Croissant,
  rain: CloudRain,
  sun: Sun,
  moon: Moon,
  star: Star,
  sparkles: Sparkles,
  trophy: Trophy,
  award: Award,
  medal: Medal,
}

type FinancialRecord = {
  id: string
  type: string
  amount: number
  category: string
  date: string
  description?: string | null
  tags?: Array<string | { id: string; name: string; icon?: string | null; color?: string | null }> | null
}

interface RecordsTableReadonlyProps {
  records: FinancialRecord[]
  title: string
  description?: string
}

export function RecordsTableReadonly({ records, title, description }: RecordsTableReadonlyProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description || 'Recent records in this category.'}</CardDescription>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No records found.</div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-md border">
              <div className="border-b p-4 grid grid-cols-5 gap-4 font-medium text-sm">
                <div>Date</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Description</div>
                <div>Tags</div>
              </div>
              <div className="divide-y">
                {records.map((record) => (
                  <div key={record.id} className="p-4 grid grid-cols-5 gap-4 text-sm items-center">
                    <div>{new Date(record.date).toLocaleDateString()}</div>
                    <div className="capitalize">{record.type}</div>
                    <div
                      className={
                        record.type === 'income'
                          ? 'text-emerald-500 font-semibold'
                          : record.type === 'expense'
                            ? 'text-red-500 font-semibold'
                            : 'text-blue-500 font-semibold'
                      }
                    >
                      ${record.amount.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground truncate">
                      {record.description || 'No description'}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {record.tags?.map((tag) => {
                        if (typeof tag === 'string') return null
                        const TagIcon = tag.icon ? iconMap[tag.icon] : null
                        const tagColor = tag.color || '#ffffff'
                        return (
                          <span key={tag.id} className="flex items-center gap-1 text-xs">
                            {TagIcon && (
                              <TagIcon className="h-3.5 w-3.5" style={{ color: tagColor }} />
                            )}
                            <span>{tag.name}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {records.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                    <span className="capitalize font-medium">{record.type}</span>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      record.type === 'income'
                        ? 'text-emerald-500'
                        : record.type === 'expense'
                          ? 'text-red-500'
                          : 'text-blue-500'
                    }`}
                  >
                    ${record.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {record.description || 'No description'}
                  </div>
                  <div className="flex gap-2 flex-wrap text-sm">
                    {record.tags?.map((tag) => {
                      if (typeof tag === 'string') return null
                      const TIcon = tag.icon ? iconMap[tag.icon] : null
                      const tColor = tag.color || '#ffffff'
                      return (
                        <span key={tag.id} className="flex items-center gap-1">
                          {TIcon && <TIcon className="h-3.5 w-3.5" style={{ color: tColor }} />}
                          <span>{tag.name}</span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
