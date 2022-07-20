import { API } from '@/packages/api'

const service = '/api/admin/learning_levels/'

export function getLearningLevelList (query) {
  return API.get(service, null, query)
}

export function getLearningLevelData (id) {
  return API.get(service + id)
}

export function editLearningLevel ({ id, data }) {
  return API.put(service + id, data)
}
