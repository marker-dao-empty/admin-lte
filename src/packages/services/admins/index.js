import { API } from '@/packages/api'

const service = '/api/admin/admin_users/'

export function getAdminData (id) {
  return API.get(service + id)
}

export function getAdminList (query) {
  return API.get(service, null, query)
}

export function createAdmin (data) {
  return API.post(service, data)
}

export function deleteAdmin (id) {
  return API.delete(service + id)
}

export function editAdmin (data) {
  return API.put(service + data.id, data)
}
