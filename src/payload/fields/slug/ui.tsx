'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, useForm, useField, FieldLabel, TextInput } from '@payloadcms/ui'
import { Lock, LockOpen, RefreshCw } from 'lucide-react'
import { SlugFieldProps } from './slug'
import { slugify } from './slugify'
import './slug.scss'

/**
 * Custom field component for the slug field.
 *
 * Features:
 * - Lock/unlock toggle to prevent accidental edits
 * - Regenerate button to pull slug from source field
 * - Detects manual user input to disable auto-sync permanently
 * - Slugifies input on blur (except "/" for homepage)
 */
export const SlugField: React.FC<SlugFieldProps> = ({
  field,
  fieldToUse,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field
  const checkboxPath = path?.replace(/\.?[^.]+$/, '')
    ? `${path.replace(/\.?[^.]+$/, '')}.generateSlug`
    : 'generateSlug'

  const { setValue, value } = useField<string>({ path: path || field.name })
  const { setValue: setAutoSync, value: isAutoSyncEnabled } = useField<boolean>({
    path: checkboxPath,
  })
  const { getDataByPath } = useForm()

  const [isLocked, setIsLocked] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const programmaticValueRef = useRef<string | null>(null)

  // Detect manual user input to disable auto-sync
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleInput = () => {
      if (isLocked || !isAutoSyncEnabled) return

      setTimeout(() => {
        const inputValue = container.querySelector('input')?.value
        if (inputValue !== programmaticValueRef.current) {
          setAutoSync(false)
        }
        programmaticValueRef.current = null
      }, 0)
    }

    container.addEventListener('input', handleInput)
    return () => container.removeEventListener('input', handleInput)
  }, [isLocked, isAutoSyncEnabled, setAutoSync])

  // Slugify on blur (except "/" for homepage)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleBlur = () => {
      if (isLocked || !value || value === '/') return

      const slugified = slugify(value)
      if (slugified !== value) {
        programmaticValueRef.current = slugified
        setValue(slugified)
      }
    }

    container.addEventListener('focusout', handleBlur)
    return () => container.removeEventListener('focusout', handleBlur)
  }, [isLocked, value, setValue])

  const handleRegenerate = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()
      const sourceValue = getDataByPath(fieldToUse || 'title') as string

      if (sourceValue) {
        const newSlug = slugify(sourceValue)
        if (value !== newSlug) {
          programmaticValueRef.current = newSlug
          setValue(newSlug)
        }
      } else if (value !== '') {
        programmaticValueRef.current = ''
        setValue('')
      }
    },
    [setValue, value, fieldToUse, getDataByPath],
  )

  const toggleLock = useCallback((e: React.MouseEvent<Element>) => {
    e.preventDefault()
    setIsLocked((prev) => !prev)
  }, [])

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        <div className="slug-actions">
          {!isLocked && (
            <Button buttonStyle="none" className="slug-action-btn" onClick={handleRegenerate}>
              <RefreshCw size={14} />
              <span className="slug-tooltip">Regenerate</span>
            </Button>
          )}
          <Button buttonStyle="none" className="slug-action-btn" onClick={toggleLock}>
            {isLocked ? <Lock size={14} /> : <LockOpen size={14} />}
            <span className="slug-tooltip">{isLocked ? 'Unlock' : 'Lock'}</span>
          </Button>
        </div>
      </div>
      <div ref={containerRef}>
        <TextInput
          onChange={setValue}
          path={path || field.name}
          readOnly={Boolean(readOnlyFromProps || isLocked)}
          value={value}
        />
      </div>
    </div>
  )
}
