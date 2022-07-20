<template>
  <modal-show
    :is-loading="isLoading"
    @close="close"
  >
    <template #title>
      Child {{ itemData.child?.id }}
    </template>

    <template v-if="!isLoading" #body>
      <ul class="nav nav-tabs card-header-tabs">
        <li
          class="nav-item"
          @click="setTab(1)"
        >
          <a :class="['nav-link', {'active': tab === 1}]">Child details</a>
        </li>

        <li
          class="nav-item"
          @click="setTab(2)"
        >
          <a :class="['nav-link', {'active': tab === 2}]">Child avatar details</a>
        </li>

        <li
          class="nav-item"
          @click="setTab(3)"
        >
          <a :class="['nav-link', {'active': tab === 3}]">Item details</a>
        </li>

        <li
          class="nav-item"
          @click="setTab(4)"
        >
          <a :class="['nav-link', {'active': tab === 4}]">Pet details</a>
        </li>
      </ul>

      <div class="table-wrapper">
        <table v-if="!isLoading && tab === 1">
          <tbody>
            <tr>
              <td class="title">
                ID
              </td>
              <td>{{ itemData.child.id }}</td>
            </tr>

            <tr>
              <td class="title">
                First Name
              </td>
              <td>{{ itemData.child.first_name }}</td>
            </tr>

            <tr>
              <td class="title">
                User
              </td>
              <td>{{ itemData.child.user }}</td>
            </tr>

            <tr>
              <td class="title">
                Birthday
              </td>
              <td>{{ itemData.child.birthday }}</td>
            </tr>

            <tr>
              <td class="title">
                Gender
              </td>
              <td>{{ itemData.child.gender }}</td>
            </tr>

            <tr>
              <td class="title">
                Tickets
              </td>
              <td>{{ itemData.child.tickets }}</td>
            </tr>

            <tr>
              <td class="title">
                Is active
              </td>

              <td>
                <div
                  v-if="!itemData.child.is_active"
                  class="badge badge-danger"
                >
                  NO
                </div>

                <div
                  v-if="itemData.child.is_active"
                  class="badge badge-success"
                >
                  YES
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-wrapper">
        <table v-if="!isLoading && tab === 2">
          <tbody>
            <tr>
              <td class="title">
                Skin Tone
              </td>
              <td>{{ itemData.avatar.skin_tone.title }}</td>
            </tr>

            <tr>
              <td class="title">
                Eyes
              </td>
              <td>{{ itemData.avatar.eyes.title }}</td>
            </tr>

            <tr>
              <td class="title">
                Nose
              </td>
              <td>{{ itemData.avatar.nose.title }}</td>
            </tr>

            <tr>
              <td class="title">
                Mouth
              </td>
              <td>{{ itemData.avatar.mouth.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-wrapper">
        <v-table
          v-if="!isLoading && tab === 3"
          aria-busy="false"
          aria-colcount="3"
          class="table b-table mb-0 table-striped table-hover table-bordered"
          :data="itemData.item"
        >
          <template #head>
            <th>ID</th>
            <th>Amount</th>
            <th>Name</th>
            <th>Item type</th>
            <th>Category</th>
          </template>

          <template #body="{ rows }">
            <tr
              v-for="row in rows"
              :key="row.id"
            >
              <td>{{ row.id }}</td>
              <td>{{ row.amount }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.item_type }}</td>
              <td>{{ row.category }}</td>
            </tr>
          </template>
        </v-table>
      </div>

      <div class="table-wrapper">
        <v-table
          v-if="!isLoading && tab === 4"
          aria-busy="false"
          aria-colcount="3"
          class="table b-table mb-0 table-striped table-hover table-bordered"
          :data="itemData.pet"
        >
          <template #head>
            <th>ID</th>
            <th>Pet type</th>
            <th>Playing state</th>
            <th>Saturation state</th>
            <th>Title</th>
            <th>Training state</th>
            <th>Washing state</th>
          </template>
          
          <template #body="{ rows }">
            <tr
              v-for="row in rows"
              :key="row.id"
            >
              <td>{{ row.id }}</td>
              <td>{{ row.pet_type }}</td>
              <td>{{ row.playing_state }}</td>
              <td>{{ row.saturation_state }}</td>
              <td>{{ row.title }}</td>
              <td>{{ row.training_state }}</td>
              <td>{{ row.washing_state }}</td>
            </tr>
          </template>
        </v-table>
      </div>
    </template>
  </modal-show>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ModalShow from '@/components/common/modal/modal-show/ModalShow'

export default {
  name: 'ChildrenShow',

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
      tab: 1,
      isLoading: true,
    }
  },

  computed: {
    ...mapState('children', [
      'itemData',
    ]),
  },

  created () {
    this.show()
  },

  methods: {
    ...mapActions('children', [
      'loadItemData',
    ]),

    setTab (tab) {
      this.tab = tab
    },

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
     * TODO. Вынести 
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

.table-wrapper {
  overflow-x: auto;
}

.title {
  color: rgba(0, 0, 0, .5);
  width: max-content;
}
.nav-tabs {
  margin-bottom: 10px;
}

.nav-item {
  cursor: pointer;
}
</style>
