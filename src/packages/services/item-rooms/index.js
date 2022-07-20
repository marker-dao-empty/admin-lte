import { API } from '@/packages/api'

const service = '/api/admin/item_rooms/'

export function getItemRoomList (query) {
  return API.get(service, null, query)
}

export function getItemRoomData (id) {
  return API.get(service + id)
}

export function createItemRoom (data) {
  return API.post(service, data)
}

export function deleteItemRoom (id) {
  return API.delete(service + id)
}

export function editItemRoom ({ data, id }) {
  return API.put(service + id, data)
}
