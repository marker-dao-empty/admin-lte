import { API } from '@/packages/api'

const service = '/api/admin/child_pets/'

export function getChildPetList (query) {
  return API.get(service, null, query)
}

export function getChildPetData (id) {
  return API.get(service + id)
}

export function createChildPet (data) {
  return API.post(service, data)
}

export function deleteChildPet (id) {
  return API.delete(service + id)
}

export function editChildPet ({ data, id }) {
  return API.put(service + id, data)
}
