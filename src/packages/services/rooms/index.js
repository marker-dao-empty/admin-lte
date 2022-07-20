import { API } from '@/packages/api'

const service = '/api/admin/rooms/'

export function getRoomList (query) {
  return API.get(service, null, query)
}

export function getRoomData (id) {
  return API.get(service + id)
}

export function createRoom (data) {
  return API.post(service, data)
}

export function deleteRoom (id) {
  return API.delete(service + id)
}

export function editRoom ({ data, id }) {
  return API.put(service + id, data)
}
