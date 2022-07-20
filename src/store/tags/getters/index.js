export default {
  getTagList (state) {
    const { items: tags } = state

    return tags.map(item => {
      return {
        label: item.title,
        value: item.id,
      }
    })
  },
}
