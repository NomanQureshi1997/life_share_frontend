import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://lifesharebackend.herokuapp.com/api'
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
