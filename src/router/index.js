import Router from 'vue-router'
import MainCard from '../components/HomeCard.vue'
import FormCard from "../components/FormCard.vue"
import ResponseCard from '../components/ResponseCard'
// import SurveyCard from '../components/SurveyCard'
import EditCard from '../components/EditCard'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainCard,
    },
    {
      path: '/register',
      name: 'register',
      component: FormCard,
    },{
      path: '/form',
      name: 'form',
      component: ResponseCard
    },
    // {
    //   path: '/survey',
    //   name: 'survey',
    //   component: SurveyCard
    // },
    {
      path: '/edit',
      name: 'edit',
      component: EditCard
    }

  ],
  mode: 'history',
});

