<template>
  <div class="favorite">
    <f-tab :list="tabList">
      <div :slot="route.name"
        :key="route.name"
        v-for="route in tabList">
        {{route.ZHName}}
      </div>
    </f-tab>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>      
    </transition>
  </div>
</template>
<script>
import fTab from '@/components/Tab'
import { RemoteToLocal } from '../../spider/favorite'
import throttle from 'lodash/throttle'

const remoteWithThrottle = throttle(RemoteToLocal, 3600 * 1000)

export default {
  name: 'favorite',
  data () {
    return {
      tabList: [
        { name: 'Favorite', ZHName: '单曲' },
        { name: 'FavoriteAlbum', ZHName: '专辑' },
        { name: 'FavoriteSinger', ZHName: '歌手' },
        { name: 'FavoritePlayList', ZHName: '歌单' }
      ]
    }
  },
  components: {
    fTab
  },
  computed: {
  },
  activated () {
    window.localStorage.logined && remoteWithThrottle()
  }
}
</script>
<style scoped>

</style>
