<template>
  <div>
    <div class="album-info">
      <img v-lazy="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMid}.jpg`" alt="">
      <div class="singer-info">
        <h3>{{albumName}}</h3>
        <router-link :to="`/singer/${singer.singerMid}`">
          <p>{{singer.singerName}}</p>
        </router-link>
      </div>
    </div>
    <div class="divider text-cente" data-content="音乐列表"></div>
    <f-music-list :list="{list, simple:true}"></f-music-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import fMusicList from './common/MusicList'

export default {
  components: {
    fMusicList
  },
  computed: {
    ...mapState({
      list: state => state.album.list,
      albumMid: state => state.album.albumMid,
      albumName: state => state.album.albumName,
      singer: state => state.album.singer
    })
  },
  created () {
    this.$store.commit('albumInit', this.$route.params.id)
    this.$store.dispatch('getAlbum')
  }
}
</script>
<style lang="stylus" scoped>
.album-info
  display flex
  align-items center
  img
    width 180px
    height 180px
    border-radius 10px
  div.singer-info
    margin-left 50px

.divider
  height 20px
  margin-top 20px
</style>
