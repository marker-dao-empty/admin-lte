<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <button
          class="nav-link"
          type="button"
          @click="onToggleMenuSidebar"
        >
          <i class="fas fa-bars"></i>
        </button>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <button
          class="nav-link"
          type="button"
          data-widget="fullscreen"
          @click="logoutHandler"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderDefault',

  methods: {
    ...mapActions('auth', [
      'logout',
    ]),

    onToggleMenuSidebar () {
      this.$emit('toggle-menu-sidebar')
    },

    logoutHandler () {
      this.logout()
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>