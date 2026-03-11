import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'
import { isActiveOwner } from '../access/isActiveOwner'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  labels: {
    singular: { en: 'Account', es: 'Cuenta' },
    plural: { en: 'Accounts', es: 'Cuentas' },
  },
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: isActiveOwner,
    update: access.owner('owner').adminLock(),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Finance',
    defaultColumns: ['name', 'type', 'balance', 'currency'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { en: 'Name', es: 'Nombre' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: { en: 'Type', es: 'Tipo' },
      options: [
        { label: { en: 'Checking', es: 'Cuenta Corriente' }, value: 'checking' },
        { label: { en: 'Savings', es: 'Ahorros' }, value: 'savings' },
        { label: { en: 'Credit Card', es: 'Tarjeta de Crédito' }, value: 'credit' },
        { label: { en: 'Cash', es: 'Efectivo' }, value: 'cash' },
        { label: { en: 'Investment', es: 'Inversión' }, value: 'investment' },
      ],
    },
    {
      name: 'balance',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: { en: 'Balance', es: 'Saldo' },
      admin: {
        description: { en: 'Current balance in cents', es: 'Saldo actual en centavos' } as any,
      },
    },
    {
      name: 'creditLimit',
      type: 'number',
      required: false,
      label: { en: 'Credit Limit', es: 'Límite de Crédito' },
      admin: {
        description: { en: 'Credit limit in cents (for Credit Cards)', es: 'Límite de crédito en centavos (para Tarjetas de Crédito)' } as any,
      },
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'USD',
      label: { en: 'Currency', es: 'Moneda' },
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        { label: 'COP', value: 'COP' },
      ],
      required: true,
    },
    {
      name: 'color',
      type: 'text',
      required: false,
      label: { en: 'Color', es: 'Color' },
      admin: {
        description: { en: 'Account color (hex)', es: 'Color de la cuenta (hex)' } as any,
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
        condition: () => false, // Hide from admin UI if needed, or make read-only
      },
    },
  ],
}
