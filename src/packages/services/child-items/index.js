import { API } from '@/packages/api'

const service = '/api/admin/child_items/'

export function getChildItemList (query) {
  return API.get(service, null, query)
}

export function getChildItemData (id) {
  return API.get(service + id)
}

export function createChildItem (data) {
  return API.post(service, data)
}

export function deleteChildItem (id) {
  return API.delete(service + id)
}

export function editChildItem ({ data, id }) {
  return API.put(service + id, data)
}
