<template>
  <modal-default :is-loading="isLoading">
    <template #title>
      <slot name="title"></slot>
    </template>
    
    <template #content>
      <div class="modal-body">
        <form @submit.prevent="$emit('submit')">
          <form-error :messages="errorMessages"></form-error>

          <slot name="form-content"></slot>
        </form>
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
          class="btn btn-primary"
          @click="$emit('submit')"
        >
          Create
        </button>
      </footer>
    </template>
  </modal-default>
</template>

<script>
import ModalDefault from '@/components/common/modal/modal-default/ModalDefault'
import FormError from '@/components/common/form/FormError'

export default {
  name: 'ModalCreate',

  components: {
    ModalDefault,
    FormError,
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
