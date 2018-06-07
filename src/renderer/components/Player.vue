<template>
  <div class="player" v-show="currentPlay.songName">
    <img src="../assets/img/previousmusic.svg" class="play" @click="previous" alt="">

    <div class="play-control">
      <img class="album-cover" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentPlay.album.albumMid}.jpg?max_age=2592000`" alt="">
      <div class="play-pause" style="display: none">
        <img v-show="!isPlay" @click="play" class="play" src="../assets/img/play.svg">
        <img v-show="isPlay" @click="pause" class="play" src="../assets/img/pause.svg">
      </div>
    </div>

    <img src="../assets/img/nextmusic.svg" @click="next" class="play" alt="">

    <div class="music-info">
      <p class="song-name">{{currentPlay.songName}}</p>
      <input v-model="range" class="slider" type="range" min="0" max="100" value="50" :style="{ background: `linear-gradient(to right, #5755d9 ${range}%, #5755d9 ${range}%,#eee ${range}%, #eee)`}">
      <div class="singer-name">
        <p>
          <span v-for="singer in currentPlay.singerList" :key="singer.singerMid">
            <router-link :to="{path: `/singer/${singer.singerMid}/music?name=${singer.singerName}`}">
              {{singer.singerName}}
            </router-link>
            &nbsp;
          </span>
        </p>
        <p class="music-volume">
          {{playTimeString}} / {{playDurationString}}
          <img src="../assets/img/volume.svg">
          <input v-model="volume" class="slider" type="range" min="0" max="100" value="50" :style="{ background: `linear-gradient(to right, #5755d9 ${volume}%, #5755d9 ${volume}%,#eee ${volume}%, #eee)`}">
          <img v-show="mode === 'cycle'" @click="changeMode" class="play-mode" src="../assets/img/cycle.svg" alt="">
          <img v-show="mode === 'single'" @click="changeMode" class="play-mode" src="../assets/img/single.svg" alt="">
          <img v-show="mode === 'random'" @click="changeMode" class="play-mode" src="../assets/img/random.svg" alt="">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

export default {
  data () {
    return {
      mode: 'cycle' // cycle single random
    }
  },
  computed: {
    ...mapState({
      player: state => state.Player.player,
      isPlay: state => state.Player.isPlay,
      playTime: state => state.Player.playTime,
      playDuration: state => state.Player.playDuration,
      playVolume: state => state.Player.playVolume,
      currentPlayIndex: state => state.Player.currentPlayIndex,
      playListLength: state => state.Player.playList.length
    }),
    ...mapGetters([
      'currentPlay', 'playTimeString', 'playDurationString'
    ]),
    range: {
      get () {
        return Math.floor((this.playTime / this.playDuration) * 100)
      },
      set (rate) {
        this.player.currentTime = Math.floor((rate / 100) * this.player.duration)
      }
    },
    volume: {
      get () {
        return Math.floor(this.playVolume * 100)
      },
      set (value) {
        this.$store.commit('setPlayVolume', +(value / 100).toFixed(2))
      }
    }
  },
  methods: {
    changeMode () {
      const modeList = {
        'cycle': 'single', 'single': 'random', 'random': 'cycle'
      }
      this.mode = modeList[this.mode]
    },
    play () {
      this.player.play()
    },
    pause () {
      this.player.pause()
    },
    previous () {
      this.$store.dispatch('setPlay', this.currentPlayIndex === 0 ? this.playListLength : this.currentPlayIndex - 1)
      this.player.load()
    },
    next () {
      this.$store.dispatch('setPlay', this.currentPlayIndex === this.playListLength ? 0 : this.currentPlayIndex + 1)
      this.player.load()
    }
  },
  mounted () {
    this.$store.dispatch('initPlayer')
    this.player.src = 'http://dl.stream.qqmusic.qq.com//M800001xF7q532DH2H.mp3?vkey=E8FB7A3A537784E1D758F8A3526B0D8E0398CAAD64A987F52D82F3D46C4747B28A71BDF437464D38F1391E387F95F266D7EACDD1131716EC&guid=761846748&fromtag=30'
    this.player.load()
  }
}
</script>
<style scoped>
.slider {
  border-radius: 5px;
  margin: 5px 0px;
  height: 3px;
}
.slider::-webkit-slider-runnable-track{
  background: transparent;
}

.play-control:hover .album-cover{
  display: none;
}
.play-control:hover div.play-pause {
  display: inline!important;
}
.play-pause img{
  width: 45px;
  height: 45px;
  margin: 5px 10px 0px 11px!important;
}
.player{
  width: 60%;
  display: flex;
}
.player>.music-info{
  width: 70%;
  margin-left: 10px;
}
.player>.music-info p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin: 0px;
}
.player>.music-info>p.song-name{
  font-size: 17px;
}
.singer-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.singer-name img {
  width: 15px;
  height: 15px;
  margin: 0px 5px 0px 10px!important;
}
.singer-name p{
  margin-top: 3px;
  font-size: 12px;
}
.music-volume {
  display: flex;
  align-items: center;
}
.player img:not(.album-cover){
  margin-top: 13px;
}
.player img.album-cover{
  box-shadow: 4px 5px 7px 1px rgba(112,128,151,0.35);
  border-radius: 16%;
  width: 50px;
  height: 50px;
}
img.play-mode{
  cursor: pointer;
  width: 22px;
  height: 22px;
}
img.play {
  cursor: pointer;
}
img{
  width: 23px;
  height: 23px;
  margin-left: 8px;
	margin-right: 8px;
}
</style>
