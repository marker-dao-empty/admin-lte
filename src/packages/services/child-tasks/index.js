import { API } from '@/packages/api'

const service = '/api/admin/child_tasks/'

export function getChildTaskList (query) {
  return API.get(service, null, query)
}

export function getChildTaskData (id) {
  return API.get(service + id)
}
