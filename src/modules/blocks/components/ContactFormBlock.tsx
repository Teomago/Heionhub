'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import { Button } from '@/components/buttons'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ContactFormBlockType, ContactFormBlockNestedType } from '@/payload/payload-types'

type ContactFormBlockProps =
  | Omit<ContactFormBlockType, 'blockType' | 'blockName'>
  | Omit<ContactFormBlockNestedType, 'blockType' | 'blockName'>

type FormField = NonNullable<ContactFormBlockType['fields']>[number]

/**
 * Contact Form block component.
 * Renders a dynamic form based on CMS-configured fields.
 * Submits via fetch to the configured endpoint, or logs to console as fallback.
 */
export function ContactFormBlock({
  heading,
  body,
  fields,
  submitLabel,
  successMessage,
  endpoint,
}: ContactFormBlockProps) {
  if (!fields || fields.length === 0) return null

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Submission failed')
      } else {
        // eslint-disable-next-line no-console
        console.log('Form submission (no endpoint configured):', formData)
      }
      setStatus('success')
      setFormData({})
    } catch {
      setStatus('error')
    }
  }

  const updateField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950">
        <p className="text-lg font-medium text-green-800 dark:text-green-200">
          {successMessage || 'Thank you! We will get back to you soon.'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
      {body && <RichText data={body} enableProse enableGutter={false} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field) => (
          <FormFieldRenderer
            key={field.id || field.name}
            field={field}
            value={formData[field.name] || ''}
            onChange={(value) => updateField(field.name, value)}
          />
        ))}

        <div>
          <Button type="submit" disabled={status === 'submitting'} size="lg">
            {status === 'submitting' ? 'Sending...' : submitLabel || 'Submit'}
          </Button>
        </div>

        {status === 'error' && (
          <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  )
}

interface FormFieldRendererProps {
  field: FormField
  value: string
  onChange: (value: string) => void
}

function FormFieldRenderer({ field, value, onChange }: FormFieldRendererProps) {
  const id = `field-${field.name}`

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {field.name}
        {field.required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      {field.fieldType === 'textarea' ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || undefined}
          required={field.required || false}
          rows={4}
        />
      ) : field.fieldType === 'select' ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || 'Select...'} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={field.fieldType || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || undefined}
          required={field.required || false}
        />
      )}
    </div>
  )
}
