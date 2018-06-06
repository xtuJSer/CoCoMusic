<template>
  <div class="song-list">
    
    <div class="song-item"
      v-for="(music,index) in musicList"
      :key="music.songMid">

      <div class="song-item-head">
        <button class="play-control btn btn-link" :class="{'is-play': currentPlay && music.songMid === currentPlay.songMid}">
          <img src="../assets/img/play2.svg" @click="play(index)" alt="">
        </button>

        <router-link
          v-show="showSingerList"
          :to="{path: `/singer/${singer.singerMid}/music`, query: {name: singer.singerName}}"
          v-for="singer in music.singerList"
          :key="singer.singerMid">
          <p>{{singer.singerName | deleteOtherName}} </p>
        </router-link>

        <p>{{music.songName}}</p>
      </div>
      <p class="song-album">{{music.album.albumName}}</p>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    musicList: Array,
    showSingerList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'currentPlay'
    ])
  },
  filters: {
    deleteOtherName (fullName) {
      return fullName.split(' (')[0]
    }
  },
  methods: {
    play (index) {
      this.$store.commit('setPlayerState', {
        playList: this.musicList
      })
      this.$store.dispatch('setPlay', index)
    }
  }
}
</script>
<style scoped>
.song-list {
  margin-top: 15px;
  margin-bottom: 20px;
}
.song-item {
  margin-top: 10px;
  font-size: 15px;
  margin-bottom: 15px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.song-item:hover, .is-play{
  color: #5764c6;
  text-shadow: 1px 1px 20px;
}
.song-item:hover button.play-control{
  display: inline;
}
.song-item p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 36px;
  margin-bottom: 0px;
  margin-left: 10px;
}
.song-item-head {
  display: flex;
  width: 70%;
  align-items: center;
}
.song-item-head .singer-name{
  max-width: 500px;
}
.song-album{
  margin-left: 50px;
  width: 30%;
}
button.play-control {
  display: none;
}
button.play-control>img{
  width: 20px;
}
</style>
