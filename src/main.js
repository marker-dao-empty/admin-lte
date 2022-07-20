/**
 * Main
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
/**
 * Axios
 */
import axios from 'axios'
import VueAxios from 'vue-axios'
/**
 * Toast Notification
 */
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
/**
 * Root Styles
 */
import './assets/styles/index.scss'
/**
 * Other
 */
import SmartTable from 'vuejs-smart-table'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.use(VueToast)
app.use(SmartTable)
app.mount('#app')
