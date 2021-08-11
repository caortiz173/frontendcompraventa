import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from 'sweetalert2'
import '@mdi/font/css/materialdesignicons.css'
//import 'material-design-icons-iconfont/dist/material-design-icons.css'

//<v-btn color="white">
//<router-link white to="/login">
//  <span>Salir</span>
//  <v-icon right>exit_to_app</v-icon>
//</router-link>
//</v-btn>

import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)
import axios from 'axios'
axios.defaults.baseURL='https://tienda-2021.herokuapp.com/api/'
//axios.defaults.baseURL='https://gigat-backend-base.herokuapp.com/api/'
import 'bootstrap/dist/css/bootstrap.css'


import vuetify from './plugins/vuetify'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  Swal,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})
