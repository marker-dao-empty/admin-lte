import API from './api'
import { MULTIPART_HEADERS } from '@/packages/data/headers'

export default class MULTIPART extends API {
  static post (url, data, params) {
    const headers = MULTIPART_HEADERS

    return super.post(url, data, params, headers)
  }
}
