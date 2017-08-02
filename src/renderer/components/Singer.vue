<template>
  <div>
    <div class="singerInfo">
      <img v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerMid}.jpg`" alt="">
      <div>
        <h4>{{singerName}}</h4>
        <button class="btn btn-sm" @click="favoriteSinger">{{favorite ? '取消关注' : '关注'}}</button>
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
    <transition name="fade">
      <f-mv-list v-show="select === 'showMvList'" :list="MVList" @next="nextMVList"></f-mv-list>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import fMusicList from './common/MusicList'
import fAlbumList from './common/AlbumList'
import fMvList from './common/MVList'

export default {
  data () {
    return {
      id: ''
    }
  },
  components: {
    fMusicList, fAlbumList, fMvList
  },
  computed: {
    ...mapState({
      singerName: state => state.Singer.singerName,
      select: state => state.Singer.select,
      singerMid: state => state.Singer.singerMid,
      musicList: state => state.Singer.musicList,
      albumList: state => state.Singer.albumList,
      MVList: state => state.Singer.MVList
    }),
    favorite () {
      return this.singerMid in this.$store.state.Favorite.singer
    }
  },
  methods: {
    favoriteSinger () {
      let singer = {
        singerName: this.singerName,
        singerMid: this.singerMid
      }
      this.favorite ? this.$store.commit('delFavoriteSinger', singer) : this.$store.commit('addFavoriteSinger', singer)
    },
    nextMusicList () {
      this.$store.dispatch('NextSingerMusicList')
    },
    nextAlbumList () {
      this.$store.dispatch('nextAlbumList')
    },
    nextMVList () {
      this.$store.dispatch('nextMVList')
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('SingerInit', to.params.id)
    this.nextMusicList()
    this.nextAlbumList()
    this.nextMVList()
    next()
  },
  created () {
    this.$store.commit('SingerInit', this.$route.params.id)
    if (!this.musicList.list.length) {
      this.nextMusicList()
      this.nextAlbumList()
      this.nextMVList()
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
