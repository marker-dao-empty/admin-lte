import { API } from '@/packages/api'

const service = '/api/admin/lessons/'

export function getLessonList (query) {
  return API.get(service, null, query)
}

export function getLessonData (id) {
  return API.get(service + id)
}

export function editLesson ({ id, data }) {
  return API.put(service + id, data)
}
