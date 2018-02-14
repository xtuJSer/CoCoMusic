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

let initData = {
  albumLoading: false,
  albumPage: 0,
  albumList: [],
  albumTotal: 1
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

export default {
  mixins: [albumMixins],
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
  watch: {
    '$route.params.id' (value) {
      if (!value) return
      this.$common.objectCopy(initData, this)
      this.getTheSingerAlbumList(0)
    }
  },
  created () {
    this.getTheSingerAlbumList(0)
  }
}
</script>
<style>

</style>
