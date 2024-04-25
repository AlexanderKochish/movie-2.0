import { ProfileResponse } from '@/features/profile/types/profile.types'

export const useLocalStorageProfile = (): ProfileResponse | null => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }

  const storageProfile = localStorage.getItem('currentProfile')

  return storageProfile ? (JSON.parse(storageProfile) as ProfileResponse) : null
}
