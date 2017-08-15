<template>
  <div class="select">
    <ul class="nav">
      <li class="nav-item" :class="{'active': $route.name === 'singerList' }">
        <img src="../assets/img/music4.svg" alt="">
        <router-link to="/">在线音乐</router-link>
      </li>
      <li class="nav-item"  :class="{'active': $route.name === 'playList' }">
        <img src="../assets/img/list.svg" alt="">
        <router-link to="/playList">播放列表</router-link>
      </li>
      <li class="nav-item" :class="{'active': /Favorite\w*/.test($route.name)}">
        <img src="../assets/img/favorite2.svg" alt="">
        <a href="javascript:void(0);">我的收藏</a>
        <ul class="nav">
          <li class="nav-item" :class="{'active': $route.name === 'FavoriteSinger' }">
            <router-link to="/FavoriteSinger">歌手</router-link>
          </li>
          <li class="nav-item" :class="{'active': $route.name === 'FavoriteSong' }">
            <router-link to="/FavoriteSong">音乐</router-link>
          </li>
          <li class="nav-item" :class="{'active': $route.name === 'FavoriteAlbum' }">
            <router-link to="/FavoriteAlbum">专辑</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <img src="../assets/img/setting.svg" alt="">
        <a href="#/Setting">设置</a>
      </li>
    </ul>
    <div class="play-music">
      <img v-show="!currentPlayMusic.albumMid" src="../assets/img/music4.svg" alt="">
      <a href="javascript:void(0);" @click="$store.commit('setPlay',{showLyric:true})">
        <img v-show="currentPlayMusic.albumMid" v-lazy="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentPlayMusic.albumMid}.jpg`" alt="">
      </a>
      <div class="music-info">
        <h6>{{currentPlayMusic.songName}}</h6>
        <p>{{currentPlayMusicSingerSimpleName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    currentPlayMusic () {
      let { list, currentPlay } = this.$store.state.Play
      return list[currentPlay] || {
        songName: '---++---'
      }
    },
    ...mapState({
      showLyric: state => state.Play.showLyric
    }),
    ...mapGetters([
      'currentPlayMusicSingerSimpleName'
    ])
  },
  created () {
    this.$store.dispatch('initFavorite')
  }
}
</script>
<style lang="stylus" scoped>
.select
  font-size 1.5rem
  margin-top 10px
  margin-left 25px
  width 175px
  position fixed
  top 50px
  z-index 300
.nav-item
  a
    position relative
    bottom 6px
  img
    width 25px

.play-music
  width 175px
  height 70px
  position fixed
  left 3px
  bottom 56px
  div.music-info
    display inline-block
    h6
      width 98px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      margin-bottom 8px
      margin-top 12px
    p
      width 98px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  img
    float left
    width 70px
    height 70px
    margin-right 4px 
    border-radius 6px
</style>
