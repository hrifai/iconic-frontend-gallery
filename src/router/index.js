import Router from 'vue-router'
import SearchBar from '../components/search-bar'
import NotFoundCard from '../components/404Card'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchBar
    },{
      path: "*",
      component: NotFoundCard,
    }
  ],
  mode: 'history',
});

export default router
