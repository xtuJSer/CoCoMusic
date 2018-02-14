<template>
  <div>
    <song-list :musicList="musicList"></song-list>
    <button class="btn btn-block" v-show="!isMusicListEnd" :class="{'loading': musicLoading}"
      @click="!isMusicListEnd && getTheSingerMusicList(musicPage + 1)">更多</button>
      <div class="divider text-center" data-content="没有了" v-show="isMusicListEnd" ></div>
  </div>
</template>
<script>
import songList from './SongList'
import {getSingerMusicList} from '../../spider/index.js'
import {generateGetListMixins} from './common/getListMixins.js'

let initData = {
  musicLoading: false,
  musicPage: 0,
  musicList: [],
  musicTotal: 1
}
let musicMixins = generateGetListMixins({
  methodsName: 'getTheSingerMusicList',
  loadingName: 'musicLoading',
  pageName: 'musicPage',
  initData: JSON.parse(JSON.stringify(initData)),
  spiderMethod: getSingerMusicList,
  spiderMethodParams: {
    page: 'musicPage',
    singerMid: 'singerMid'
  },
  listDataName: 'musicList',
  operation: 'append'
})

export default {
  mixins: [musicMixins],
  components: {
    songList
  },
  computed: {
    singerMid () {
      return this.$route.params.id
    },
    isMusicListEnd () {
      return this.musicTotal <= this.musicPage
    }
  },
  watch: {
    '$route.params.id' (value) {
      if (!value) return
      this.$common.objectCopy(initData, this)
      this.getTheSingerMusicList(0)
    }
  },
  created () {
    this.getTheSingerMusicList(0)
  }
}
</script>
<style>

</style>
