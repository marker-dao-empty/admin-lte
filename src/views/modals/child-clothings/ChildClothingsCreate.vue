<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create child clothing
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
        :value="form.clothing"
        :values="loadСlothingIdOptions"
        :errors="errors"
        :autocomplete="true"
        name="clothing-id"
        type="select"
        placeholder="Clothing id"
        label="Clothing id"
        @change="value => form.clothing = value"
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
  name:'ChildClothingsCreate',

  components: {
    ModalCreate,
    FormGroup,
  },

  data () {
    return {
      form: {
        child: '',
        clothing: '',
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    ...mapGetters('children', [
      'getChildIdsCouple',
    ]),

    ...mapGetters('clothings', [
      'getClothingIdsCouple',
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

    ...mapActions('childClothings', [
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

    async loadСlothingIdOptions (query) {
      try {
        const data = {
          query,
          filter: 'id_eq',
          module: 'clothings',
        }

        await this.loadOptionsByQuery(data)

        return this.getClothingIdsCouple
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
        clothing: { value: clothingId },
      } = form

      const data = {
        child_id: childId,
        clothing_id: clothingId,
      }

      try {
        await this.createItem(data)
        
        this.$toast.open({ message: 'Child clothing was created successfully' })

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
