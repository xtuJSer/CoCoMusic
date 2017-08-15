<template>
  <div class="footer">
    <div class="play play-control-1">
      <a href="javascript:void(0);" @click="play(-1)">
        <img class="skip" src="../assets/img/previous.svg" alt=""> </a>
      <a href="javascript:void(0);" v-show="!isPlay" @click="musicUrl && audio.play()">
        <img class="play-pause" src="../assets/img/play3.svg" alt=""> </a>
      <a href="javascript:void(0);" v-show="isPlay" @click="musicUrl && audio.pause()">
        <img src="../assets/img/pause.svg" class="play-pause" alt=""> </a>
      <a href="javascript:void(0);" @click="play(1)">
        <img class="skip" src="../assets/img/next.svg" alt=""> </a>
    </div>
    <div class="play play-control-2">
      <p>{{currentTime}}</p>
      <input class="slider" v-model="currentRate" type="range" min="0" max="100" />
      <p>{{duration}}</p>
    </div>
    <div class="play play-control-3">
      <img src="../assets/img/volume.svg" alt="">
      <input class="slider" v-model="volume" type="range" min="0" max="100" value="50" />
      <a href="javascript:void(0);" v-show="loop" @click="loop = false">
        <img class="order" src="../assets/img/repeat.svg" alt=""> </a>
      <a href="javascript:void(0);" v-show="!loop" @click="loop = true">
        <img class="order" src="../assets/img/order.svg" alt=""> </a>
    </div>
    <audio :src="musicUrl" display=none></audio>
    <transition name="fade" mode="out-in">
      <div class="music" v-show="showLyric">
        <div class="music-info text-center">
          <router-link :to="`/album/${currentPlayMusic.albumMid}`" @click.native="$store.commit('setPlay',{showLyric:false})">
            <img v-lazy="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentPlayMusic.albumMid}.jpg`" alt=""> </router-link>
          <h4>{{currentPlayMusic.songName}}</h4>
          <router-link @click.native="$store.commit('setPlay',{showLyric:false})" :to="`/singer/${item.mid}/`" v-for="(item,index) in currentPlayMusic.singer" :key="index">
            <span>{{item.name}}</span> &nbsp; </router-link>
          <br/>
          <br/>
          <button class="btn btn-sm" @click="favoriteSong"> {{favorite ? '取消收藏' : '收藏'}} </button>
          <button class="close btn btn-link btn-lg" @click="$store.commit('setPlay',{showLyric:false})">
            <i class="icon icon-shutdown"></i>
          </button>
        </div>
        <div class="lyric text-center">
          <p v-for="(value,key) in lyric" :id="`lyric-${key}`" :key="key" v-html="value"> </p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Mpris from 'mpris-service'

const mpris = new Mpris({
  name: 'CocoMusic',
  identity: 'CocoMusic Music player',
  supportedUriSchemes: ['file'],
  supportedMimeTypes: ['audio/mpeg'],
  supportedInterfaces: ['player']
})

