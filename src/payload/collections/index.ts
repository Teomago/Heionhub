import { Articles } from './content/Articles'
import { Media } from './content/Media'
import { Pages } from './content/Pages'
import { Users } from './settings/Users'
import { InvitationCodes } from './settings/InvitationCodes'
import { Tags } from './system/Tags'
import { Accounts } from './finance/Accounts'
import { Budgets } from './finance/Budgets'
import { Categories } from './finance/Categories'
import { Members } from './finance/Members'
import { Subscriptions } from './finance/Subscriptions'
import { Transactions } from './finance/Transactions'

export const collections = [
  // Content
  Articles,
  Media,
  Pages,
  // Finance
  Accounts,
  Budgets,
  Categories,
  Members,
  Subscriptions,
  Transactions,
  // Settings
  Users,
  InvitationCodes,
  // System
  Tags,
]
