<template>
  <div class="position-relative form-group">
    <label>Color</label>

    <div class="form-group__color-wrapper">
      <color-picker
        :color="color"
        :visible-formats="['hex']"
        @color-change="updateColor"
      ></color-picker>
    </div>
  </div>
</template>

<script>
/**
 * Color picker
 */
import { ColorPicker } from 'vue-accessible-color-picker'

export default {
  name: 'FormColorPickerGroup',

  emits: [
    'update:color',
  ],

  props: {
    color: {
      type: String,
      default: '#fff',
    },
  },

  components: {
    ColorPicker,
  },

  methods: {
    updateColor (color) {
      const { colors: { hex } } = color

      this.$emit('update:color', hex)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  &__color-wrapper {
    display: block;
    padding: 3px 7px;
  }
}
</style>
