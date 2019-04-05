<template>
  <div>
    <div class="playList-info-head">
      <img :src="playList.imgUrl" alt="">
      <div class="playList-info-name">
        <h4>{{playList.playListName}}</h4>
          <button class="btn btn-sm" v-show="!isfocus()" @click="favorite(), toRemote(1)">关注</button>
          <button class="btn btn-sm" v-show="isfocus()" @click="deleteFavorite(), toRemote(2)">取消关注</button>
      </div>
    </div>
    <div class="divider text-center"></div>

    <song-list :musicList="list" showSingerList></song-list>
  </div>
</template>
<script>
import { getPlayListInfo } from '../../spider/index.js'
import { PlayList } from '../../spider/commonObject.js'
import { FavoritePlayList } from '../../spider/favorite'
import songList from './SongList'
import generateFavorite from './common/Favorite.js'

const favoriteMinix = generateFavorite('playList')
export default {
  mixins: [favoriteMinix],
  props: ['playListMid', 'imgUrl'],
  components: {
    songList
  },
  data () {
    return {
      list: [],
      playList: new PlayList('', 'Loading', this.imgUrl)
    }
  },
  methods: {
    async getThePlayListInfo () {
      Object.assign(this, this.$options.data.call(this))
      let { playListName, list } = (await getPlayListInfo(this.playListMid))
      this.playList = new PlayList(this.playListMid, playListName, this.imgUrl)
      this.list = list
    },
    async toRemote (flag) {
      FavoritePlayList(this.playListMid, flag)
    }
  },
  async activated () {
    if (this.playList.playListMid === this.playListMid) return
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
