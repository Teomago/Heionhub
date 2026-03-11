import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'
import { updateAccountBalance, afterDeleteTransaction } from './hooks/updateAccountBalance'
import { checkBudgetLimits } from './hooks/checkBudgetLimits'
import { updateBudgetSpend } from './hooks/updateBudgetSpend'
import { isActiveOwner } from '../access/isActiveOwner'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  labels: {
    singular: { en: 'Transaction', es: 'Transacción' },
    plural: { en: 'Transactions', es: 'Transacciones' },
  },
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: isActiveOwner, // Read policy filters out soft deletes automatically
    update: access.owner('owner').adminLock(),
  },
  admin: {
    useAsTitle: 'description',
    group: 'Finance',
    defaultColumns: ['date', 'description', 'amount', 'type', 'account'],
  },
  fields: [
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: { en: 'Amount (Cents)', es: 'Monto (Centavos)' },
      admin: {
        description: { en: 'Transaction amount in cents', es: 'Monto de la transacción en centavos' } as any,
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: { en: 'Type', es: 'Tipo' },
      options: [
        { label: { en: 'Income', es: 'Ingreso' }, value: 'income' },
        { label: { en: 'Expense', es: 'Gasto' }, value: 'expense' },
        { label: { en: 'Transfer', es: 'Transferencia' }, value: 'transfer' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: { en: 'Date', es: 'Fecha' },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'description',
      type: 'text',
      label: { en: 'Description', es: 'Descripción' },
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
      required: true,
      label: { en: 'Account', es: 'Cuenta' },
    },
    {
      name: 'toAccount',
      type: 'relationship',
      relationTo: 'accounts',
      label: { en: 'To Account', es: 'Cuenta Destino' },
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'transfer',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: { en: 'Category', es: 'Categoría' },
    },
    {
      name: 'budget',
      type: 'relationship',
      relationTo: 'budgets',
      label: { en: 'Budget', es: 'Presupuesto' },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: { en: 'Status', es: 'Estado' },
      options: [
        { label: { en: 'Active', es: 'Activo' }, value: 'active' },
        { label: { en: 'Deleted', es: 'Eliminado' }, value: 'deleted' },
      ],
      defaultValue: 'active',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            if (!value && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
      admin: {
        condition: () => false,
      },
    },
  ],
  hooks: {
    beforeChange: [checkBudgetLimits],
    afterChange: [updateAccountBalance, updateBudgetSpend],
    afterDelete: [afterDeleteTransaction],
  },
}
