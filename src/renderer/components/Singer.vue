<template>
  <div>
    <div class="singerInfo">
      <img v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerMid}.jpg`" alt="">
      <div>
        <h4>{{singerName}}</h4>
        <button class="btn btn-sm">收藏</button>
      </div>
    </div>
    <div class="singer-tab">
      <ul class="tab tab-block">
        <li class="tab-item" :class="{'active': select === 'showMusicList'}">
          <a href="javascript:void(0);" @click="$store.commit('setSinger',{select:'showMusicList'})">歌曲</a>
        </li>
        <li class="tab-item" :class="{'active': select === 'showAlbumList'}">
          <a href="javascript:void(0);" @click="$store.commit('setSinger',{select:'showAlbumList'})">专辑</a>
        </li>
        <li class="tab-item" :class="{'active': select === 'showMvList'}">
          <a href="javascript:void(0);" @click="$store.commit('setSinger',{select:'showMvList'})">MV</a>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <f-music-list v-show="select === 'showMusicList'" :list="musicList" @next="nextMusicList"></f-music-list>
    </transition>
    <transition name="fade">
      <f-album-list v-show="select === 'showAlbumList'" :list="albumList" @next="nextAlbumList"></f-album-list>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import fMusicList from './common/MusicList'
import fAlbumList from './common/AlbumList'

export default {
  data () {
    return {
      id: ''
    }
  },
  components: {
    fMusicList, fAlbumList
  },
  computed: {
    ...mapState({
      singerName: state => state.Singer.singerName,
      select: state => state.Singer.select,
      singerMid: state => state.Singer.singerMid,
      musicList: state => state.Singer.musicList,
      albumList: state => state.Singer.albumList
    })
  },
  methods: {
    nextMusicList () {
      this.$store.dispatch('NextSingerMusicList')
    },
    nextAlbumList () {
      this.$store.dispatch('nextAlbumList')
    }
  },
  created () {
    this.$store.commit('SingerInit', this.$route.params.id)
    if (!this.musicList.list.length) {
      this.nextMusicList()
      this.nextAlbumList()
    }
  }
}
</script>
<style lang="stylus" scoped>
.fade-enter, .fade-leave-active
  opacity 0
  transform translateX(10px)
.fade-enter-active, .fade-leave-active
  transition all .18s ease

.singerInfo
  display flex
  align-items center
  img
    margin-left 30px
    border-radius 50%
    width 150px
    height 150px
  div
    margin-left 60px
.singer-tab
  margin-bottom 30px
.more
  margin-top 20px
</style>
