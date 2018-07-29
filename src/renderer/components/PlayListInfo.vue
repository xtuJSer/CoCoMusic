<template>
  <div>
    <div class="playList-info-head">
      <img :src="imgUrl" alt="">
      <div class="playList-info-name">
        <h4>{{playListName}}</h4>
        <button class="btn btn-sm">收藏</button>
        <!-- <button class="btn btn-sm" v-show="isfocus()" @click="deleteFavorite()">取消收藏</button> -->
      </div>
    </div>
    <div class="divider text-center"></div>

    <song-list :musicList="list" showSingerList></song-list>
  </div>
</template>
<script>
import {getPlayListInfo} from '../../spider/index.js'
import songList from './SongList'

export default {
  props: ['playListId', 'imgUrl'],
  components: {
    songList
  },
  data () {
    return {
      list: [],
      playListName: 'Loading',
      id: ''
    }
  },
  methods: {
    async getThePlayListInfo () {
      Object.assign(this, this.$options.data.call(this))
      Object.assign(this, (await getPlayListInfo(this)))
      this.id = this.playListId
    }
  },
  async activated () {
    if (this.id === this.playListId) return
    await this.getThePlayListInfo()
  }
}
</script>
<style scoped>
.playList-info-head {
  margin-left: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.playList-info-name {
  margin-left: 30px;
}
.playList-info-head img{
  box-shadow: 4px 4px 16px 4px rgba(112,128,151,0.35);
  width: 200px;
  border-radius: 20%;
}
</style>
