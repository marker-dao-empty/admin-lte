<template>
  <dashboard-page
    :filters-list="filtersList"
    :table-items="items"
    :pagination="pagination"
    :current-page="currentPage"
    :is-loading="isLoading"
    @filter="filter"
    @paginate="load"
  >
    <template #title>
      Users
    </template>

    <template #breadcrumb>
      Users
    </template>

    <template #head>
      <th
        class="sortable"
        @click="setSort('id')"
      >
        <table-sort-status
          :sort-key="sortKey"
          :sort-direction="sortDirection"
          self-key="id"
        ></table-sort-status>
        Id
      </th>

      <th
        class="sortable"
        @click="setSort('email')"
      >
        <table-sort-status
          :sort-key="sortKey"
          :sort-direction="sortDirection"
          self-key="email"
        ></table-sort-status>
        Email
      </th>

      <th
        class="sortable"
        @click="setSort('first_name')"
      >
        <table-sort-status
          :sort-key="sortKey"
          :sort-direction="sortDirection"
          self-key="first_name"
        ></table-sort-status>
        First name
      </th>

      <th
        class="sortable"
        @click="setSort('last_name')"
      >
        <table-sort-status
          :sort-key="sortKey"
          :sort-direction="sortDirection"
          self-key="last_name"
        ></table-sort-status>
        Last name
      </th>

      <th>Actions</th>
    </template>

    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.id"
      >
        <td>{{ row.id }}</td>
        <td>{{ row.email }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.last_name }}</td>

        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="shownItemId = row.id"
            >
              Show
            </button>

            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editableItem = row"
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    </template>

    <template #modals>
      <users-show
        v-if="shownItemId"
        :id="shownItemId"
        @close="shownItemId = null"
      ></users-show>

      <users-edit
        v-if="editableItem"
        :item="editableItem"
        @close="editableItem = null"
        @update="load(currentPage)"
      ></users-edit>
    </template>
  </dashboard-page>
</template>

<script>
import mixin from '@/mixins/dashboard-page-mixin/dashboardPageMixin'
import { mapActions, mapMutations, mapState } from 'vuex'
/**
 * Components Modals
 */
import UsersShow from '@/views/modals/users/UsersShow'
import UsersEdit from '@/views/modals/users/UsersEdit'
/**
 * Components Dashboard
 */
import DashboardPage from '@/components/dashboard/dashboard-page/DashboardPage'
/**
 * Components Others
 */
import TableSortStatus from '@/components/common/table/TableSortStatus'
/**
 * Filters. TODO. Вынести в packages/data все фильтры
 */
import { filters } from './filters'

export default {
  name: 'DashboardUsers',

  mixins: [ mixin ],

  components: {
    UsersShow,
    UsersEdit,
    DashboardPage,
    TableSortStatus,
  },

  data () {
    return {
      isLoading: false,
      editableItem: null,
      shownItemId: null,
    }
  },

  computed: {
    ...mapState('users', [
      'items',
      'pagination',
      'currentPage',
    ]),

    filtersList () {
      return filters
    },
  },

  created () {
    this.load(1)
  },

  methods: {
    ...mapActions('users', [
      'loadItems',
    ]),

    ...mapMutations('users', [
      'setCurrentPage',
    ]),

    async load (page) {
      const { filters, perPage, sortDirection, sortKey } = this

      if (this.isLoading) {
        return
      }

      this.setCurrentPage(page)
      this.isLoading = true

      const params = {
        ...filters,
        page,
        per_page: perPage,
        'q[s][0][dir]': sortDirection ? 'desc' : 'asc',
        'q[s][0][name]': sortKey,
      }
      
      try {
        await this.loadItems(params)
      } catch (error) {
        this.setErrors(error.response?.data?.errors ?? [])
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
