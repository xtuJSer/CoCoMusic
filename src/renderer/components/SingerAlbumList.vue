<template>
  <div>
    <f-album-list :albumList="list"></f-album-list>
    <button class="btn btn-block" v-show="!isEnd" :class="{'loading': loading}"
      @click="!isEnd && getTheList(page + 1)">更多</button>
    <div class="divider text-center" data-content="没有了" v-show="isEnd" ></div>
  </div>
</template>
<script>
import fAlbumList from './AlbumList'
import listMixins from './common/listMixins.js'
import { getSingerAlbumList } from '../../spider/index.js'

export default {
  mixins: [listMixins],
  data () {
    return {
      getList: getSingerAlbumList
    }
  },
  components: {
    fAlbumList
  }
}
</script>
<style>

</style>
