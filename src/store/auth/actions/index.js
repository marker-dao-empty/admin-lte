import { instance } from '@/packages/api'
import { signIn, logout, getCurrentProfile } from '@/packages/services/auth'

export default {
  async login ({ dispatch }, data) {
    const response = await signIn(data)

    if (response.success) {
      dispatch('initAuth', response.token)
      
      await dispatch('loadProfile')
    }
  },

  initAuth ({ commit }, token) {
    instance.setToken(token)

    commit('setToken', token)
    commit('setAuth', true)
  },

  async loadProfile ({ commit }) {
    const response = await getCurrentProfile()
    
    if (response?.success) {
      commit('setUser', response.admin_user)
    }
  },

  logout ({ commit }) {
    logout()
  
    commit('setToken', null)
    commit('setUser', null)
    commit('setAuth', false)
  },
}
