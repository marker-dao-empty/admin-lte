<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create new admin
    </template>

    <template #form-content>
      <form-group
        v-model:value="email" 
        :errors="errors"
        placeholder="Email"
        label="Email"
        name="email"
        type="email"
      ></form-group>

      <form-group 
        v-model:value="password" 
        :errors="errors"
        placeholder="Password"
        label="Password"
        name="password"
        type="password"
      ></form-group>

      <form-group
        v-model:value="passwordConfirmation" 
        :errors="errors"
        placeholder="Password confirmation"
        label="Password confirmation"
        name="passwordConfirmation"
        type="password"
      ></form-group>
    </template>
  </modal-create>
</template>

<script>
import { mapActions } from 'vuex'
import { getErrors } from '@/packages/utils'
/**
 * Components
 */
import ModalCreate from '@/components/common/modal/modal-create/ModalCreate'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  name: 'AdminsCreate',

  components: {
    ModalCreate,
    FormGroup,
  },

  data () {
    return {
      email: '',
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
      'createItem',
    ]),

    async submit () {
      const { email, password, passwordConfirmation } = this

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      this.errors = []

      const data = {
        email: email.toLowerCase().replace(/\s+/g, ''),
        password,
        password_confirmation: passwordConfirmation,
      }
      
      try {
        await this.createItem(data)
        
        this.$toast.open({ message: 'Admin was created successfully' })
        
        this.add()
        this.close()
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      } finally {
        this.isLoading = false
      }
    },

    add () {
      /**
       * TODO. Проставить всем emit опции
       */
      this.$emit('add')
    },

    close () {
      /**
       * TODO. Проставить всем emit опции
       */
      this.$emit('close')
    },
  },
}
</script>
