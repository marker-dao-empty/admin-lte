import { createRouter, createWebHistory } from 'vue-router'
/**
 * Routes
 */
import Dashboard from '@/pages/dashboard/router'
import Login from '@/pages/login/router'
/**
 * Middleware
 */
import auth from '@/middleware/auth'
/**
 * Other
 */
import { APP_NAME } from '@/packages/data'

const routes = [
  ...Dashboard,
  ...Login,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title ?? APP_NAME

  document.title = title

  next()
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    await auth({ to, from, next })
  } else {
    next()
  }
})

export default router
