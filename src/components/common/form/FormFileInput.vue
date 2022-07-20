<template>
  <div class="position-relative form-group">
    <label>{{ label }}</label>
    
    <input
      class="form-control"
      type="file"
      :accept="finalAcceptFormats"
      @change="onChange"
    >
  </div>
</template>

<script>

export default {
  name: 'FormFileInput',

  emits: [
    'change',
  ],

  props: {
    label: {
      type: String,
      default: '',
    },
    format: {
      type: [ String, Array ],
      default: '',
    },
  },

  computed: {
    finalAcceptFormats () {
      const { format } = this

      return Array.isArray(format) ? format.join() : format
    },
  },

  methods: {
    onChange (event) {
      const file = event.target.files[0]

      this.$emit('change', file)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-control {
  height: auto;
}
</style>
