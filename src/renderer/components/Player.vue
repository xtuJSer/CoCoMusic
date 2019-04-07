<template>
  <div class="player" v-show="currentPlay.songName">
    <img src="../assets/img/previousmusic.svg" class="play" @click="previous" title="上一首" alt="上一首">

    <div class="play-control">
      <img class="album-cover" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentPlay.album.albumMid}.jpg?max_age=2592000`" alt="">
      <div class="play-pause" style="display: none">
        <img v-show="!isPlay" @click="play" alt="播放" title="播放" class="play" src="../assets/img/play.svg">
        <img v-show="isPlay" @click="pause" alt="暂停" title="暂停" class="play" src="../assets/img/pause.svg">
      </div>
    </div>

    <img src="../assets/img/nextmusic.svg" @click="next" class="play" title="下一首" alt="下一首">

    <div class="music-info">
      <router-link to="/lyric">
        <p class="song-name">
          {{currentPlay.songName}}
        </p>
      </router-link>

      <div class="loading" v-show="loading"></div>
      <div class="loading-instead" v-show="!loading"></div>
      <router-link :to="playUrl" class="indicate">
        <img src="../assets/img/source.svg" alt="列表" title="列表">
      </router-link>
      <router-link :to="`/album/${currentPlay.album.albumMid}`" class="indicate">
        <img src="../assets/img/album.svg" alt="专辑" title="专辑">
      </router-link>

      <input v-model="range" class="slider" type="range" min="0" max="100" value="50" :style="{ background: `linear-gradient(to right, #5755d9 ${range}%, #5755d9 ${range}%,#eee ${range}%, #eee)`}">
      <div class="singer-name">
        <p>
          <span v-for="singer in currentPlay.singerList" :key="singer.singerMid">
            <router-link :to="{path: `/singer/${singer.singerMid}/music`, query: {name: singer.singerName}}">
              {{singer.singerName}}
            </router-link>
            &nbsp;
          </span>
        </p>
        <p class="music-volume">
          {{playTimeString}} / {{playDurationString}}
          <img src="../assets/img/volume.svg">
          <input v-model="volume" class="slider" type="range" min="0" max="100" value="50" :style="{ background: `linear-gradient(to right, #5755d9 ${volume}%, #5755d9 ${volume}%,#eee ${volume}%, #eee)`}">
          <img v-show="mode === 'cycle'" @click="changeMode" class="play-mode" src="../assets/img/cycle.svg" title="循环播放" alt="循环播放">
          <img v-show="mode === 'single'" @click="changeMode" class="play-mode" src="../assets/img/single.svg" title="单曲循环" alt="单曲循环">
          <img v-show="mode === 'random'" @click="changeMode" class="play-mode" src="../assets/img/random.svg" title="随机播放" alt="随机播放">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
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
      mode: state => state.Player.mode,
      playListLength: state => state.Player.playList.length,
      playUrl: state => state.Player.playUrl,
      loading: state => state.Player.loading
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
    ...mapActions([
      'previous', 'next'
    ]),
    changeMode () {
      const modeList = {
        'cycle': 'single', 'single': 'random', 'random': 'cycle'
      }
      this.$store.commit('setPlayMode', modeList[this.mode])
    },
    play () {
      this.player.play()
    },
    pause () {
      this.player.pause()
    }
  },
  created () {
    this.$store.dispatch('initPlayer')
  }
}
</script>
<style scoped>

a:visited {
  color: #302ecd;
}
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.loading-instead {
  display: inline-block;
  width: 20px;
  height: 20px;
}
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
  margin-top: 3px;
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
.player>.music-info p.song-name{
  display: inline-block;
  font-size: 17px;
  width: 330px;
}
.player>.music-info .indicate{
  float: right;
  cursor: pointer;
  margin: 10px 10px 10px 0px;
  width: 20px;
  height: 20px;
}
.indicate img {
  margin: 0px 3px 0px 0px!important;
  width: 20px;
  height: 20px;
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
