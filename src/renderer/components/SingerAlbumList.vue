<template>
  <div>
    <f-album-list :albumList="albumList"></f-album-list>
    <button class="btn btn-block" v-show="!isAlbumListEnd" :class="{'loading': albumLoading}"
      @click="!isAlbumListEnd && getTheSingerAlbumList(albumPage + 1)">更多</button>
    <div class="divider text-center" data-content="没有了" v-show="isAlbumListEnd" ></div>
  </div>
</template>
<script>
import fAlbumList from './AlbumList'
import {generateGetListMixins} from './common/getListMixins.js'
import {getSingerAlbumList} from '../../spider/index.js'
import {generateRouterMixins} from './common/getRouterMixins.js'

let initData = {
  albumLoading: false,
  albumPage: 0,
  albumList: [],
  albumTotal: 1,
  singerMidSave: ''
}

let albumMixins = generateGetListMixins({
  methodsName: 'getTheSingerAlbumList',
  loadingName: 'albumLoading',
  pageName: 'albumPage',
  initData: JSON.parse(JSON.stringify(initData)),
  spiderMethod: getSingerAlbumList,
  spiderMethodParams: {
    page: 'albumPage',
    singerMid: 'singerMid'
  },
  listDataName: 'albumList',
  operation: 'append'
})

let routerMixins = generateRouterMixins({
  watchName: '$route.params.id',
  sourceId: 'singerMidSave',
  methodsName: 'getTheSingerAlbumList',
  methodsParams: [0],
  initData
})

export default {
  mixins: [albumMixins, routerMixins],
  components: {
    fAlbumList
  },
  computed: {
    singerMid () {
      return this.$route.params.id
    },
    isAlbumListEnd () {
      return this.albumTotal <= this.albumPage
    }
  },
  created () {
    this.getTheSingerAlbumList(0)
  }
}
</script>
<style>

</style>
