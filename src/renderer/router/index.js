import Vue from 'vue'
import Router from 'vue-router'
import SingerList from '@/components/SingerList.vue'
import Singer from '@/components/Singer.vue'
import SingerMusic from '@/components/SingerMusicList.vue'
import SingerMv from '@/components/SingerMvList'
import SingerAlbum from '@/components/SingerAlbumList'
import MvPlayer from '@/components/MvPlayer'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/singerList',
      name: 'SingerList',
      component: SingerList
    },
    {
      path: '/setting',
      name: 'Setting',
      component: SingerList
    },
    {
      path: '/singer/:id',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: 'music',
          component: SingerMusic
        },
        {
          path: 'mv',
          component: SingerMv
        },
        {
          path: 'album',
          component: SingerAlbum
        }
      ]
    },
    {
      path: '/mv/:mvId',
      name: 'mvPlayer',
      component: MvPlayer
    },
    {
      path: '/search',
      name: 'Search',
      component: SingerList
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: SingerList
    },
    {
      path: '/songList',
      name: 'SongList',
      component: SingerList
    },
    {
      path: '*',
      name: 'default',
      component: SingerList
    }
  ]
})
