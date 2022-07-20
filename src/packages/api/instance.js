import axios from 'axios'

export default class Instance {
  constructor () {
    this.axios = this.createInstance()
    this.token = null

    return this
  }

  createInstance () {
    const params = {
      baseURL: process.env.VUE_APP_API,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    return axios.create(params)
  }

  setToken (token) {
    if (token) {
      this.token = token
      this.axios.defaults.headers.session_token = token
    } else {
      this.token = null
      delete this.axios.defaults.headers.session_token
    }
  }
}
