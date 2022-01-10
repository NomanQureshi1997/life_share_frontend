import '@/plugins/vue-composition-api'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import HighchartsVue from "highcharts-vue";

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(HighchartsVue);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://lifesharebackend.herokuapp.com/api'


axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status == 401){
    localStorage.removeItem('token')
    localStorage.removeItem('CurrentUserEmail')
    localStorage.removeItem('userName')
    router.push('login') 
  }
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
