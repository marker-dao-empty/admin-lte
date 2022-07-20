<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create a new item aquarium
    </template>

    <template #form-content>
      <form-group 
        v-model:value="form.name" 
        :errors="errors"
        name="name"
        type="text"
        placeholder="Name"
        label="Name"
      ></form-group>

      <form-group 
        v-model:value="form.price" 
        :errors="errors"
        name="price"
        type="text"
        placeholder="Price"
        label="Price"
      ></form-group>
                  
      <form-group 
        v-model:value="form.category.current"
        :values="form.category.values"
        :errors="errors"
        name="category"
        type="select"
        label="Category"
      ></form-group>

      <form-file-input
        label="Image"
        :format="format"
        @change="onChange"
      ></form-file-input>
    </template>
  </modal-create>
</template>

<script>
import { mapActions } from 'vuex'
import { getErrors, getFormData } from '@/packages/utils'
import { IMAGE_FORMATS, ITEM_AQUARIA_CATEGORIES } from '@/packages/data'
/**
 * Components
 */
import ModalCreate from '@/components/common/modal/modal-create/ModalCreate'
import FormFileInput from '@/components/common/form/FormFileInput'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  name: 'ItemAquariaCreate',

  components: {
    ModalCreate,
    FormFileInput,
    FormGroup,
  },

  data () {
    return {
      form: {
        name: '',
        /**
         * TODO. Вынести в @utils/data
         */
        itemType: 'Item::Aquarium',
        category: {
          values: ITEM_AQUARIA_CATEGORIES,
          current: ITEM_AQUARIA_CATEGORIES[0].value,
        },
        price: '',
        file: null,
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    format () {
      return IMAGE_FORMATS
    },

    errorMessages () {
      const { errors } = this

      return getErrors(errors)
    },
  },

  methods: {
    ...mapActions('itemAquaria', [
      'createItem',
    ]),

    close () {
      this.$emit('close')
    },

    onChange (file) {
      this.form.file = file
    },

    async submit () {
      const { form } = this

      if (this.isLoading) {
        return
      }
                
      this.isLoading = true
      this.errors = []

      try {
        const {
          name,
          price,
          itemType: item_type,
          category: { current: category },
          file: image,
        } = form

        const data = getFormData({
          name,
          price,
          item_type,
          category,
          image,
        })

        await this.createItem(data)
        
        this.$toast.open({ message: 'Item aquarium was created successfully' })

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
