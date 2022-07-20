<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create child item
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
        :value="form.item"
        :values="loadItemIdOptions"
        :errors="errors"
        :autocomplete="true"
        name="item-id"
        type="select"
        placeholder="Item id"
        label="Item id"
        @change="value => form.item = value"
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
  name:'ChildItemsCreate',

  components: {
    ModalCreate,
    FormGroup,
  },

  data () {
    return {
      form: {
        child: '',
        item: '',
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    ...mapGetters('children', [
      'getChildIdsCouple',
    ]),

    ...mapGetters('items', [
      'getItemIdsCouple',
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

    ...mapActions('childItems', [
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

    async loadItemIdOptions (query) {
      try {
        const data = {
          query,
          filter: 'id_eq',
          module: 'items',
        }

        await this.loadOptionsByQuery(data)

        return this.getItemIdsCouple
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
        item: { value: itemId },
      } = form

      const data = {
        child_id: childId,
        item_id: itemId,
      }

      try {
        await this.createItem(data)
        
        this.$toast.open({ message: 'Child item was created successfully' })

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
