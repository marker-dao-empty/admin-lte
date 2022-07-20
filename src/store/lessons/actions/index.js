import {
  getLessonList,
  getLessonData,
  editLesson,
} from '@/packages/services/lessons'

export default {
  async loadItems ({ commit }, params) {
    const response = await getLessonList(params)

    if (response.success) {
      commit('setItems', response.lessons)
      commit('setPagination', response.pagination)
    }
  },

  async loadItemData ({ commit }, id) {
    const response = await getLessonData(id)

    if (response.success) {
      commit('setItemData', response.lesson)
    }
  },

  editItem (store, data) {
    return editLesson(data)
  },
}
