import { API } from '@/packages/api'

const service = '/api/admin/book_categories/'

export function getBookCategoryList (query) {
  return API.get(service, null, query)
}

export function getBookCategoryData (id) {
  return API.get(service + id)
}

export function createBookCategory (data) {
  return API.post(service, data)
}

export function deleteBookCategory (id) {
  return API.delete(service + id)
}

export function editBookCategory (data) {
  return API.put(service + data.id, data)
}
