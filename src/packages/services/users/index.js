import { API } from '@/packages/api'

const service = '/api/admin/users/'

export function getUserList (query) {
  return API.get(service, null, query)
}

export function getUserData (id) {
  return API.get(service + id)
}

export function editUser (data) {
  return API.put(service + data.id, data)
}
