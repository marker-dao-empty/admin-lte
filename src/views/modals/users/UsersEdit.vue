<template>
  <modal-edit
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Edit user {{ item.email }}
    </template>

    <template #form-content>
      <form-group
        v-model:value="firstName"
        :errors="errors"
        type="text"
        placeholder="First name"
        label="First name"
        name="first_name"
      ></form-group>

      <form-group
        v-model:value="lastName"
        :errors="errors"
        type="text"
        placeholder="Last name"
        label="Last name"
        name="last_name"
      ></form-group>
    </template>
  </modal-edit>
</template>

<script>
import { mapActions } from 'vuex'
import { getErrors } from '@/packages/utils'
/**
 * Components
 */
import ModalEdit from '@/components/common/modal/modal-edit/ModalEdit'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  name: 'UsersEdit',

  components: {
    ModalEdit,
    FormGroup,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      email: this.item.email,
      firstName: this.item.first_name,
      lastName: this.item.last_name,
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    errorMessages () {
      const { errors } = this

      return getErrors(errors)
    },
  },

  methods: {
    ...mapActions('users', [
      'editItem',
    ]),

    close () {
      this.$emit('close')
    },

    async submit () {
      const { id } = this.item
      const { firstName, lastName } = this

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      this.errors = []

      const data = {
        id,
        first_name: firstName,
        last_name: lastName,
      }
      
      try {
        await this.editItem(data)
        
        this.$toast.open({ message: 'User was updated successfully' })

        this.$emit('update')
        this.close()
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
