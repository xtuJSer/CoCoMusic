<template>
  <div>
    <div class="music-item" v-for="(item,index) in list.list" :key="index" :class="{'isPlay': currentPlay.songMid === item.songMid}">
      <h6>
        <img v-show="currentPlay.songMid === item.songMid" class="playing" src="../../assets/img/music3.svg" alt=""> &nbsp; {{index}}. &nbsp;
        <router-link v-for="singer in item.singer" :key="singer.mid" v-show="showUser" :to="`/singer/${singer.mid}`">{{singer.name}}&nbsp; </router-link> {{item.songName}} </h6>
      <div class="action">
        <button class="btn btn-link" @click="play(index)">
          <img src="../../assets/img/play2.svg" alt=""> </button>
        <button class="btn btn-link" @click="showDownload = true,downloadIndex = index">
          <img src="../../assets/img/download.svg" alt=""> </button>
      </div>
      <div class="album">
        <router-link :to="`/album/${item.albumMid}/`">
          <p v-if="!hideAlbum">{{item.albumName}}</p>
        </router-link>
      </div>
    </div>
    <div class="modal" :class="{'active': showDownload}">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <button class="btn btn-clear float-right" @click="showDownload = false"></button>
          <div class="modal-title">Download</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <p>请复制链接自行下载</p>
            <div>
              <h5>128kbps:
                <button class="btn" @click="download('M500')">复制链接</button>
              </h5>
              <h5>320kbps:
                <button class="btn" @click="download('M800')">复制链接</button>
              </h5>
              <p>Tip: &nbsp; if 320kbps的资源不能下载,亲下载128kbps</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="showDownload = false">
            close
          </button>
        </div>
      </div>
    </div>
    <div v-if="!hideMoreBtn">
      <button class="more btn btn-block" @click="$emit('next')" v-show="!list.isEnd" :class="{'loading':list.isLoading}">More</button>
      <div class="divider text-center" v-show="list.isEnd" data-content="没有了"></div>
    </div>
  </div>
</template>
<script>
import { clipboard } from 'electron'
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      showDownload: false,
      downloadIndex: 0
    }
  },
  props: ['list', 'hideMoreBtn', 'hideAlbum', 'showUser'],
  computed: {
    ...mapGetters([
      'currentPlay'
    ]),
    ...mapState({
      musicServer: state => state.Play.musicServer,
      key: state => state.Play.key,
      guid: state => state.Play.guid
    })
  },
  methods: {
    play (index) {
      if (this.list.list === this.$store.state.Play.list) {
        this.$store.commit('setPlay', {
          currentPlay: index
        })
        return
      }
      this.$store.commit('setPlay', {
        list: this.list.list,
        currentPlay: index
      })
    },
    download (Meta) {
      let music = this.list.list[this.downloadIndex]
      clipboard.writeText(`${this.musicServer}/${Meta}${music.songMid}.mp3?vkey=${this.key}&guid=${this.guid}&fromtag=30`)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/main.styl'

.music-item
  &:hover
    background light-gray-color
    color main-color
    div.action
      display block
  display flex
  justify-content space-between
  h6
    width 350px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    margin-top 0px
    img.playing
      width 20px
      height 20px
  div.action
    display none
    img
      height 20px
      width 20px
  div.album
    width 200px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

.isPlay
  color main-color

.modal-container
  width 500px
</style>
