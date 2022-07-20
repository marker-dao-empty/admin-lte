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
      Rooms
    </template>

    <template #breadcrumb>
      Rooms
    </template>

    <template #head>
      <th
        class="sortable"
        @click="setSort('id')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="id"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Id
      </th>

      <th
        class="sortable"
        @click="setSort('name')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="name"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Name
      </th>

      <th
        class="sortable"
        @click="setSort('category')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="category"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Category
      </th>

      <th
        class="sortable"
        @click="setSort('price')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="price"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Price
      </th>

      <th
        class="sortable"
        @click="setSort('background_type')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="background_type"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Background type
      </th>
      
      <th>Actions</th>
    </template>

    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.id"
      >
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.category }}</td>
        <td>{{ row.price }}</td>
        <td>{{ row.background_type }}</td>
        
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
              @click="editableItemId = row.id"
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
      <rooms-create
        v-if="isCreateModalVisible"
        @close="isCreateModalVisible = false"
        @add="load(currentPage)"
      ></rooms-create>

      <rooms-show
        v-if="shownItemId"
        :id="shownItemId"
        @close="shownItemId = null"
      ></rooms-show>

      <rooms-edit
        v-if="editableItemId"
        :id="editableItemId"
        @close="editableItemId = null"
        @update="load(currentPage)"
      ></rooms-edit>
      
      <rooms-delete
        v-if="deleteItemId"
        :id="deleteItemId"
        @close="deleteItemId = null"
        @remove="load(currentPage)"
      ></rooms-delete>
    </template>
  </dashboard-page>
</template>

<script>
import mixin from '@/mixins/dashboard-page-mixin/dashboardPageMixin'
import { mapActions, mapMutations, mapState } from 'vuex'
/**
 * Components Modals
 */
import RoomsCreate from '@/views/modals/rooms/RoomsCreate'
import RoomsShow from '@/views/modals/rooms/RoomsShow'
import RoomsEdit from '@/views/modals/rooms/RoomsEdit'
import RoomsDelete from '@/views/modals/rooms/RoomsDelete'
/**
 * Components Dashboard
 */
import DashboardPage from '@/components/dashboard/dashboard-page/DashboardPage'
/**
 * Components Others
 */
import TableSortStatus from '@/components/common/table/TableSortStatus'
/**
 * Filters
 */
import { filters } from './filters'

export default {
  name: 'DashboardRooms',

  mixins: [ mixin ],

  components: {
    RoomsCreate,
    RoomsShow,
    RoomsEdit,
    RoomsDelete,
    DashboardPage,
    TableSortStatus,
  },

  data () {
    return {
      isLoading: false,
      isCreateModalVisible: false,
      deleteItemId: null,
      editableItemId: null,
      shownItemId: null,
    }
  },

  computed: {
    ...mapState('rooms', [
      'items',
      'currentPage',
      'pagination',
    ]),

    filtersList () {
      return filters
    },
  },

  async created () {
    const { currentPage } = this
    
    await this.load(currentPage)
  },

  methods: {
    ...mapActions('rooms', [
      'loadItems',
    ]),

    ...mapMutations('rooms', [
      'setCurrentPage',
    ]),

    async load (page) {
      const { filters, perPage, sortDirection, sortKey } = this

      if (this.isLoading) {
        return
      }

      this.setCurrentPage(page)
      this.isLoading = true

      const data = {
        ...filters,
        page,
        per_page: perPage,
        'q[s][0][dir]': sortDirection ? 'desc' : 'asc',
        'q[s][0][name]': sortKey,
      }

      try {
        await this.loadItems(data)
      } catch (error) {
        this.setErrors(error.response?.data?.errors ?? [])
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
