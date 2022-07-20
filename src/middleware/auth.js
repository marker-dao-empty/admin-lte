import store from '@/store'
import { cookies } from '@/packages/utils'

async function getProfile (token) {
  try {
    store.dispatch('auth/initAuth', token)

    await store.dispatch('auth/loadProfile')
  } catch (error) {
    store.dispatch('auth/logout')

    throw new Error(error)
  }
}

function moveOn ({ next, to }) {
  const toLogin = to.name === 'Login'

  if (toLogin) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
}

export default async function ({ next, to }) {
  const { isAuth: authStatus } = store.state.auth
  const token = cookies.get('token')

  if (authStatus) {
    moveOn({ next, to })
  } else if (token) {
    try {
      await getProfile(token)

      next({ name: to.name })
    } catch {
      next({ name: 'Login' })
    }
  } else {
    next({ name: 'Login' })
  }
}
