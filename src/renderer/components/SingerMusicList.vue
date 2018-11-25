<template>
  <div>
    <song-list :musicList="list"></song-list>
    <button class="btn btn-block" v-show="!isEnd" :class="{'loading': loading}"
      @click="!isEnd && getTheList(page + 1)">更多</button>
      <div class="divider text-center" data-content="没有了" v-show="isEnd" ></div>
  </div>
</template>
<script>
import songList from './SongList'
import { getSingerMusicList } from '../../spider/index.js'
import listMixins from './common/listMixins.js'

export default {
  data () {
    return {
      getList: getSingerMusicList
    }
  },
  mixins: [listMixins],
  components: {
    songList
  }
}
</script>
<style scoped>
</style>
