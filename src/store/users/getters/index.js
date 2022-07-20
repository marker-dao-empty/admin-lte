export default {
  getUserIdsCouple (state) {
    const { items } = state

    return items.map(item => ({ value: item.id, label: item.email }))
  },
}
