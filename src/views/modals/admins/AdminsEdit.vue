<template>
  <modal-edit
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Edit admin {{ item.email }}
    </template>

    <template #form-content>
      <form-group
        v-model:value="email" 
        :errors="[]"
        placeholder="Email"
        label="Email"
        name="email"
        type="email"
      ></form-group>

      <form-group 
        v-model:value="password" 
        :errors="[]"
        placeholder="Password"
        label="Password"
        name="password"
        type="password"
      ></form-group>

      <form-group
        v-model:value="passwordConfirmation"
        :errors="[]"
        placeholder="Password confirmation"
        label="Password confirmation"
        name="passwordConfirmation"
        type="password"
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
  name: 'AdminsEdit',

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
      password: '',
      passwordConfirmation: '',
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
    ...mapActions('admins', [
      'editItem',
    ]),

    close () {
      this.$emit('close')
    },

    async submit () {
      const { id } = this.item
      const { email, password, passwordConfirmation } = this

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      this.errors = []

      const data = {
        id,
        email: email.toLowerCase().replace(/\s+/g, ''),
        password,
        password_confirmation: passwordConfirmation,
      }
      
      try {
        await this.editItem(data)
        
        this.$toast.open({ message: 'Admin was updated successfully' })

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
