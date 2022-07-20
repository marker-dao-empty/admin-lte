import { API } from '@/packages/api'

const service = '/api/admin/tasks/'

export function getTaskList (query) {
  return API.get(service, null, query)
}

export function getTaskData (id) {
  return API.get(service + id)
}

export function editTask ({ id, data }) {
  return API.put(service + id, data)
}
