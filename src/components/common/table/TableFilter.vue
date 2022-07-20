<template>
  <div class="row">
    <div
      v-for="filter in filtersList"
      :key="filter.key"
      class="col-md-3"
    >
      <form-group
        :value="filters[filter.key]" 
        :errors="[]"
        :name="filter.key"
        :type="filter.type"
        :placeholder="filter.placeholder"
        :label="filter.label"
        @input="setFilterValue(filter.key, $event.target.value)"
      ></form-group>
    </div>

    <div class="col-md-12 button-container">
      <button
        type="button"
        class="btn-shadow d-inline-flex align-items-center btn btn-secondary"
        @click="clear"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script>
import FormGroup from '@/components/common/form/FormGroup'

let waitForFiltering = false

export default {
  name: 'TableFilter',

  components: {
    FormGroup,
  },

  props: [ 'filtersList' ],

  data () {
    return {
      filters: {},
    }
  },

  created () {
    this.filtersList.forEach(x => {
      this.filters[x.key] = x.value
    })
  },

  methods: {
    /**
     * TODO. Использовать debounce 
     */
    setFilterValue (key, value) {
      this.filters[key] = value

      if (waitForFiltering) {
        clearTimeout(waitForFiltering)
      }

      waitForFiltering = setTimeout(() => {
        this.$emit('filter', this.filters)
      }, 700)
    },

    clear () {
      if (waitForFiltering) {
        clearTimeout(waitForFiltering)
      }

      this.filters = {}

      this.$emit('filter', {})
    },
  },
}
</script>

<style scoped>
.button-container {
  margin-bottom: 10px;
}
</style>
