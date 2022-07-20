<template>
  <modal-default :is-loading="isLoading">
    <template #title>
      <slot name="title"></slot>
    </template>
    
    <template #content>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>

      <footer class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          type="button"
          class="btn btn-danger"
          @click="$emit('submit')"
        >
          Delete
        </button>
      </footer>
    </template>
  </modal-default>
</template>

<script>
import ModalDefault from '@/components/common/modal/modal-default/ModalDefault'

export default {
  name: 'ModalDelete',

  components: {
    ModalDefault,
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
