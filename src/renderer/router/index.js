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
      path: '/album/:id',
      name: 'album',
      component: require('../components/Album')
    },
    {
      path: '/playList',
      name: 'playList',
      component: require('../components/PlayList')
    },
    {
      path: '/search/:keyWord',
      name: 'search',
      component: require('../components/Search')
    },
    {
      path: '/FavoriteSinger',
      name: 'FavoriteSinger',
      component: require('../components/FavoriteSinger')
    },
    {
      path: '/FavoriteSong',
      name: 'FavoriteSong',
      component: require('../components/FavoriteSong')
    },
    {
      path: '/FavoriteAlbum',
      name: 'FavoriteAlbum',
      component: require('../components/FavoriteAlbum')
    },
    {
      path: '/MV/:vid',
      name: 'MV',
      component: require('../components/MV')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
