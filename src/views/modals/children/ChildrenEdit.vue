<template>
  <modal-edit
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Edit children {{ item.first_name }}
    </template>

    <template #form-content>
      <form-group
        v-model:value="firstName" 
        :errors="errors"
        name="firstName"
        type="text"
        placeholder="First Name"
        label="First Name"
      ></form-group>

      <form-group
        v-model:value="gender" 
        :errors="errors"
        :values="[{ value: 'boy', label: 'Boy' }, { value: 'girl', label: 'Girl' }]"
        name="gender"
        type="select"
        label="Gender"
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
        v-model:value="tickets" 
        :errors="errors"
        name="tickets"
        type="number"
        placeholder="Tickets"
        label="Tickets"
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
  name: 'ChildrenEdit',

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
      firstName: this.item.first_name,
      gender: this.item.gender,
      birthday: this.item.birthday,
      tickets: this.item.tickets,
      errors: [],
      isLoading: false,
    }
  },

  computed: {
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
    ...mapActions('children', [
      'editItem',
    ]),

    close () {
      this.$emit('close')
    },

    async submit () {
      const { firstName, gender, birthday, tickets } = this
      const { id } = this.item

      if (this.isLoading) {
        return
      }
                
      this.isLoading = true
      this.errors = []

      const data = {
        id,
        gender,
        birthday,
        tickets,
        first_name: firstName,
      }
      
      try {
        await this.editItem(data)
        
        this.$toast.open({ message: 'Child was updated successfully' })

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
