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
import {generateRouterMixins} from './common/getRouterMixins.js'

let initData = {
  musicLoading: false,
  musicPage: 0,
  musicList: [],
  musicTotal: 1,
  singerMidSave: ''
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
let routerMixins = generateRouterMixins({
  watchName: '$route.params.id',
  sourceId: 'singerMidSave',
  methodsName: 'getTheSingerMusicList',
  methodsParams: [0],
  initData
})

export default {
  mixins: [musicMixins, routerMixins],
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
  created () {
    this.getTheSingerMusicList(0)
  }
}
</script>
<style>

</style>
