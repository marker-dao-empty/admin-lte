<template>
  <modal-show
    :is-loading="isLoading"
    @close="close"
  >
    <template #title>
      Clothing {{ itemData.id }}
    </template>

    <template v-if="!isLoading" #body>
      <table>
        <tbody>
          <tr>
            <td class="title">
              ID
            </td>

            <td>{{ itemData.id }}</td>
          </tr>

          <tr>
            <td class="title">
              Title
            </td>

            <td>{{ itemData.title }}</td>
          </tr>

          <tr>
            <td class="title">
              Gender
            </td>
            
            <td>{{ itemData.gender_type }}</td>
          </tr>

          <tr>
            <td class="title">
              Type
            </td>
            
            <td>{{ itemData.item_type }}</td>
          </tr>

          <tr>
            <td class="title">
              Price
            </td>
            
            <td>{{ itemData.price }}</td>
          </tr>

          <tr>
            <td class="title">
              Color
            </td>
            
            <td>{{ itemData.color }}</td>
          </tr>

          <tr>
            <td class="title">
              Created at
            </td>
            
            <td>{{ createdDate }}</td>
          </tr>

          <tr>
            <td class="title">
              Updated at
            </td>
            
            <td>{{ updatedDate }}</td>
          </tr>

          <tr v-if="itemData.file">
            <td class="title">
              File
            </td>
            
            <td>
              <a
                :href="itemData.file"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ itemData.file?.slice(0, 30) }}...
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </modal-show>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { format } from 'date-fns'
import ModalShow from '@/components/common/modal/modal-show/ModalShow'

export default {
  name: 'ClothingsShow',

  components: {
    ModalShow,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      isLoading: true,
    }
  },

  computed: {
    ...mapState('clothings', [
      'itemData',
    ]),

    createdDate () {
      const { itemData } = this

      return itemData.created_at
        ? format(new Date(itemData.created_at), 'dd MMMM yyyy, HH:mm')
        : ''
    },

    updatedDate () {
      const { itemData } = this

      return itemData.updated_at
        ? format(new Date(itemData.updated_at), 'dd MMMM yyyy, HH:mm')
        : ''
    },
  },

  created () {
    this.show()
  },

  methods: {
    ...mapActions('clothings', [
      'loadItemData',
    ]),

    close () {
      this.$emit('close')
    },

    async show () {
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

<style scoped>
table {
  width: 100%;
}

table tr {
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.title {
  color: rgba(0, 0, 0, .5);
  width: max-content;
}

.uploaded-file {
  width: 100%;
  max-width: 305px;
  height: auto;
  object-fit: cover;
}
</style>
