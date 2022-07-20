<template>
  <modal-edit
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Edit clothing {{ id }}
    </template>

    <template #form-content>      
      <form-group 
        v-model:value="form.title" 
        :errors="errors"
        name="title"
        type="text"
        placeholder="Title"
        label="Title"
      ></form-group>
                  
      <form-group 
        v-model:value="form.price" 
        :errors="errors"
        name="price"
        type="number"
        placeholder="0"
        label="Price"
      ></form-group>
                  
      <form-group 
        v-model:value="form.itemType.current"
        :values="form.itemType.values"
        :errors="errors"
        name="item-type"
        type="select"
        label="Clothing type"
      ></form-group>
                  
      <form-group 
        v-model:value="form.genderType.current"
        :values="form.genderType.values"
        :errors="errors"
        name="gender-type"
        type="select"
        label="Gender"
      ></form-group>

      <form-color-picker-group
        v-model:color="form.color"
      ></form-color-picker-group>

      <div v-if="itemData.file" class="current-file-wrapper form-group">
        <label class="current-file-wrapper__title">
          Current file:
        </label>

        <a
          :href="itemData.file"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ itemData.file?.slice(0, 30) }}...
        </a>
      </div>

      <form-file-input
        label="Change file"
        :format="format"
        @change="onChange"
      ></form-file-input>
    </template>
  </modal-edit>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getErrors, getFormData } from '@/packages/utils'
import {
  CLOTHING_TYPES,
  UNITY_BUNDLE_FORMAT,
  GENDER_TYPES,
} from '@/packages/data'
/**
 * Components
 */
import ModalEdit from '@/components/common/modal/modal-edit/ModalEdit'
import FormFileInput from '@/components/common/form/FormFileInput'
import FormGroup from '@/components/common/form/FormGroup'
import FormColorPickerGroup from '@/components/common/form/FormColorPickerGroup'

export default {
  name:'ClothingsEdit',

  components: {
    ModalEdit,
    FormFileInput,
    FormGroup,
    FormColorPickerGroup,
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
        title: null,
        price: null,
        itemType: {
          values: CLOTHING_TYPES,
          current: null,
        },
        genderType: {
          values: GENDER_TYPES,
          current: null,
        },
        color: null,
        file: null,
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    ...mapState('clothings', [
      'itemData',
    ]),

    format () {
      return UNITY_BUNDLE_FORMAT
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
    ...mapActions('clothings', [
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
        title,
        color,
        gender_type: genderType,
        item_type: itemType,
        price,
      } = this.itemData

      this.form.title = title
      this.form.color = color
      this.form.genderType.current = genderType
      this.form.itemType.current = itemType
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
          title,
          price,
          itemType: { current: item_type },
          genderType: { current: gender_type },
          color,
          file,
        } = form

        const data = getFormData({
          id,
          title,
          price,
          item_type,
          gender_type,
          color,
        })

        if (file) {
          data.append('file', file)
        }

        await this.editItem({ data, id })
        
        this.$toast.open({ message: 'Clothing was updated successfully' })

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

  &__uploaded-file {
    width: 100%;
    max-width: 305px;
    height: auto;
    object-fit: cover;
  }
}
</style>