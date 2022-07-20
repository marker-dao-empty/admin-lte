<template>
  <modal-edit
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Edit child item {{ item.id }}
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
  </modal-edit>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getErrors } from '@/packages/utils'
/**
 * Components
 */
import ModalEdit from '@/components/common/modal/modal-edit/ModalEdit'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  name: 'ChildItemsEdit',

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
      form: {
        child: {
          value: this.item.child_id,
          label: this.item.child_id,
        },
        item: {
          value: this.item.item_id,
          label: this.item.item_id,
        },
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
      'editItem',
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
      const { id } = this.item

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
        await this.editItem({ data, id })

        this.$toast.open({ message: 'Child item was updated successfully' })

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
