<template>
  <div class="position-relative form-group">
    <label>{{ label }}</label>

    <input
      v-if="type !== 'select'"
      :name="name" 
      :placeholder="placeholder" 
      :type="type" 
      :value="value"
      :class="inputClasses"
      @input="$emit('update:value', $event.target.value)"
    >

    <!-- TODO. Разбить на компоненты селект и инпут -->
    <select 
      v-if="type === 'select' && !multiple && !autocomplete"
      :name="name" 
      :class="inputClasses"
      @change="$emit('update:value', $event.target.value)"
    >
      <option
        v-for="val in values"
        :key="val.value"
        :value="val.value"
        :selected="val.value === value"
      >
        {{ val.label }}
      </option>
    </select>

    <template v-if="type === 'select' && multiple">
      <multiselect
        mode="tags"
        :model-value="value"
        :options="values"
        :close-on-select="false"
        @change="value => $emit('update:value', value)"
      ></multiselect>
    </template>

    <template v-if="type === 'select' && autocomplete">
      <multiselect
        :model-value="value"
        :placeholder="placeholder" 
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="false"
        :delay="400"
        :searchable="true"
        :object="true"
        :options="values"
        @update:model-value="handler"
      ></multiselect>
    </template>
    
    <div 
      v-for="msg in nameErrorMsgs" 
      :key="msg" 
      class="invalid-feedback"
    >
      {{ msg }}
    </div>
  </div>
</template>

<script>
/**
 * @see https://github.com/vueform/multiselect#multiselect-with-object-options
 */
import Multiselect from '@vueform/multiselect'

export default {
  name: 'FormGroup',

  emits: [
    'change',
    'update:value',
  ],

  components: {
    Multiselect,
  },

  props: {
    value: {
      type: [ String, Number, Object ],
      default: '',
    },
    /**
     * Antypattern
     * @see https://github.com/vueform/multiselect#autocomplete-with-async-options
     */
    values: {
      type: [ Array, Object, Function ],
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    nameError () {
      const { errors, name } = this

      return errors.find(error => error.key === name)
    },

    nameErrorMsgs () {
      const { nameError } = this

      return nameError?.messages ?? []
    },

    inputClasses () {
      const { nameError } = this

      return [
        'form-control',
        nameError && 'is-invalid',
      ]
    },
  },

  methods: {
    handler (handleContent) {
      this.$emit('change', handleContent ?? '')
    },
  },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
