<template>
  <div class="login-box">
    <div class="card card-outline card-primary">
      <loader-default v-if="isLoading"></loader-default>

      <div class="card-header text-center">
        <a
          href="../../index2.html"
          class="h1"
        >
          <b>Shiny</b>Soleil
        </a>
      </div>

      <div class="card-body">
        <form @submit.prevent="submit">
          <form-error
            class="login-box__error"
            :messages="errorBaseMsgs"
          ></form-error>
                
          <div class="input-group mb-3">
            <input
              v-model="email"
              type="email"
              :class="emailInputClasses"
              placeholder="Email"
            >
              
            <form-error
              class="login-box__error"
              :messages="errorEmailMsgs"
            ></form-error>

            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>

          <div class="input-group mb-3">
            <input
              v-model="password"
              type="password"
              :class="passwordInputClasses"
              placeholder="Пароль"
            >
              
            <form-error
              class="login-box__error"
              :messages="errorPasswordMsgs"
            ></form-error>

            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <button
                type="submit"
                class="btn btn-primary btn-block"
              >
                Войти
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoaderDefault from '@/components/common/loader/LoaderDefault'
import FormError from '@/components/common/form/FormError'

export default {
  name: 'LoginIndex',

  components: {
    LoaderDefault,
    FormError,
  },

  data () {
    return {
      email: '',
      password: '',
      errors: [],
      isLoading: false,
    }
  },

  computed: {
    errorMap () {
      const { errors } = this

      return errors?.reduce((acc, item) => {
        acc[item.key] = item
        
        return acc
      }, {}) ?? {}
    },

    emailInputClasses () {
      const { errorMap } = this

      return [
        'form-control',
        {
          'is-invalid': errorMap.email,
        },
      ]
    },

    passwordInputClasses () {
      const { errorMap } = this

      return [
        'form-control',
        {
          'is-invalid': errorMap.password,
        },
      ]
    },

    errorEmailMsgs () {
      const { errorMap } = this

      return errorMap.email?.messages ?? []
    },

    errorPasswordMsgs () {
      const { errorMap } = this

      return errorMap.password?.messages ?? []
    },

    errorBaseMsgs () {
      const { errorMap } = this

      return errorMap.base?.messages ?? []
    },
  },

  methods: {
    ...mapActions('auth', [
      'login',
    ]),

    async submit() {
      const { email, password } = this

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      this.errors = []

      const data = {
        email: email.toLowerCase().replace(/\s+/g, ''),
        password,
      }

      try {
        await this.login(data)

        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.errors = error.response?.data?.errors ?? []
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__error {
    margin-bottom: 10px;
  }
}
</style>
