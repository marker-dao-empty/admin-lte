import { API } from '@/packages/api'

const service = '/api/admin/books/'

export function getBookData (id) {
  return API.get(service + id)
}

export function getBookList (query) {
  return API.get(service, null, query)
}

export function createBook (data) {
  return API.post(service, data)
}

export function deleteBook (id) {
  return API.delete(service + id)
}

export function editBook (data) {
  return API.put(service + data.id, data)
}
