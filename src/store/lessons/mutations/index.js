export default {
  setItems (state, payload) {
    state.items = payload
  },

  setItemData (state, payload) {
    state.itemData = payload
  },
  
  setPagination (state, payload) {
    state.pagination = payload
  },

  setCurrentPage (state, payload) {
    state.currentPage = payload
  },
}
