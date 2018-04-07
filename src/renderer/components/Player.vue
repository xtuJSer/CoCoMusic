<template>
  <div class="player" v-show="currentPlay.songName">
    <img src="../assets/img/previousmusic.svg" alt="">
    <div class="play-control">
      <img class="album-cover" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentPlay.album.albumMid}.jpg?max_age=2592000`" alt="">
      <div class="play-pause" style="display: none">
        <img v-show="!isPlay" @click="play" class="play" src="../assets/img/play.svg">
        <img v-show="isPlay" @click="pause" class="play" src="../assets/img/pause.svg">
      </div>

    </div>
    <img src="../assets/img/nextmusic.svg" alt="">

    <div class="music-info">
      <p class="song-name">{{currentPlay.songName}}</p>
      <p class="singer-name">
          <span v-for="singer in currentPlay.singerList" :key="singer.singerMid">
            <router-link :to="{path: `/singer/${singer.singerMid}/music?name=${singer.singerName}`}">
              {{singer.singerName}}
            </router-link>
          </span>
      </p>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapState({
      player: state => state.Player.player,
      isPlay: state => state.Player.isPlay
    }),
    ...mapGetters([
      'currentPlay'
    ])
  },
  methods: {
    play () {
      this.player.play()
    },
    pause () {
      this.player.pause()
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
.player>.music-info>p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin: 0px;
}
.player>.music-info>p.song-name{
  font-size: 17px;
}
.player>.music-info>p.singer-name{
  margin-top: 3px;
  font-size: 12px;
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
img{
  width: 23px;
  height: 23px;
  margin-left: 8px;
	margin-right: 8px;
}
</style>
