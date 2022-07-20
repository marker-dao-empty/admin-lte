import {
  getTagList,
  getTagData,
  createTag,
  deleteTag,
  editTag,
} from '@/packages/services/tags'

export default {
  async loadItems ({ commit }, params) {
    const response = await getTagList(params)

    if (response.success) {
      commit('setItems', response.tags)
      commit('setPagination', response.pagination)
    }
  },

  async loadItemData ({ commit }, id) {
    const response = await getTagData(id)

    if (response.success) {
      commit('setItemData', response.tag)
    }
  },

  createItem (store, data) {
    return createTag(data)
  },

  deleteItem (store, id) {
    return deleteTag(id)
  },

  editItem (store, data) {
    return editTag(data)
  },
}
