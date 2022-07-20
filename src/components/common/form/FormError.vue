<template>
  <ul class="form-error">
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="invalid-feedback form-error__item"
    >
      {{ message }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FormError',
  
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.form-error {
  margin: 0;
  padding: 0;

  &__item {
    display: inline-block;
  }
}
</style>
