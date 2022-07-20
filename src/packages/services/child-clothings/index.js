import { API } from '@/packages/api'

const service = '/api/admin/child_clothings/'

export function getChildClothingList (query) {
  return API.get(service, null, query)
}

export function getChildClothingData (id) {
  return API.get(service + id)
}

export function createChildClothing (data) {
  return API.post(service, data)
}

export function deleteChildClothing (id) {
  return API.delete(service + id)
}

export function editChildClothing (data) {
  return API.put(service + data.id, data)
}

export function activateChildClothing (id) {
  return API.put(`${service}${id}/activate`)
}

export function deactivateChildClothing (id) {
  return API.put(`${service}${id}/deactivate`)
}
