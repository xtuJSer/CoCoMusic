<template>
  <div class="song-list">
    
    <div class="song-item"
      v-for="(music,index) in musicList"
      :key="music.songMid"
      :id="`music${music.songMid}`">

      <div class="song-item-head" :class="{'is-play': currentPlay && music.songMid === currentPlay.songMid}">

        <button class="play-control btn btn-link" v-show="currentPlay && music.songMid !== currentPlay.songMid">
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

    <div class="music-location" v-show="isPlayList">
      <button class="btn btn-link" @click="focusPlay">
        <i class="icon icon-location"></i>
      </button>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'

export default {
  data () {
    return {}
  },
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
    ]),
    ...mapState({
      playUrl: state => state.Player.playUrl,
      mode: state => state.Player.mode
    }),
    isPlayList () {
      return this.$route.path === this.playUrl
    }
  },
  filters: {
    deleteOtherName (fullName) {
      return fullName.split(' (')[0]
    }
  },
  watch: {
    'musicList' (value) {
      return this.isPlayList && this.$store.commit('setPlayerState', {
        playList: [...this.musicList]
      })
    }
  },
  methods: {
    focusPlay () {
      const id = `#music${this.currentPlay.songMid}`
      document.querySelector(id).scrollIntoView({block: 'center', behavior: 'smooth'})
    },
    play (index) {
      this.$store.commit('setPlayerState', {
        playList: [...this.musicList],
        playUrl: this.$route.path
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
.music-location {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.music-location button{
  background: transparent;
}

.song-item {
  margin-top: 10px;
  font-size: 15px;
  margin-bottom: 15px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
button.play-control {
  display: none;
}
button.play-control>img{
  width: 20px;
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

</style>
