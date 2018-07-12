import Vue from 'vue'
import Router from 'vue-router'
import SingerList from '@/components/SingerList.vue'
import Singer from '@/components/Singer.vue'
import SingerMusic from '@/components/SingerMusicList.vue'
import SingerMv from '@/components/SingerMvList'
import SingerAlbum from '@/components/SingerAlbumList'
import MvPlayer from '@/components/MvPlayer'
import Search from '@/components/Search'
import Lyric from '@/components/Lyric'
import Album from '@/components/Album'
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
      path: '/singer/:singerMid',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: 'music',
          name: 'SingerMusic',
          component: SingerMusic
        },
        {
          path: 'mv',
          name: 'SingerMv',
          component: SingerMv
        },
        {
          path: 'album',
          name: 'SingerAlbum',
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
      component: Search
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
    },
    {
      path: '/lyric',
      name: 'Lyric',
      component: Lyric
    },
    {
      path: '/album/:id',
      name: 'Album',
      component: Album
    }
  ]
})
