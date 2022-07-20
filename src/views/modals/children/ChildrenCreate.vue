<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create new children
    </template>

    <template #form-content>
      <form-group
        :value="user"
        :values="loadUserIdOptions"
        :errors="errors"
        :autocomplete="true"
        name="user-email"
        type="select"
        placeholder="User email"
        label="User email"
        @change="value => user = value"
      ></form-group>

      <form-group 
        v-model:value="firstName" 
        :errors="errors"
        name="firstName"
        type="text"
        placeholder="First Name"
        label="First Name"
      ></form-group>

      <form-group 
        v-model:value="birthdayReversed" 
        :errors="errors"
        name="birthday"
        type="date"
        placeholder="Birthday"
        label="Birthday"
      ></form-group>

      <form-group 
        v-model:value="gender" 
        :errors="errors"
        :values="[{ value: 'boy', label: 'Boy' }, { value: 'girl', label: 'Girl' }]"
        name="gender"
        type="select"
        label="Gender"
      ></form-group>
    </template>
  </modal-create>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getErrors } from '@/packages/utils'
/**
 * Components
 */
import ModalCreate from '@/components/common/modal/modal-create/ModalCreate'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  name: 'ChildrenCreate',
  
  components: {
    ModalCreate,
    FormGroup,
  },
  
  data () {
    return {
      user: '',
      firstName: '',
      gender: 'boy',
      birthday: '',
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    ...mapGetters('users', [
      'getUserIdsCouple',
    ]),
    /**
     * TODO. Проверить че там
     */
    birthdayReversed: {
      get () {
        const { birthday } = this

        return birthday.includes('.') ? birthday.split('.').reverse().join('-') : birthday
      },
      set (val) {
        this.birthday = val
      },
    },

    errorMessages () {
      const { errors } = this

      return getErrors(errors)
    },
  },
  
  methods: {
    ...mapActions('global', [
      'loadOptionsByQuery',
    ]),

    ...mapActions('children', [
      'createItem',
    ]),

    close () {
      this.$emit('close')
    },

    async loadUserIdOptions (query) {
      try {
        const data = {
          query,
          filter: 'email_contains',
          module: 'users',
        }

        await this.loadOptionsByQuery(data)

        return this.getUserIdsCouple
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      }
    },
    
    async submit () {
      const { user: { value: userId }, firstName, gender, birthday } = this

      if (this.isLoading) {
        return
      }
                
      this.isLoading = true
      this.errors = []

      const data = {
        user_id: userId,
        first_name: firstName,
        gender,
        birthday: birthday.split('-').reverse().join('.'),
      }
      
      try {
        await this.createItem(data)
        
        this.$toast.open({ message: 'Child was created successfully' })

        this.$emit('add')
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
