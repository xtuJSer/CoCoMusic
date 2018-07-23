<template>
  <div class="favorite">
    <f-tab :list="tabList">
      <div :slot="route.name"
        :key="route.name"
        v-for="route in tabList">
        {{route.ZHName}}
      </div>
    </f-tab>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import fTab from '@/components/Tab'

export default {
  name: 'favorite',
  data () {
    return {
      tabList: [
        {name: 'Favorite', ZHName: '单曲'},
        {name: 'FavoriteAlbum', ZHName: '专辑'},
        {name: 'FavoriteSinger', ZHName: '歌手'}
      ]
    }
  },
  components: {
    fTab
  },
  computed: {
  }
}
</script>
<style scoped>

</style>
