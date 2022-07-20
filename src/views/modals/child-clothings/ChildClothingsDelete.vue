<template>
  <modal-delete
    :is-loading="isLoading"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Are you sure?
    </template>

    <template #body>
      Are you sure want delete child clothing with id {{ id }}?
    </template>
  </modal-delete>
</template>

<script>
import { mapActions } from 'vuex'
import ModalDelete from '@/components/common/modal/modal-delete/ModalDelete'

export default {
  name: 'ChildClothingsDelete',

  components: {
    ModalDelete,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      isLoading: false,
    }
  },

  methods: {
    ...mapActions('childClothings', [
      'deleteItem',
    ]),

    close () {
      this.$emit('close')
    },

    async submit () {
      if (this.isLoading) {
        return
      }

      this.isLoading = true
      
      try {
        await this.deleteItem(this.id)
        
        this.$toast.open({ message: 'Child clothing was deleted successfully' })

        this.$emit('remove', this.id)
        this.close()
      } catch (error) {
        this.setErrors(error.response?.data?.errors ?? [])
      } finally {
        this.isLoading = false
      }
    },

    setErrors (errors) {
      errors.map(error => {
        error.messages.map(msg => {
          this.$toast.open({ message: msg, type: 'error' })
        })
      })
    },
  },
}
</script>
