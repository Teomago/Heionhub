/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTags, createTag, deleteTag, updateTag } from '@/app/(frontend)/actions/tags'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Plus,
  Trash2,
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
  Pencil,
} from 'lucide-react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const iconMap: Record<string, any> = {
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

const colorOptions = [
  { label: 'Red', value: '#ef4444', textColor: 'white' },
  { label: 'Blue', value: '#3b82f6', textColor: 'white' },
  { label: 'Green', value: '#22c55e', textColor: 'white' },
  { label: 'Yellow', value: '#eab308', textColor: 'black' },
  { label: 'Purple', value: '#a855f7', textColor: 'white' },
  { label: 'Orange', value: '#f97316', textColor: 'white' },
  { label: 'Pink', value: '#ec4899', textColor: 'white' },
  { label: 'Cyan', value: '#06b6d4', textColor: 'white' },
  { label: 'Emerald', value: '#10b981', textColor: 'white' },
  { label: 'Violet', value: '#8b5cf6', textColor: 'white' },
  { label: 'Rose', value: '#f43f5e', textColor: 'white' },
  { label: 'Amber', value: '#f59e0b', textColor: 'black' },
]

export default function TagsPage() {
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<any | null>(null)
  const [newTagName, setNewTagName] = useState('')
  const [newTagIcon, setNewTagIcon] = useState<string>('')
  const [newTagColor, setNewTagColor] = useState<string>('')

  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await getTags(),
  })

  const createMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      setIsDialogOpen(false)
      resetForm()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; data: any }) => updateTag(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      closeEditDialog()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })

  const resetForm = () => {
    setNewTagName('')
    setNewTagIcon('')
    setNewTagColor('')
  }

  const handleCreateTag = () => {
    if (!newTagName.trim()) return
    createMutation.mutate({
      name: newTagName,
      icon: newTagIcon || undefined,
      color: newTagColor || undefined,
    })
  }

  const handleEditTag = () => {
    if (!editingTag || !newTagName.trim()) return
    updateMutation.mutate({
      id: editingTag.id,
      data: {
        name: newTagName,
        icon: newTagIcon || 'none',
        color: newTagColor || 'none',
      },
    })
  }

  const openEditDialog = (tag: any) => {
    setEditingTag(tag)
    setNewTagName(tag.name)
    setNewTagIcon(tag.icon || '')
    setNewTagColor(tag.color || '')
  }

  const closeEditDialog = () => {
    setEditingTag(null)
    resetForm()
  }

  const tags = data?.tags || []
  const limit = data?.limit || 30
  const count = data?.count || 0
  const canCreateMore = count < limit

  const TagFormFields = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Name *</Label>
        <Input
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="e.g., Groceries"
          className="bg-black border-white/10"
        />
      </div>
      <div className="grid gap-2">
        <Label>Icon (Optional)</Label>
        <Select value={newTagIcon} onValueChange={setNewTagIcon}>
          <SelectTrigger className="bg-black border-white/10">
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10 max-h-60">
            <SelectItem value="none">None</SelectItem>
            {Object.keys(iconMap)
              .sort()
              .map((iconKey) => {
                const Icon = iconMap[iconKey]
                return (
                  <SelectItem key={iconKey} value={iconKey}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="capitalize">{iconKey}</span>
                    </div>
                  </SelectItem>
                )
              })}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Color (Optional)</Label>
        <Select value={newTagColor} onValueChange={setNewTagColor}>
          <SelectTrigger className="bg-black border-white/10">
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10 max-h-60">
            <SelectItem value="none">None</SelectItem>
            {colorOptions.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div
                  className="px-3 py-1 rounded"
                  style={{ backgroundColor: color.value, color: color.textColor }}
                >
                  {color.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header Section - Stacked on mobile */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tags Management</h1>
          <p className="text-muted-foreground">
            Manage your custom tags. {count} / {limit} tags used.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-white text-black hover:bg-gray-200 w-full md:w-auto md:self-start"
              disabled={!canCreateMore || isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-black border-white/10">
            <DialogHeader>
              <DialogTitle>Create New Tag</DialogTitle>
              <DialogDescription>
                Add a custom tag to categorize your financial records.
              </DialogDescription>
            </DialogHeader>
            {TagFormFields()}
            <DialogFooter>
              {createMutation.error && (
                <p className="text-sm text-red-500 mb-2">
                  {(createMutation.error as any)?.error || 'Failed to create tag'}
                </p>
              )}
              <Button
                onClick={handleCreateTag}
                disabled={createMutation.isPending || !newTagName.trim()}
                className="bg-white text-black hover:bg-gray-200"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Tag'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tags Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Tags</CardTitle>
          <CardDescription>System tags and your custom tags.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center p-4 text-muted-foreground">Loading tags...</div>
          ) : tags.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No tags found. Create your first tag!
            </div>
          ) : (
            <div className="space-y-2">
              {tags.map((tag: any) => {
                const Icon = tag.icon ? iconMap[tag.icon] : null
                const isSystemTag = !tag.member
                const colorOption = colorOptions.find((c) => c.value === tag.color)
                return (
                  <div key={tag.id} className="border rounded-lg p-3 hover:bg-accent">
                    {/* Desktop View */}
                    <div className="hidden md:flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">Icon:</span>
                        {Icon ? (
                          <Icon className="h-5 w-5" style={{ color: tag.color || 'white' }} />
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                        <span className="font-medium ml-4">{tag.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({isSystemTag ? 'System Tag' : 'Custom Tag'})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {tag.color && (
                          <div
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: tag.color,
                              color: colorOption?.textColor || 'white',
                            }}
                          >
                            {colorOption?.label || 'Custom'}
                          </div>
                        )}
                        {!isSystemTag && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(tag)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteMutation.mutate(tag.id)}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{tag.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({isSystemTag ? 'System' : 'Custom'})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Icon:</span>
                          {Icon ? (
                            <Icon className="h-4 w-4" style={{ color: tag.color || 'white' }} />
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </div>
                      </div>
                      {tag.color && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Color:</span>
                          <div
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: tag.color,
                              color: colorOption?.textColor || 'white',
                            }}
                          >
                            {colorOption?.label || 'Custom'}
                          </div>
                        </div>
                      )}
                      {!isSystemTag && (
                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(tag)}
                            className="flex-1"
                          >
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(tag.id)}
                            disabled={deleteMutation.isPending}
                            className="flex-1 text-red-500 border-red-500/50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Tag Dialog */}
      <Dialog open={!!editingTag} onOpenChange={(open) => !open && closeEditDialog()}>
        <DialogContent className="max-w-md bg-black border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
            <DialogDescription>Update the tag details.</DialogDescription>
          </DialogHeader>
          {TagFormFields()}
          <DialogFooter>
            <Button
              onClick={handleEditTag}
              disabled={updateMutation.isPending || !newTagName.trim()}
              className="bg-white text-black hover:bg-gray-200"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
