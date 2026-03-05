const parseSortItem = (item: string): { field: string; direction: 'asc' | 'desc' } => {
  if (item.startsWith('-')) {
    return { field: item.slice(1), direction: 'desc' }
  }
  return { field: item, direction: 'asc' }
}

const formatSortItem = (field: string, direction: 'asc' | 'desc'): string => {
  return direction === 'desc' ? `-${field}` : field
}

/**
 * TODO: Maybe move to a more general utils, beucase it's also used in queryBuilder (copied over for now to avoid dependency between fields)
 */
export const getSiblingPath = ({
  currentPath,
  siblingField,
  currentName,
}: {
  currentPath: string
  siblingField: string
  currentName: string
}): string => {
  // Handle relative paths with ../
  if (siblingField.startsWith('../')) {
    // Count how many ../ we have
    const match = siblingField.match(/^(\.\.\/)+/)
    const levelsUp = match ? match[0].split('../').length - 1 : 1

    // Remove ../ and get the relative field name
    const relativePath = siblingField.replace(/^(\.\.\/)+/, '')

    // First get parent path (without currentName)
    const parentPath =
      currentPath === currentName
        ? ''
        : currentPath.slice(0, currentPath.length - currentName.length - 1)

    if (!parentPath) {
      // We're at top level, can't go up further
      return relativePath
    }

    // Now go up from parent
    const parentParts = parentPath.split('.')
    const targetParts = parentParts.slice(0, -levelsUp)

    return targetParts.length > 0 ? `${targetParts.join('.')}.${relativePath}` : relativePath
  }

  // Standard sibling logic (unchanged)
  if (currentPath === currentName) {
    return siblingField
  }

  const parentPath = currentPath.slice(0, currentPath.length - currentName.length - 1)
  return `${parentPath}.${siblingField}`
}
export { parseSortItem, formatSortItem }
