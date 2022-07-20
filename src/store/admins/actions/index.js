import {
  getAdminList,
  createAdmin,
  deleteAdmin,
  editAdmin,
  getAdminData,
} from '@/packages/services/admins'

export default {
  async loadItems ({ commit }, params) {
    const response = await getAdminList(params)

    if (response.success) {
      commit('setItems', response.admin_users)
      commit('setPagination', response.pagination)
    }
  },

  async loadItemData ({ commit }, id) {
    const response = await getAdminData(id)

    if (response.success) {
      commit('setItemData', response.admin_user)
    }
  },

  createItem (store, data) {
    return createAdmin(data)
  },

  deleteItem (store, id) {
    return deleteAdmin(id)
  },

  editItem (store, data) {
    return editAdmin(data)
  },
}
