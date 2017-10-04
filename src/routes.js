import Home from './components/modules/home/index.vue'
import RouteDetails from './components/modules/details/index.vue'
import NotFound from './components/modules/home/404.vue'

// Routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/route/:id',
    name: 'RouteDetailsById',
    component: RouteDetails
  }, {
    path: '/route/:firstLatLng/:secondLatLng',
    name: 'RouteDetails',
    component: RouteDetails
  }, {
    // not found handler
    path: '*',
    name: '404',
    component: NotFound
  }
]

export default routes
