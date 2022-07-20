<template>
  <modal-show
    :is-loading="isLoading"
    @close="close"
  >
    <template #title>
      User {{ itemData.email }}
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
              Email
            </td>
            <td>{{ itemData.email }}</td>
          </tr>

          <tr>
            <td class="title">
              First name
            </td>
            <td>{{ itemData.first_name }}</td>
          </tr>

          <tr>
            <td class="title">
              Last name
            </td>
            <td>{{ itemData.last_name }}</td>
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
  name: 'UsersShow',

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
    ...mapState('users', [
      'itemData',
    ]),
  },

  created () {
    this.show()
  },

  methods: {
    ...mapActions('users', [
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

    /**
     * TODO. Это нужно вынести
     */
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