import {
  getUserList,
  getUserData,
  editUser,
} from '@/packages/services/users'

export default {
  async loadItems ({ commit }, params) {
    const response = await getUserList(params)

    if (response.success) {
      commit('setItems', response.users)
      commit('setPagination', response.pagination)
    }
  },

  async loadItemData ({ commit }, id) {
    const response = await getUserData(id)

    if (response.success) {
      commit('setItemData', response.user)
    }
  },

  editItem (store, data) {
    return editUser(data)
  },
}
