import Vue from 'vue'
import Router from 'vue-router'
import Today from '@/components/Today'
import Tomorrow from '@/components/Tomorrow'
import Fivedays from '@/components/Five_days'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Today',
      component: Today
    },
    {
      path: '/tomorrow',
      name: 'Tomorrow',
      component: Tomorrow
    },
    {
      path: '/five_days',
      name: 'Five_days',
      component: Fivedays
    }
  ]
})
