'use client'

import { useMemo, useCallback, useId, useRef, useEffect, JSX } from 'react'
import type { TextFieldClientProps } from 'payload'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Button,
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  useField,
  useConfig,
  ReactSelect,
  DragHandleIcon,
  ChevronIcon,
  useFormFields,
  useTranslation,
} from '@payloadcms/ui'

import { fieldAffectsData } from 'payload/shared'
import { SortableField, SortBuilderOptions } from './types'
import { formatSortItem, getSiblingPath, parseSortItem } from './sortUtils'
import { mergeFieldStyles } from '@payloadcms/ui/shared'
import { getTranslation } from '@payloadcms/translations'

interface SortRowProps {
  id: string
  index: number
  fieldName: string
  direction: 'asc' | 'desc'
  selectOptions: SortableField[]
  currentLabel: string | JSX.Element
  readOnly?: boolean
  disabled?: boolean
  onUpdateField: (index: number, newFieldValue: string) => void
  onUpdateDirection: (index: number, direction: 'asc' | 'desc') => void
  onRemove: (index: number) => void
}

const SortRow = ({
  id,
  index,
  fieldName,
  direction,
  selectOptions,
  currentLabel,
  readOnly,
  disabled,
  onUpdateField,
  onUpdateDirection,
  onRemove,
}: SortRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: readOnly || disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-start gap-2 ${isDragging ? 'opacity-50' : ''}`}
    >
      <button
        type="button"
        className="cursor-grab flex items-center shrink-0 text-theme-elevation-400 hover:text-theme-elevation-600 active:cursor-grabbing border-none bg-transparent p-0"
        {...attributes}
        {...listeners}
      >
        <DragHandleIcon />
      </button>
      <ReactSelect
        value={{ label: currentLabel, value: fieldName }}
        onChange={(option) => {
          if (!option || Array.isArray(option)) return
          onUpdateField(index, (option as { value: string }).value)
        }}
        className="flex-1"
        isClearable={false}
        disabled={readOnly || disabled}
        options={selectOptions.map((f) => ({ label: f.label, value: f.value }))}
      />
      <div className="flex gap-0">
        <Button
          type="button"
          onClick={() => onUpdateDirection(index, 'asc')}
          buttonStyle={direction === 'asc' ? 'primary' : 'subtle'}
          disabled={readOnly || disabled}
          size="large"
          margin={false}
          iconPosition="left"
          icon={<ChevronIcon direction="up" />}
          className="rounded-r-none"
        >
          <span className="hidden md:inline">Ascending</span>
        </Button>
        <Button
          type="button"
          buttonStyle={direction === 'desc' ? 'primary' : 'subtle'}
          onClick={() => onUpdateDirection(index, 'desc')}
          disabled={readOnly || disabled}
          margin={false}
          size="large"
          iconPosition="left"
          icon={<ChevronIcon direction="down" />}
          className="rounded-l-none"
        >
          <span className="hidden md:inline">Descending</span>
        </Button>
      </div>
      <Button
        buttonStyle="icon-label"
        icon="x"
        iconStyle="with-border"
        onClick={() => onRemove(index)}
        disabled={readOnly || disabled}
        type="button"
        margin={false}
      />
    </li>
  )
}

type SortBuilderFieldProps = TextFieldClientProps & SortBuilderOptions

const SortBuilderField = (props: SortBuilderFieldProps) => {
  const {
    field,
    field: {
      admin: { description, readOnly: adminReadOnly } = {},
      label,
      localized,
      required,
      hasMany,
      name,
    },
    path: pathFromProps,
    readOnly,
    collectionSlug,
    collectionSlugField,
  } = props
  const { config } = useConfig()
  const dndId = useId()

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error: ErrorComponent, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<string[]>({
    potentiallyStalePath: pathFromProps,
  })
  const { i18n } = useTranslation()

  if (!hasMany) {
    throw new Error('SortBuilderField must have "hasMany" set to true in field configuration.')
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const sortItems = useMemo<string[]>(() => {
    if (Array.isArray(value)) return value
    return []
  }, [value])

  const sortItemIds = useMemo<string[]>(
    () => sortItems.map((_, i) => `sort-item-${i}`),
    [sortItems],
  )
  const dynamicCollectionSlug = useFormFields(
    ([fields]) =>
      fields?.[
        getSiblingPath({
          currentPath: pathFromProps || '',
          siblingField: collectionSlugField || '',
          currentName: name,
        }) || ''
      ]?.value,
  )
  const actualCollectionSlug: string | undefined = useMemo(() => {
    return collectionSlugField ? (dynamicCollectionSlug as string | undefined) : collectionSlug
  }, [collectionSlugField, dynamicCollectionSlug, collectionSlug])

  const availableFields = useMemo<SortableField[]>(() => {
    const collection = config.collections?.find((c) => c.slug === actualCollectionSlug)
    if (!collection) return []

    return collection.fields.reduce<SortableField[]>((acc, field) => {
      if (fieldAffectsData(field) && 'name' in field) {
        acc.push({ label: getTranslation(field.label || field.name, i18n), value: field.name })
      }
      return acc
    }, [])
  }, [config.collections, actualCollectionSlug, i18n])

  const unusedFields = useMemo<SortableField[]>(() => {
    const usedFieldNames = new Set(sortItems.map((item) => parseSortItem(item).field))
    return availableFields.filter((f) => !usedFieldNames.has(f.value))
  }, [availableFields, sortItems])

  const addSortItem = useCallback(() => {
    if (unusedFields.length === 0 || readOnly || disabled) return
    const firstUnused = unusedFields[0]
    const newItems = [...sortItems, formatSortItem(firstUnused.value, 'asc')]
    setValue(newItems)
  }, [unusedFields, sortItems, setValue, readOnly, disabled])

  const removeSortItem = useCallback(
    (index: number) => {
      if (readOnly || disabled) return
      const newItems = sortItems.filter((_, i) => i !== index)
      setValue(newItems)
    },
    [sortItems, setValue, readOnly, disabled],
  )

  const updateField = useCallback(
    (index: number, newFieldValue: string) => {
      if (readOnly || disabled) return
      const { direction } = parseSortItem(sortItems[index])
      const newItems = [...sortItems]
      newItems[index] = formatSortItem(newFieldValue, direction)
      setValue(newItems)
    },
    [sortItems, setValue, readOnly, disabled],
  )

  const updateDirection = useCallback(
    (index: number, direction: 'asc' | 'desc') => {
      if (readOnly || disabled) return
      const { field } = parseSortItem(sortItems[index])
      const newItems = [...sortItems]
      newItems[index] = formatSortItem(field, direction)
      setValue(newItems)
    },
    [sortItems, setValue, readOnly, disabled],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!active || !over || active.id === over.id) return

      const fromIndex = sortItemIds.indexOf(String(active.id))
      const toIndex = sortItemIds.indexOf(String(over.id))

      if (fromIndex === -1 || toIndex === -1) return

      const newItems = [...sortItems]
      const [moved] = newItems.splice(fromIndex, 1)
      newItems.splice(toIndex, 0, moved)
      setValue(newItems)
    },
    [sortItems, sortItemIds, setValue],
  )

  const initialCollectionSlug = useRef(actualCollectionSlug)
  useEffect(() => {
    if (actualCollectionSlug !== undefined) {
      if (initialCollectionSlug.current === actualCollectionSlug) {
        //Don't clear on first render
        initialCollectionSlug.current = actualCollectionSlug
        return
      }
      setValue([])
    }
  }, [actualCollectionSlug])
  const style = useMemo(() => mergeFieldStyles(field), [field])
  return (
    <div
      className={[
        'field-type',
        'field-type',
        'sort-builder-field',
        '@container',
        showError && 'error',
        (readOnly || disabled) && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={
          <FieldLabel label={label} localized={localized} path={path} required={required} />
        }
      />
      <div>
        <RenderCustomComponent
          CustomComponent={ErrorComponent}
          Fallback={<FieldError path={path} showError={showError} />}
        />
        {BeforeInput}
        <div className="flex flex-col gap-2">
          {sortItems.length > 0 && (
            <DndContext
              id={dndId}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sortItemIds} strategy={verticalListSortingStrategy}>
                <ul className="flex flex-col gap-1 mb-2 p-0 m-0 list-none">
                  {sortItems.map((item, index) => {
                    const { field: fieldName, direction } = parseSortItem(item)
                    const currentField = availableFields.find((f) => f.value === fieldName)
                    const selectOptions = currentField
                      ? [currentField, ...unusedFields.filter((f) => f.value !== fieldName)]
                      : unusedFields

                    return (
                      <SortRow
                        key={sortItemIds[index]}
                        id={sortItemIds[index]}
                        index={index}
                        fieldName={fieldName}
                        direction={direction}
                        selectOptions={selectOptions}
                        currentLabel={currentField?.label || fieldName}
                        readOnly={readOnly}
                        disabled={disabled || readOnly || adminReadOnly}
                        onUpdateField={updateField}
                        onUpdateDirection={updateDirection}
                        onRemove={removeSortItem}
                      />
                    )
                  })}
                </ul>
              </SortableContext>
            </DndContext>
          )}
          {sortItems.length === 0 && (
            <div className="text-theme-elevation-500 text-[13px] pb-2">
              {actualCollectionSlug
                ? availableFields.length > 0
                  ? 'No sort selected.'
                  : 'No sortable fields available.'
                : 'No collection selected.'}
            </div>
          )}
          <Button
            buttonStyle="icon-label"
            icon="plus"
            iconStyle="with-border"
            iconPosition="left"
            onClick={addSortItem}
            disabled={readOnly || disabled || adminReadOnly || unusedFields.length === 0}
            type="button"
            margin={false}
          >
            Add Sort
          </Button>
        </div>
        {AfterInput}
      </div>
      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={description} path={path} />}
      />
    </div>
  )
}

export default SortBuilderField
