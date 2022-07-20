<template>
  <dashboard-page
    :filters-list="filtersList"
    :table-items="items"
    :pagination="pagination"
    :current-page="currentPage"
    :is-loading="isLoading"
    @filter="filter"
    @create="isCreateModalVisible = true"
    @paginate="load"
  >
    <template #title>
      Admin Users
    </template>

    <template #breadcrumb>
      Admin Users
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

      <th>Actions</th>
    </template>

    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.id"
      >
        <td>{{ row.id }}</td>
        <td>{{ row.email }}</td>
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

            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deleteItemId = row.id"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </template>

    <template #modals>
      <admins-create
        v-if="isCreateModalVisible"
        @close="isCreateModalVisible = false"
        @add="load(currentPage)"
      ></admins-create>

      <admins-show
        v-if="shownItemId"
        :id="shownItemId"
        @close="shownItemId = null"
      ></admins-show>

      <admins-edit
        v-if="editableItem"
        :item="editableItem"
        @close="editableItem = null"
        @update="load(currentPage)"
      ></admins-edit>
      
      <admins-delete
        v-if="deleteItemId"
        :id="deleteItemId"
        @close="deleteItemId = null"
        @remove="load(currentPage)"
      ></admins-delete>
    </template>
  </dashboard-page>
</template>

<script>
import mixin from '@/mixins/dashboard-page-mixin/dashboardPageMixin'
import { mapActions, mapMutations, mapState } from 'vuex'
/**
 * Components Modals
 */
import AdminsCreate from '@/views/modals/admins/AdminsCreate'
import AdminsShow from '@/views/modals/admins/AdminsShow'
import AdminsEdit from '@/views/modals/admins/AdminsEdit'
import AdminsDelete from '@/views/modals/admins/AdminsDelete'
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
  name: 'DashboardAdmins',

  mixins: [ mixin ],

  components: {
    AdminsCreate,
    AdminsShow,
    AdminsEdit,
    AdminsDelete,
    DashboardPage,
    TableSortStatus,
  },

  data () {
    return {
      isLoading: false,
      isCreateModalVisible: false,
      deleteItemId: null,
      editableItem: null,
      shownItemId: null,
    }
  },

  computed: {
    ...mapState('admins', [
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
    ...mapActions('admins', [
      'loadItems',
    ]),

    ...mapMutations('admins', [
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
