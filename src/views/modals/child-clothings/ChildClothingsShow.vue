<template>
  <modal-show
    :is-loading="isLoading"
    @close="close"
  >
    <template #title>
      Child clothing {{ itemData.id }}
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
              Child id
            </td>
            <td>{{ itemData.child_id }}</td>
          </tr>

          <tr>
            <td class="title">
              Clothing id
            </td>
            <td>{{ itemData.clothing_id }}</td>
          </tr>

          <tr>
            <td class="title">
              Is active
            </td>
            <td>{{ itemData.is_active }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </modal-show>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ModalShow from '@/components/common/modal/modal-show/ModalShow'

export default {
  name: 'ChildClothingsShow',

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
    ...mapState('childClothings', [
      'itemData',
    ]),
  },

  created () {
    this.show()
  },

  methods: {
    ...mapActions('childClothings', [
      'loadItemData',
    ]),

    close () {
      this.$emit('close')
    },

    async show () {
      this.isLoading = true
      
      try {
        await this.loadItemData(this.id)
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
</style>