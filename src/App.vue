<template>
  <component :is="layout">
    <router-view ></router-view>
  </component>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'App',

  components: {
    DashboardLayout: defineAsyncComponent(() => import('@/layouts/dashboard/DashboardLayout')),
    AuthLayout: defineAsyncComponent(() => import('@/layouts/auth/AuthLayout')),
  },

  computed: {
    layout () {
      return this.$route.meta.layout
    },
  },
}
</script>