export default {
  data () {
    return {
      audio: {},
      isPlay: false,
      loop: window.localStorage.loop !== undefined ? !!window.localStorage.loop : true,
      duration: '',
      volume: window.localStorage.volume !== undefined ? +window.localStorage.volume : 100,
      currentTime: '',
      raw: {
        currentTime: 0,
        duration: 0
      }
    }
  },
  computed: {
    ...mapState({
      showLyric: state => state.Play.showLyric,
      lyric: state => state.Play.lyric,
      list: state => state.Play.list,
      currentPlay: state => state.Play.currentPlay,
      musicServer: state => state.Play.musicServer,
      key: state => state.Play.key,
      lyricTrans: state => state.Play.lyricTrans,
      guid: state => state.Play.guid
    }),
    favorite () {
      return this.currentPlayMusic.songMid in this.$store.state.Favorite.song
    },
    ...mapGetters([
      'currentPlayMusic', 'currentPlayMusicSingerSimpleName', 'currentPlayMusicSimpleName'
    ]),
    musicUrl () {
      return this.$store.getters.musicUrl[1]
    },
    currentRate: {
      get () {
        return Math.floor((this.raw.currentTime / this.raw.duration) * 100)
      },
      set (rate) {
        this.audio.currentTime = Math.floor((rate / 100) * this.audio.duration)
      }
    }
  },
  methods: {
    favoriteSong () {
      let song = this.currentPlayMusic
      this.favorite ? this.$store.commit('delFavoriteSong', song) : this.$store.commit('addFavoriteSong', song)
    },
    play (flag) {
      let next = this.currentPlay + flag
      if (next >= this.list.length) {
        next = 0
      } else if (next < 0) {
        next = this.list.length - 1
      }
      this.$store.commit('setPlay', {
        currentPlay: next
      })
    }
  },
  watch: {
    'isPlay' () {
      mpris.playbackStatus = this.isPlay ? 'Playing' : 'Paused'
    },
    'raw.duration' () {
      mpris.metadata['mpris:length'] = this.raw.duration * 1000
    },
    'musicUrl' () {
      mpris.metadata = {
        'mpris:trackid': mpris.objectPath('track/0'),
        'mpris:artUrl': `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.currentPlayMusic.albumMid}.jpg`,
        'xesam:title': this.currentPlayMusicSimpleName,
        'xesam:album': this.currentPlayMusic.albumName,
        'xesam:artist': this.currentPlayMusicSingerSimpleName
      }
      this.$store.dispatch('getLyric')
      this.$el.querySelector('.lyric').style.top = '0px'
      this.audio.load()
    },
    'volume' () {
      window.localStorage.volume = this.volume
      this.audio.volume = (this.volume / 100).toFixed(2)
    },
    'loop' () {
      window.localStorage.loop = this.loop ? 'loop' : ''
      this.audio.loop = this.loop
    }
  },
  created () {
    this.$store.dispatch('getKey')
  },
  mounted () {
    this.audio = this.$el.querySelector('audio')
    this.audio.autoplay = true
    this.audio.loop = this.loop
    this.audio.volume = (this.volume / 100).toFixed(2)

    mpris.on('play', e => {
      this.audio.play()
    })
    mpris.on('pause', e => {
      this.audio.pause()
    })
    mpris.on('playpause', e => {
      this.isPlay && this.audio.pause()
      this.isPlay || this.audio.play()
    })
    mpris.on('next', e => {
      this.play(1)
    })
    mpris.on('previous', e => {
      this.play(-1)
    })

    this.audio.addEventListener('play', e => {
      this.isPlay = true
    })
    this.audio.addEventListener('pause', e => {
      this.isPlay = false
    })
    this.audio.addEventListener('ended', e => {
      let currentPlay = (this.list.length - 1) === this.currentPlay ? 0 : this.currentPlay + 1
      this.$store.commit('setPlay', {
        currentPlay
      })
    })
    this.audio.addEventListener('durationchange', e => {
      this.raw.duration = this.audio.duration
      this.duration = `${Math.floor(this.audio.duration / 60)}:${Math.floor(this.audio.duration % 60)}`
    })
    this.audio.addEventListener('error', e => {
      console.log(e)
      // 这个的话是由于QQmusic没有320的mp3所以会404，至于别的错误，不要来找我，一定是你的环境有问题
      if (e.target === this.audio) {
        this.audio.src = this.$store.getters.musicUrl[0]
      }
      this.audio.load()
      this.isPlay = false
    })
    this.audio.addEventListener('timeupdate', e => {
      this.raw.currentTime = this.audio.currentTime
      this.currentTime = `${Math.floor(this.audio.currentTime / 60)}:${Math.floor(this.audio.currentTime % 60)}`
      let last
      let count = 0
      for (let key in this.lyric) {
        if (key <= this.raw.currentTime) {
          last = key
          count++
        } else {
          break
        }
      }
      let pre = this.$el.querySelector('.lyric-played')
      if (pre) {
        pre.classList.remove('lyric-played')
      }
      last = (last + '').replace('.', '\\' + '.')
      let current = this.$el.querySelector(`#lyric-${last}`)
      if (current) {
        current.classList.add('lyric-played')
      }
      if ((this.lyricTrans && count > 6) || (!this.lyricTrans && count > 0)) {
        this.$el.querySelector('.lyric').style.top = `-${(count - (this.lyricTrans ? 6 : 9)) * (this.lyricTrans ? 58 : 34)}px`
      } else {
        this.$el.querySelector('.lyric').style.top = '0px'
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/main.styl'

div.footer
  display flex
  justify-content space-between
  background-color #fff
  position fixed
  bottom 0px
  height 55px
  width 100%
  z-index 400
div.play-control-1
  display flex
  width 175px
  justify-content center
  margin-left 10px
  a
    &:focus
      box-shadow none
    img.play-pause
      width 40px
      height 40px
      margin-top 8px
      margin-left 15px
      margin-right 15px
    img.skip
      width 35px
      height 35px
      margin-top 10px

div.play-control-2
  display flex
  justify-content center
  align-items center
  width 100%
  p
    margin-bottom 0px
  input
    width 80%
    margin-left 10px
    margin-right 10px

div.play-control-3
  display flex
  align-items center
  input 
    width 100px
  img 
    width 20px
    height 20px
  img.order
    margin-left 10px
    margin-right 10px
    width 30px
    height 30px

.slider:focus
  box-shadow none

input[type=range]::-webkit-slider-runnable-track
  background linear-gradient(to right, white 0%, main-color 50%, white 100%)

.music
  position fixed
  top 0px
  left 0px
  width 100%
  height 100%
  // z-index 300
  background white
  display flex
  div.music-info
    width 30%
    margin-top 7%
    margin-left 3%
    img
      width 200px
      height 200px
      border-radius 50%
      animation 22s linear img-rotate infinite
div.play
  z-index 400
  background-color white
.lyric
  position relative
  width 100%
.lyric-played
  color main-color
  // white-space pre-line
@keyframes img-rotate
  0%
    transform rotate(0deg)
  100%
    transform rotate(-360deg)

.fade-enter, .fade-leave-active
  opacity 0
.fade-enter-active, .fade-leave-active
  transition: all .18s ease
</style>
