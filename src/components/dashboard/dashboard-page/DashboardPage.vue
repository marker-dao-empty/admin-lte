<template>
  <div class="dashboard-page">
    <dashboard-header>
      <template #title>
        <slot name="title"></slot>
      </template>

      <template #breadcrumb>
        <slot name="breadcrumb"></slot>
      </template>
    </dashboard-header>

    <section class="content">
      <div class="container-fluid">
        <div class="card mb-3">
          <div class="card-header-tab card-header">
            <div
              class="card-header-title font-size-lg text-capitalize font-weight-normal"
            ></div>

            <template v-if="filtersList.length">
              <span>Filters:</span>
              
              <table-filter
                :filters-list="filtersList"
                @filter="filters => $emit('filter', filters)"
              ></table-filter>
            </template>

            <div
              v-if="isCreateVisible"
              class="btn-actions-pane-right actions-icon-btn"
            >
              <button
                type="button"
                class="btn-shadow d-inline-flex align-items-center btn btn-success"
                @click="$emit('create')"
              >
                <!-- TODO. Вынести в packages/icons все svg-иконки, использовать спрайт -->
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="mr-2 svg-inline--fa fa-plus fa-w-14"
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    class=""
                  />
                </svg>
                Create New
              </button>
            </div>

            <div class="card-body">
              <div class="card-body__inner">
                <loader-default v-if="isLoading"></loader-default>

                <v-table
                  class="table b-table mb-0 table-striped table-hover table-bordered"
                  :data="tableItems"
                  aria-busy="false"
                  aria-colcount="3"
                >
                  <template #head>
                    <slot name="head"></slot>
                  </template>

                  <template #body="{ rows }">
                    <slot name="body" :rows="rows"></slot>
                  </template>
                </v-table>
              </div>
            </div>

            <table-pagination
              :pagination="pagination"
              :current-page="currentPage"
              @paginate="page => $emit('paginate', page)"
            ></table-pagination>
          </div>
        </div>
      </div>
    </section>

    <slot name="modals"></slot>
  </div>
</template>

<script>
/**
 * Components Dashboard
 */
import DashboardHeader from '@/components/dashboard/dashboard-header/DashboardHeader'
/**
 * Components Others
 */
import LoaderDefault from '@/components/common/loader/LoaderDefault'
import TablePagination from '@/components/common/table/TablePagination'
import TableFilter from '@/components/common/table/TableFilter'

export default {
  name: 'DashboardPage',

  emits: [
    'filter',
    'paginate',
    'create',
  ],

  components: {
    DashboardHeader,
    LoaderDefault,
    TablePagination,
    TableFilter,
  },

  props: {
    filtersList: {
      typr: Array,
      default: [],
    },
    tableItems: {
      typr: Array,
      default: [],
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    routeName () {
      return this.$route.name
    },

    routesWithoutCreate () {
      return [
        'Biomes',
        'Lessons',
        'Tasks',
        'Resources',
        'Users',
        'LearningLevels',
        'ChildTasks',
      ]
    },

    isCreateVisible () {
      const { routeName, routesWithoutCreate } = this

      return !routesWithoutCreate.includes(routeName)
    },
  },
}
</script>
