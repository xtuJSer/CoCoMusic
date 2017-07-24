import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'singerList',
      component: require('../components/SingerList')
    },
    {
      path: '/singer/:id',
      name: 'singer',
      component: require('../components/Singer')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
