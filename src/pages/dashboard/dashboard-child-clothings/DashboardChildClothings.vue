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
      Child Clothings
    </template>

    <template #breadcrumb>
      Child Clothings
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
        @click="setSort('child_id')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="child_id"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Child id
      </th>

      <th
        class="sortable"
        @click="setSort('clothing_id')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="clothing_id"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Clothing id
      </th>

      <th
        class="sortable"
        @click="setSort('is_active')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="is_active"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Is active
      </th>
    </template>

    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.id"
      >
        <td>{{ row.id }}</td>
        <td>{{ row.child_id }}</td>
        <td>{{ row.clothing_id }}</td>
        <td>
          <input
            type="checkbox"
            :checked="row.is_active"
            @change="onChange(row)"
          >
        </td>

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
      <child-clothings-create
        v-if="isCreateModalVisible"
        @close="isCreateModalVisible = false"
        @add="load(currentPage)"
      ></child-clothings-create>

      <child-clothings-show
        v-if="shownItemId"
        :id="shownItemId"
        @close="shownItemId = null"
      ></child-clothings-show>

      <child-clothings-edit
        v-if="editableItem"
        :item="editableItem"
        @close="editableItem = null"
        @update="load(currentPage)"
      ></child-clothings-edit>
      
      <child-clothings-delete
        v-if="deleteItemId"
        :id="deleteItemId"
        @close="deleteItemId = null"
        @remove="load(currentPage)"
      ></child-clothings-delete>
    </template>
  </dashboard-page>
</template>

<script>
import mixin from '@/mixins/dashboard-page-mixin/dashboardPageMixin'
import { mapActions, mapMutations, mapState } from 'vuex'
/**
 * Components Modals
 */
import ChildClothingsCreate from '@/views/modals/child-clothings/ChildClothingsCreate'
import ChildClothingsShow from '@/views/modals/child-clothings/ChildClothingsShow'
import ChildClothingsEdit from '@/views/modals/child-clothings/ChildClothingsEdit'
import ChildClothingsDelete from '@/views/modals/child-clothings/ChildClothingsDelete'
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
  name: 'DashboardChildClothings',

  mixins: [ mixin ],

  components: {
    ChildClothingsCreate,
    ChildClothingsShow,
    ChildClothingsEdit,
    ChildClothingsDelete,
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
    ...mapState('childClothings', [
      'items',
      'currentPage',
      'pagination',
    ]),

    filtersList () {
      return filters
    },
  },

  created () {
    const { currentPage } = this
    
    this.load(currentPage)
  },

  methods: {
    ...mapActions('childClothings', [
      'loadItems',
      'activateItem',
      'deactivateItem',
    ]),

    ...mapMutations('childClothings', [
      'setCurrentPage',
    ]),

    onChange (item) {
      const { id, is_active: isActive } = item

      if (isActive) {
        this.deactivateItem(id)
      } else {
        this.activateItem(id)
      }
    },

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
