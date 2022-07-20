<template>
  <div
    class="modal fade show d-block"
    role="modal-default dialog"
    tabindex="-1"
    aria-modal="true"
    @click="$emit('close')"
  >
    <div
      class="modal-dialog modal-lg"
      @click.stop=""
    >
      <loader-default v-if="isLoading"></loader-default>
      
      <div
        role="document"
        class="modal-content"
      >
        <header class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>

          <button
            type="button"
            aria-label="Close"
            class="close"
            @click="$emit('close')"
          >
            ×
          </button>
        </header>
        
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderDefault from '@/components/common/loader/LoaderDefault'

export default {
  name: 'ModalDefault',

  components: {
    LoaderDefault,
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, .5);
}
</style>
