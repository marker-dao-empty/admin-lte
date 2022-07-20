<template>
  <div>
    <dashboard-header>
      <template #title>
        Dashboard
      </template>

      <template #breadcrumb>
        Dashboard
      </template>
    </dashboard-header>

    <section class="content">
      <div class="container-fluid">
        <h4 class="content__title">
          Hello admin!
        </h4>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * Components Dashboard
 */
import DashboardHeader from '@/components/dashboard/dashboard-header/DashboardHeader'

export default {
  name: 'DashboardIndex',

  components: {
    DashboardHeader,
  },
}
</script>

<style lang="scss" scoped>
.content {
  &__title {
    text-align: center;
    margin: 0;
    padding: 100px;
  }
}
</style>
