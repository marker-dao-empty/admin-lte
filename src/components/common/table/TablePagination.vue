<template>
  <ul
    v-if="pagination.total > 1"
    role="menubar"
    aria-disabled="false"
    aria-label="Pagination"
    class="pagination b-pagination pagination-md justify-content-end"
  >
    <li>
      <button
        type="button"
        role="none presentation"
        :class="['page-item', { disabled: currentPage === 1 }]"
        @click="paginate(1)"
      >
        <span
          role="menuitem"
          tabindex="-1"
          aria-label="Go to first page"
          target="_self"
          class="page-link"
        >«</span>
      </button>
    </li>

    <li>
      <button
        type="button"
        role="none presentation"
        :class="['page-item', { disabled: currentPage === 1 }]"
        @click="paginate(currentPage - 1)"
      >
        <span
          role="menuitem"
          tabindex="-1"
          aria-label="Go to previous page"
          target="_self"
          class="page-link"
        >‹</span>
      </button>
    </li>

    <li
      v-if="currentPage - 2 > 1"
      role="separator"
      class="page-item disabled bv-d-xs-down-none"
    >
      <span class="page-link">…</span>
    </li>

    <li
      v-for="(pg, index) in paginationItems" 
      :key="index"
    >
      <button
        type="button"
        role="none presentation" 
        :class="['page-item', { active: currentPage === pg + 1 }]"
      >
        <span
          role="menuitemradio"
          aria-checked="true"
          aria-posinset="3"
          aria-setsize="10"
          tabindex="0"
          target="_self"
          class="page-link"
          @click="paginate(pg + 1)"
        >{{ pg + 1 }}</span>
      </button>
    </li>

    <li
      v-if="currentPage + 2 < pagination.total"
      role="separator"
      class="page-item disabled bv-d-xs-down-none"
    >
      <span class="page-link">…</span>
    </li>

    <li>
      <button
        type="button"
        role="none presentation"
        :class="['page-item', { disabled: currentPage === pagination.total }]"
        @click="paginate(currentPage + 1)"
      >
        <span
          role="menuitem"
          tabindex="-1"
          aria-label="Go to next page"
          target="_self"
          class="page-link"
        >›</span>
      </button>
    </li>

    <li>
      <button
        type="button"
        role="none presentation"
        :class="['page-item', { disabled: currentPage === pagination.total }]"
        @click="paginate(pagination.total)"
      >
        <span
          role="menuitem"
          tabindex="-1"
          aria-label="Go to last page"
          target="_self"
          class="page-link"
        >»</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TablePagination',

  props: [ 'pagination', 'currentPage' ],

  computed: {
    paginationItems () {
      const { pagination, currentPage } = this

      const keys = Array(pagination.total).keys()
      const keysArray = Array.from(keys)
      const callback = x => !((x + 3 < currentPage || x - 1 > currentPage) && x !== currentPage)

      return keysArray.filter(callback)
    },
  },

  methods: {
    paginate (page) {
      if (page !== this.currentPage && page >= 1 && page <= this.pagination.total) {
        this.$emit('paginate', page)
      }
    },
  },
}
</script>

<style scoped>
button {
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
}

.pagination {
  margin-right: 20px;
}

.page-link {
  z-index: 0 !important;
}
</style>
