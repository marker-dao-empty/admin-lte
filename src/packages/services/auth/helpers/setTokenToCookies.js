import { cookies } from '@/packages/utils'
import { getExpiresDate } from './getExpiresDate'

export const setTokenToCookies = token => {
  if (token) {
    cookies.set('token', token, getExpiresDate())

    return
  }

  cookies.remove('token')
}
