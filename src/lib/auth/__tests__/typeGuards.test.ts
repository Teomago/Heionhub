import { describe, it, expect } from 'vitest'
import { isMember, isAdminUser } from '../typeGuards'

describe('Type Guards', () => {
  describe('isMember', () => {
    it('returns true when user is a valid Member', () => {
      const user = { collection: 'members', id: '123', email: 'test@example.com' }
      expect(isMember(user)).toBe(true)
    })

    it('returns false when user is a User (admin)', () => {
      const user = { collection: 'users', id: '456' }
      expect(isMember(user)).toBe(false)
    })

    it('returns false when user is null or undefined', () => {
      expect(isMember(null)).toBe(false)
      expect(isMember(undefined)).toBe(false)
    })

    it('returns false when user object has no collection property', () => {
      const user = { id: '789' }
      expect(isMember(user)).toBe(false)
    })
  })

  describe('isAdminUser', () => {
    it('returns true when user is a valid User (admin)', () => {
      const user = { collection: 'users', id: '123', roles: ['admin'] }
      expect(isAdminUser(user)).toBe(true)
    })

    it('returns false when user is a Member', () => {
      const user = { collection: 'members', id: '456' }
      expect(isAdminUser(user)).toBe(false)
    })

    it('returns false when user is null or undefined', () => {
      expect(isAdminUser(null)).toBe(false)
      expect(isAdminUser(undefined)).toBe(false)
    })
  })
})
