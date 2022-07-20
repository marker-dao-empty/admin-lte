import { API } from '@/packages/api'

const service = '/api/admin/children/'

export function getChildList (query) {
  return API.get(service, null, query)
}

export function getChildData (id) {
  return API.get(service + id)
}

export function createChild (data) {
  return API.post(service, data)
}

export function deleteChild (id) {
  return API.delete(service + id)
}

export function editChild (data) {
  return API.put(service + data.id, data)
}
