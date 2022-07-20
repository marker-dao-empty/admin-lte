import { API } from '@/packages/api'

const service = '/api/admin/item_hamsters/'

export function getItemHamsterList (query) {
  return API.get(service, null, query)
}

export function getItemHamsterData (id) {
  return API.get(service + id)
}

export function createItemHamster (data) {
  return API.post(service, data)
}

export function deleteItemHamster (id) {
  return API.delete(service + id)
}

export function editItemHamster ({ data, id }) {
  return API.put(service + id, data)
}
