import { API } from '@/packages/api'

const service = '/api/admin/tags/'

export function getTagList (query) {
  return API.get(service, null, query)
}

export function getTagData (id) {
  return API.get(service + id)
}

export function createTag (data) {
  return API.post(service, data)
}

export function deleteTag (id) {
  return API.delete(service + id)
}

export function editTag ({ data, id }) {
  return API.put(service + id, data)
}
