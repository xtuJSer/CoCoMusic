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
import Favorite from '@/components/Favorite'
import FavoriteSinger from '@/components/FavoriteSinger'
import FavoriteSong from '@/components/FavoriteSong'
import FavoriteAlbum from '@/components/FavoriteAlbum'
import FavoritePlayList from '@/components/FavoritePlayList'
import Setting from '@/components/Setting'
import PlayList from '@/components/PlayList'
import PlayListInfo from '@/components/PlayListInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/singerList',
      name: 'SingerList',
      component: SingerList
    },
    {
      path: '/playListInfo/:playListMid',
      name: 'playListInfo',
      component: PlayListInfo,
      props: (route) => ({
        ...route.params, ...route.query
      })
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
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
      path: '/mv',
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
      component: Favorite,
      children: [
        {
          path: '',
          component: FavoriteSong,
          name: 'Favorite'
        },
        {
          path: 'album',
          component: FavoriteAlbum,
          name: 'FavoriteAlbum'
        },
        {
          path: 'singer',
          component: FavoriteSinger,
          name: 'FavoriteSinger'
        },
        {
          path: 'playList',
          component: FavoritePlayList,
          name: 'FavoritePlayList'
        }
      ]
    },
    {
      path: '/PlayList',
      name: 'PlayList',
      component: PlayList
    },
    {
      path: '/',
      name: 'default',
      component: SingerList
    },
    {
      path: '*',
      name: 'else',
      component: SingerList
    },
    {
      path: '/lyric',
      name: 'Lyric',
      component: Lyric,
      meta: { fullScreen: true }
    },
    {
      path: '/album/:id',
      name: 'Album',
      component: Album
    }
  ]
})
