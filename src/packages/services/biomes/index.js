import { API } from '@/packages/api'

const service = '/api/admin/biomes/'

export function getBiomeData (id) {
  return API.get(service + id)
}

export function getBiomeList (query) {
  return API.get(service, null, query)
}
