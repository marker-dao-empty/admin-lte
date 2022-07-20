import { API, MULTIPART } from '@/packages/api'

const service = '/api/admin/clothings/'

export function getClothingList (query) {
  return API.get(service, null, query)
}

export function getClothingData (id) {
  return API.get(service + id)
}

export function createClothing (data) {
  return MULTIPART.post(service, data)
}

export function deleteClothing (id) {
  return API.delete(service + id)
}

export function editClothing ({ data, id }) {
  return MULTIPART.put(service + id, data)
}
