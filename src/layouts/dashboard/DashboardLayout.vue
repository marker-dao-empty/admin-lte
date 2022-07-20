<template>
  <main :class="classes">
    <header-default @toggle-menu-sidebar="toggleMenuSidebar"></header-default>

    <sidebar-default v-if="USER"></sidebar-default>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

    <footer-default></footer-default>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderDefault from '@/components/layout/header/HeaderDefault'
import SidebarDefault from '@/components/layout/sidebar/SidebarDefault'
import FooterDefault from '@/components/layout/footer/FooterDefault'

export default {
  name: 'DashboardLayout',

  components: {
    FooterDefault,
    HeaderDefault,
    SidebarDefault,
  },

  data () {
    return {
      isSidebarCollapsed: false,
    }
  },

  computed: {
    ...mapGetters('auth', [
      'USER',
    ]),

    classes () {
      const { isSidebarCollapsed } = this

      return [
        'sidebar-mini',
        'layout-fixed',
        isSidebarCollapsed && 'sidebar-collapse',
      ]
    },
  },

  methods: {
    toggleMenuSidebar () {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    },
  },
}
</script>
