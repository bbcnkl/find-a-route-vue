import Vue from 'vue'
import VueRouter from 'vue-router'
import VueProgressBar from 'vue-progressbar'

import routes from './routes'
import store from './store'

// Use Vue router
Vue.use(VueRouter)

// Setup progress bar
const optionsProgressBar = {
  color: '#007bfa',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '1.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, optionsProgressBar)

// Import top level component
import App from './App.vue'

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

require('bootstrap')

