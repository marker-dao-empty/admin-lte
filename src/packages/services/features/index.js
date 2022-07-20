import { API } from '@/packages/api'

const service = '/api/admin/features/'

export function getFeatureList (query) {
  return API.get(service, null, query)
}

export function getFeatureData (id) {
  return API.get(service + id)
}

export function createFeature (data) {
  return API.post(service, data)
}

export function deleteFeature (id) {
  return API.delete(service + id)
}

export function editFeature ({ data, id }) {
  return API.put(service + id, data)
}
