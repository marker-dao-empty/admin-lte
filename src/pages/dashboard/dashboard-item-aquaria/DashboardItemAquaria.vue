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
      Item aquaria
    </template>

    <template #breadcrumb>
      Item aquaria
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
        @click="setSort('category')"
      >
        <table-sort-status
          :sort-key="sortKey"
          self-key="category"
          :sort-direction="sortDirection"
        ></table-sort-status>
        Сategory
      </th>
    </template>

    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.id"
      >
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.price }}</td>
        <td>{{ row.category }}</td>

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
      <item-aquaria-create
        v-if="isCreateModalVisible"
        @close="isCreateModalVisible = false"
        @add="load(currentPage)"
      ></item-aquaria-create>

      <item-aquaria-show
        v-if="shownItemId"
        :id="shownItemId"
        @close="shownItemId = null"
      ></item-aquaria-show>

      <item-aquaria-edit
        v-if="editableItemId"
        :id="editableItemId"
        @close="editableItemId = null"
        @update="load(currentPage)"
      ></item-aquaria-edit>
      
      <item-aquaria-delete
        v-if="deleteItemId"
        :id="deleteItemId"
        @close="deleteItemId = null"
        @remove="load(currentPage)"
      ></item-aquaria-delete>
    </template>
  </dashboard-page>
</template>

<script>
import mixin from '@/mixins/dashboard-page-mixin/dashboardPageMixin'
import { mapActions, mapMutations, mapState } from 'vuex'
/**
 * Components Modals
 */
import ItemAquariaCreate from '@/views/modals/item-aquaria/ItemAquariaCreate'
import ItemAquariaShow from '@/views/modals/item-aquaria/ItemAquariaShow'
import ItemAquariaEdit from '@/views/modals/item-aquaria/ItemAquariaEdit'
import ItemAquariaDelete from '@/views/modals/item-aquaria/ItemAquariaDelete'
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
  name: 'DashboardItemAquaria',

  mixins: [ mixin ],

  components: {
    ItemAquariaCreate,
    ItemAquariaShow,
    ItemAquariaEdit,
    ItemAquariaDelete,
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
    ...mapState('itemAquaria', [
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
    ...mapActions('itemAquaria', [
      'loadItems',
    ]),

    ...mapMutations('itemAquaria', [
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
