<template>
  <div class="album">
    <div class="album-header">
      <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMid}.jpg?max_age=2592000`" alt="">
      <div class="album-name">
        <h4>{{albumName}}</h4>
        <button class="btn btn-sm">关注</button>
      </div>
    </div>
    <div class="divider text-center"></div>

    <song-list :musicList="musicList"></song-list>
  </div>
</template>
<script>
import {getAlbum} from '../../spider/index.js'
import songList from './SongList'

export default {
  data () {
    return {
      musicList: [],
      albumName: 'Loading'
    }
  },
  components: {
    songList
  },
  computed: {
    albumMid () {
      return this.$route.params.id
    }
  },
  methods: {
    async getTheAlbum () {
      Object.assign(this, this.$options.data())
      Object.assign(this, (await getAlbum({albumMid: this.albumMid})))
    }
  },
  activated () {
    this.getTheAlbum()
  }
}
</script>
<style scoped>
.album-header {
  margin-left: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.album-name {
  margin-left: 30px;
}
.album-header img{
  box-shadow: 4px 4px 16px 4px rgba(112,128,151,0.35);
  width: 200px;
  border-radius: 20%;
}
</style>
