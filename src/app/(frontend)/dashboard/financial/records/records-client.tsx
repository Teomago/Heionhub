/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTags } from '@/app/(frontend)/actions/tags'
import { createRecord, deleteRecord, updateRecord } from '@/app/(frontend)/actions/records'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus,
  Trash2,
  HelpCircle,
  Pencil,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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

export default function FinancialRecordsClientPage({ initialRecords }: { initialRecords: any[] }) {
  const _queryClient = useQueryClient()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null)
  const [editingRecord, setEditingRecord] = useState<any | null>(null)

  // Form state
  const [type, setType] = useState<'income' | 'expense' | 'saving'>('income')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [isFromBalance, setIsFromBalance] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string>('')

  const { data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await getTags(),
  })

  const records = initialRecords

  const createMutation = useMutation({
    mutationFn: createRecord,
    onSuccess: () => {
      window.location.reload()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; data: any }) => updateRecord(data.id, data.data),
    onSuccess: () => {
      window.location.reload()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      window.location.reload()
    },
  })

  const resetForm = () => {
    setType('income')
    setAmount('')
    setDate(new Date().toISOString().split('T')[0])
    setDescription('')
    setIsFromBalance(true)
    setSelectedTag('')
  }

  const handleCreateRecord = () => {
    if (!amount) return
    const selectedTagObj = availableTags.find((t: any) => t.id === selectedTag)
    createMutation.mutate({
      type,
      amount: parseFloat(amount),
      category: selectedTagObj?.name || 'Uncategorized',
      date,
      description: description || undefined,
      isFromBalance: type === 'saving' ? isFromBalance : true,
      tags: selectedTag ? [selectedTag] : undefined,
    })
  }

  const handleEditRecord = () => {
    if (!editingRecord || !amount) return
    const selectedTagObj = availableTags.find((t: any) => t.id === selectedTag)
    updateMutation.mutate({
      id: editingRecord.id,
      data: {
        type,
        amount: parseFloat(amount),
        category: selectedTagObj?.name || 'Uncategorized',
        date,
        description: description || undefined,
        isFromBalance: type === 'saving' ? isFromBalance : true,
        tags: selectedTag ? [selectedTag] : undefined,
      },
    })
  }

  const openEditDialog = (record: any) => {
    setEditingRecord(record)
    setType(record.type)
    setAmount(record.amount.toString())
    setDate(record.date.split('T')[0])
    setDescription(record.description || '')
    setIsFromBalance(record.isFromBalance ?? true)
    const tagId = record.tags?.[0]?.id || record.tags?.[0] || ''
    setSelectedTag(tagId)
  }

  const closeEditDialog = () => {
    setEditingRecord(null)
    resetForm()
  }

  const availableTags = tagsData?.tags || []

  const RecordFormFields = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Type *</Label>
        <Select value={type} onValueChange={(v: any) => setType(v)}>
          <SelectTrigger className="bg-black border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10">
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="saving">Saving</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Amount *</Label>
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-black border-white/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="grid gap-2">
        <Label>Tag (Category)</Label>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="bg-black border-white/10">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10">
            {availableTags.map((tag: any) => (
              <SelectItem key={tag.id} value={tag.id}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Date *</Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-black border-white/10"
        />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional notes"
          className="bg-black border-white/10 resize-none"
          rows={3}
        />
      </div>
      {type === 'saving' && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFromBalance"
            checked={isFromBalance}
            onChange={(e) => setIsFromBalance(e.target.checked)}
            className="h-4 w-4 accent-white"
          />
          <Label htmlFor="isFromBalance" className="text-sm flex items-center gap-1">
            Deduct from / Add to Balance
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    If checked: This savings amount is moved from your wallet to savings (decreases
                    Net Balance). If unchecked: This is external savings (gift, bonus) that does not
                    affect your Net Balance.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header Section - Stacked on mobile */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Records</h1>
          <p className="text-muted-foreground">Manage your income, expenses, and savings.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-gray-200 w-full md:w-auto md:self-start">
              <Plus className="h-4 w-4 mr-2" />
              Create Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-black border-white/10">
            <DialogHeader>
              <DialogTitle>Create Financial Record</DialogTitle>
              <DialogDescription>Add a new income, expense, or saving record.</DialogDescription>
            </DialogHeader>
            {RecordFormFields()}
            <DialogFooter>
              <Button
                onClick={handleCreateRecord}
                disabled={createMutation.isPending || !amount}
                className="bg-white text-black hover:bg-gray-200"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Record'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Records Card */}
      <Card>
        <CardHeader>
          <CardTitle>Records</CardTitle>
          <CardDescription>View and manage all your financial transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No records found. Create your first record!
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block rounded-md border">
                <div className="border-b p-4 grid grid-cols-6 gap-4 font-medium text-sm">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Amount</div>
                  <div>Description</div>
                  <div>Tags</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 grid grid-cols-6 gap-4 text-sm items-center"
                    >
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
                        {(record.tags as any[])?.map((tag: any) => {
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
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(record)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setRecordToDelete(record.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
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
                      {(record.tags as any[])?.map((tag: any) => {
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
                    <div className="flex gap-2 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(record)}
                        className="flex-1"
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRecordToDelete(record.id)}
                        className="flex-1 text-red-500 border-red-500/50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Record Dialog */}
      <Dialog open={!!editingRecord} onOpenChange={(open) => !open && closeEditDialog()}>
        <DialogContent className="max-w-md bg-black border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Financial Record</DialogTitle>
            <DialogDescription>Update the record details.</DialogDescription>
          </DialogHeader>
          {RecordFormFields()}
          <DialogFooter>
            <Button
              onClick={handleEditRecord}
              disabled={updateMutation.isPending || !amount}
              className="bg-white text-black hover:bg-gray-200"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!recordToDelete} onOpenChange={() => setRecordToDelete(null)}>
        <AlertDialogContent className="bg-black border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => recordToDelete && deleteMutation.mutate(recordToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
