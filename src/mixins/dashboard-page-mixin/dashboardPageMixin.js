export default {
  data () {
    return {
      filters: null,
      perPage: 10,
      sortKey: 'id',
      sortDirection: true,
    }
  },

  beforeUnmount () {
    this.setCurrentPage(1)
  },

  methods: {
    filter (filters) {
      const { currentPage } = this

      this.filters = filters
      this.load(currentPage)
    },

    setErrors (errors) {
      errors.map(error => {
        error.messages.map(msg => {
          this.$toast.open({ message: msg, type: 'error' })
        })
      })
    },

    setSort (key) {
      const { currentPage } = this

      if (this.sortKey === key) {
        this.sortDirection = !this.sortDirection
      } else {
        this.sortKey = key
        this.sortDirection = false
      }
      
      this.load(currentPage)
    },
  },
}
