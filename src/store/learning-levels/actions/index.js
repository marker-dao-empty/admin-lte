import {
  getLearningLevelList,
  getLearningLevelData,
  editLearningLevel,
} from '@/packages/services/learning-levels'

export default {
  async loadItems ({ commit }, params) {
    const response = await getLearningLevelList(params)

    if (response.success) {
      commit('setItems', response.learning_levels)
      commit('setPagination', response.pagination)
    }
  },

  async loadItemData ({ commit }, id) {
    const response = await getLearningLevelData(id)

    if (response.success) {
      commit('setItemData', response.learning_level)
    }
  },

  editItem (store, data) {
    return editLearningLevel(data)
  },
}
