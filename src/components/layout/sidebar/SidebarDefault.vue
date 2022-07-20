<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link
      to="/"
      class="brand-link"
    >
      <span class="brand-text font-weight-light">Shiny Soleil</span>
    </router-link>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <button
            type="button"
            class="btn btn-primary d-block"
            @click="showEditModal = USER"
          >
            <i class="nav-icon fas fa-edit"></i>
            {{ USER.email }}
          </button>
        </div>
      </div>

      <nav class="mt-2">
        <ul
          class="main-sidebar__navigation-list nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              exact
              exact-active-class="active"
            >
              <i class="nav-icon fas fa-tachometer-alt"></i>

              <p>Dashboard</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/admin-users"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-user"></i>

              <p>Admin Users</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/biomes"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-feather-alt"></i>

              <p>Biomes</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/book-categories"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-book-open"></i>

              <p>Book Categories</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/books"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-book"></i>

              <p>Books</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/children"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-child"></i>

              <p>Children</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/child-clothings"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-shirt-long-sleeve"></i>

              <p>Child clothings</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/child-items"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-id-badge"></i>

              <p>Child items</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/child-pets"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-cat"></i>

              <p>Child pets</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/child-tasks"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-tasks"></i>

              <p>Child tasks</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/clothings"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-shirt-long-sleeve"></i>

              <p>Clothings</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/lessons"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-book"></i>

              <p>Lessons</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/tasks"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-tasks"></i>

              <p>Tasks</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/tags"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-tag"></i>

              <p>Tags</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/resources"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-space-shuttle"></i>

              <p>Resources</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/rooms"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-building"></i>

              <p>Rooms</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/users"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-id-badge"></i>

              <p>Users</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/pets"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-dog"></i>

              <p>Pets</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/features"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-plug"></i>

              <p>Features</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/learning-levels"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-level-up-alt"></i>

              <p>Learning levels</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/item-rooms"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-smile"></i>

              <p>Item rooms</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/item-aquaria"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-tint"></i>

              <p>Item aquaria</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/item-hamsters"
              class="nav-link"
              active-class="active"
            >
              <i class="nav-icon fas fa-futbol"></i>

              <p>Item hamsters</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <admins-edit
      v-if="showEditModal"
      :admin="showEditModal"
      @close="showEditModal = false"
    ></admins-edit>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminsEdit from '@/views/modals/admins/AdminsEdit'

/**
 * TODO. Формирование списка должно происходить из массива
 */
export default {
  name: 'SidebarDefault',

  components: {
    AdminsEdit,
  },

  data () {
    return {
      showEditModal: false,
    }
  },

  computed: {
    ...mapGetters('auth', [
      'USER',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.main-sidebar {
  &__navigation-list {
    padding-bottom: 14vh;
  }
}
</style>
