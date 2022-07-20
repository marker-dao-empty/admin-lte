<template>
  <modal-edit
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Edit item aquarium {{ id }}
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

      <div v-if="itemData.image" class="current-file-wrapper form-group">
        <label class="current-file-wrapper__title">
          Current image:
        </label>

        <div class="pets-image-box">
          <img
            class="pets-image"
            :src="itemData.image"
            alt="Item aquarium"
          >
        </div>
      </div>

      <form-file-input
        label="Change image"
        :format="format"
        @change="onChange"
      ></form-file-input>
    </template>
  </modal-edit>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getErrors, getFormData } from '@/packages/utils'
import { IMAGE_FORMATS, ITEM_AQUARIA_CATEGORIES } from '@/packages/data'
/**
 * Components
 */
import ModalEdit from '@/components/common/modal/modal-edit/ModalEdit'
import FormFileInput from '@/components/common/form/FormFileInput'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  name: 'ItemAquariaEdit',

  components: {
    ModalEdit,
    FormFileInput,
    FormGroup,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      form: {
        name: null,
        price: null,
        category: {
          values: ITEM_AQUARIA_CATEGORIES,
          current: null,
        },
        file: null,
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    ...mapState('itemAquaria', [
      'itemData',
    ]),

    format () {
      return IMAGE_FORMATS
    },

    errorMessages () {
      const { errors } = this

      return getErrors(errors)
    },
  },

  async created () {
    await this.load()

    this.initForm()
  },

  methods: {
    ...mapActions('itemAquaria', [
      'loadItemData',
      'editItem',
    ]),

    close () {
      this.$emit('close')
    },

    onChange (file) {
      this.form.file = file
    },

    async load () {
      const { id } = this

      this.isLoading = true
      
      try {
        await this.loadItemData(id)
      } catch (error) {
        this.setErrors(error.response?.data?.errors ?? [])
      } finally {
        this.isLoading = false
      }
    },

    initForm () {
      const {
        name,
        category,
        price,
      } = this.itemData

      this.form.name = name
      this.form.category.current = category
      this.form.price = price
    },

    async submit () {
      const { form } = this
      const { id } = this.itemData

      if (this.isLoading) {
        return
      }
                
      this.isLoading = true
      this.errors = []

      try {
        const {
          name,
          price,
          category: { current: category },
          file: image,
        } = form

        const data = getFormData({
          name,
          price,
          category,
        })

        if (image) {
          data.append('image', image)
        }

        await this.editItem({ data, id })
        
        this.$toast.open({ message: 'Item aquaria was updated successfully' })

        this.$emit('update')
        this.close()
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      } finally {
        this.isLoading = false
      }
    },
    
    setErrors (errors) {
      errors.map(error => {
        error.messages.map(msg => {
          this.$toast.open({ message: msg, type: 'error' })
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.current-file-wrapper {
  &__title {
    display: block;
  }
}

.pets-image-box {
  padding: 20px 0;
}

.pets-image {
  max-width: 250px;
  object-fit: cover;
}
</style>