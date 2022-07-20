/**
 * Pages
 */
import LoginIndex from './login-index/LoginIndex'

export default [
  {
    path: '/login',
    name: 'Login',
    component: LoginIndex,
    meta: {
      title: 'Login',
    },
  },
].map(item => { item.meta.layout = 'AuthLayout'; return item })
