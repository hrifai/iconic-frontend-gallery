import Router from 'vue-router'
import SearchBar from '../components/search-bar'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchBar
    }
  ],
  mode: 'history',
});

export default router
