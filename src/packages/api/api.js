import Instance from './instance'

export const instance = new Instance()

export default class API {
  static async request (method, url, data, params, headers) {
    const options = {
      method,
      url,
      data,
      params,
      headers,
    }

    try {
      const result = await instance.axios(options)

      return result.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static get (url, data, params) {
    return this.request('get', url, data, params)
  }

  static post (url, data, params, headers) {
    return this.request('post', url, data, params, headers)
  }

  static put (url, data, params) {
    return this.request('put', url, data, params)
  }

  static delete (url, data, params) {
    return this.request('delete', url, data, params)
  }
}
