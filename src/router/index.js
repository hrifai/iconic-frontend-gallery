import Router from 'vue-router'
import LoginCard from '../components/LoginCard.vue'
import Movies from '../components/Movies'
import MovieCard from '../components/MovieCard'
import HistoryCard from '../components/HistoryCard'
import AddMovie from '../components/AddMovie'
import CheckoutCard from '../components/CheckoutCard'
import NotFoundCard from '../components/404Card'
import LogCard from '../components/LogCard'
import RecieptCard from '../components/RecieptCard'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginCard,
    },
    {
      path: '/menu',
      name: 'movies',
      component: Movies,
    },
    {
      path: "/movie/:selectedId",
      component: MovieCard,
      props: true
    },
    {
      path: "/history",
      component: HistoryCard,
      props: true
    },
    {
      path: '/logs',
      name: 'logs',
      component: LogCard,
      props:true
    },
    {
      path: '/reciept',
      name: 'reciept',
      component: RecieptCard,
      props:true
    },
    {
      path: "/addMovie",
      name: 'addMovie',
      component: AddMovie,
      props: true
    },
    {
      path: "/checkout",
      name: 'checkout',
      component: CheckoutCard,
      props: true
    },{
      path: "*",
      component: NotFoundCard,
    }
  ],
  mode: 'history',
});

export default router
