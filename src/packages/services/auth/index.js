import { API, instance } from '@/packages/api'
import { setTokenToCookies } from './helpers/setTokenToCookies'

const service = '/api/admin/admin_users/'

export async function signIn (data) {
  const result = await API.post(service + 'login', data, {
    format: 'json',
  })

  if (result.success) {
    setTokenToCookies(result.token)
    instance.setToken(result.token)
  }

  return result
}

export function getCurrentProfile () {
  return API.get(service + 'profile')
}

export function logout () {
  setTokenToCookies()
  instance.setToken()
}
