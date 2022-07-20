import { YEAR } from '@/packages/data'

export const getExpiresDate = () => {
  const date = new Date()
  const timestamp = date.getDate()
  
  return date.setDate(timestamp + YEAR)
}
