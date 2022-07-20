import {
  getChildItemList,
  getChildItemData,
  createChildItem,
  deleteChildItem,
  editChildItem,
} from '@/packages/services/child-items'

export default {
  async loadItems ({ commit }, params) {
    const response = await getChildItemList(params)

    if (response.success) {
      commit('setItems', response.child_items)
      commit('setPagination', response.pagination)
    }
  },

  async loadItemData ({ commit }, id) {
    const response = await getChildItemData(id)

    if (response.success) {
      commit('setItemData', response.child_item)
    }
  },

  createItem (store, data) {
    return createChildItem(data)
  },

  deleteItem (store, id) {
    return deleteChildItem(id)
  },

  editItem (store, data) {
    return editChildItem(data)
  },
}
