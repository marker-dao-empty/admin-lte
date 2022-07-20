import { API } from '@/packages/api'

const service = '/api/admin/item_aquaria/'

export function getItemAquariaList (query) {
  return API.get(service, null, query)
}

export function getItemAquariaData (id) {
  return API.get(service + id)
}

export function createItemAquaria (data) {
  return API.post(service, data)
}

export function deleteItemAquaria (id) {
  return API.delete(service + id)
}

export function editItemAquaria ({ data, id }) {
  return API.put(service + id, data)
}
