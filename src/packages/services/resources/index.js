import { API } from '@/packages/api'

const service = '/api/admin/resources/'

export function getResourceList () {
  return API.get(service)
}
