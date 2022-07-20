import { API, MULTIPART } from '@/packages/api'

const service = '/api/admin/pets/'

export function getPetList (query) {
  return API.get(service, null, query)
}

export function getPetData (id) {
  return API.get(service + id)
}

export function createPet (data) {
  return MULTIPART.post(service, data)
}

export function deletePet (id) {
  return API.delete(service + id)
}

export function editPet ({ data, id }) {
  return MULTIPART.put(service + id, data)
}
