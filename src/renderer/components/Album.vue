<template>
  <div>
    <song-list :musicList="musicList"></song-list>
  </div>
</template>
<script>
import {getAlbum} from '../../spider/index.js'
import songList from './SongList'

export default {
  data () {
    return {
      musicList: []
    }
  },
  components: {
    songList
  },
  computed: {
    albumId () {
      return this.$route.params.id
    }
  },
  methods: {
    async getTheAlbum () {
      this.musicList = (await getAlbum({albumMid: this.albumId})).musicList
    }
  },
  mounted () {
    this.getTheAlbum()
  }
}
</script>
<style scoped>

</style>
