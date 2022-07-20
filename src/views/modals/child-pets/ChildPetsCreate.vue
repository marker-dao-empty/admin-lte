<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create child pet
    </template>

    <template #form-content>
      <form-group
        :value="form.child"
        :values="loadChildIdOptions"
        :errors="errors"
        :autocomplete="true"
        name="child-id"
        type="select"
        placeholder="Child id"
        label="Child id"
        @change="value => form.child = value"
      ></form-group>

      <form-group
        :value="form.pet"
        :values="loadPetIdOptions"
        :errors="errors"
        :autocomplete="true"
        name="pet-id"
        type="select"
        placeholder="Pet id"
        label="Pet id"
        @change="value => form.pet = value"
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
  name:'ChildPetsCreate',

  components: {
    ModalCreate,
    FormGroup,
  },

  data () {
    return {
      form: {
        child: '',
        pet: '',
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    ...mapGetters('children', [
      'getChildIdsCouple',
    ]),

    ...mapGetters('pets', [
      'getPetIdsCouple',
    ]),

    errorMessages () {
      const { errors } = this

      return getErrors(errors)
    },
  },

  methods: {
    ...mapActions('global', [
      'loadOptionsByQuery',
    ]),

    ...mapActions('childPets', [
      'createItem',
    ]),

    close () {
      this.$emit('close')
    },

    async loadChildIdOptions (query) {
      try {
        const data = {
          query,
          filter: 'id_eq',
          module: 'children',
        }

        await this.loadOptionsByQuery(data)

        return this.getChildIdsCouple
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      }
    },

    async loadPetIdOptions (query) {
      try {
        const data = {
          query,
          filter: 'id_eq',
          module: 'pets',
        }

        await this.loadOptionsByQuery(data)

        return this.getPetIdsCouple
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      }
    },

    async submit () {
      const { form } = this

      if (this.isLoading) {
        return
      }
                
      this.isLoading = true
      this.errors = []

      const {
        child: { value: childId },
        pet: { value: petId },
      } = form

      const data = {
        child_id: childId,
        pet_id: petId,
      }

      try {
        await this.createItem(data)
        
        this.$toast.open({ message: 'Child pet was created successfully' })

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
