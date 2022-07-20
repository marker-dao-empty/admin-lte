<template>
  <modal-create
    :is-loading="isLoading"
    :error-messages="errorMessages"
    @close="close"
    @submit="submit"
  >
    <template #title>
      Create new clothing
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

      <form-file-input
        label="File"
        :format="format"
        @change="onChange"
      ></form-file-input>
    </template>
  </modal-create>
</template>

<script>
import { mapActions } from 'vuex'
import { getErrors, getFormData } from '@/packages/utils'
import {
  CLOTHING_TYPES,
  UNITY_BUNDLE_FORMAT,
  GENDER_TYPES,
} from '@/packages/data'
/**
 * Components
 */
import ModalCreate from '@/components/common/modal/modal-create/ModalCreate'
import FormFileInput from '@/components/common/form/FormFileInput'
import FormGroup from '@/components/common/form/FormGroup'
import FormColorPickerGroup from '@/components/common/form/FormColorPickerGroup'

export default {
  name:'ClothingsCreate',

  components: {
    ModalCreate,
    FormFileInput,
    FormGroup,
    FormColorPickerGroup,
  },

  data () {
    return {
      form: {
        title: '',
        price: '',
        itemType: {
          values: CLOTHING_TYPES,
          current: CLOTHING_TYPES[0].value,
        },
        genderType: {
          values: GENDER_TYPES,
          current: GENDER_TYPES[0].value,
        },
        color: '#fff',
        file: null,
      },
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    format () {
      return UNITY_BUNDLE_FORMAT
    },

    errorMessages () {
      const { errors } = this

      return getErrors(errors)
    },
  },

  methods: {
    ...mapActions('clothings', [
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
          title,
          price,
          itemType: { current: item_type },
          genderType: { current: gender_type },
          color,
          file,
        } = form

        const data = getFormData({
          title,
          price,
          item_type,
          gender_type,
          color,
          file,
        })

        await this.createItem(data)
        
        this.$toast.open({ message: 'Clothing was created successfully' })

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
