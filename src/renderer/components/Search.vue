<template>
  <div>
    <h4>Search for ` {{$route.params.keyWord}} `</h4>
    <div class="divider"></div>
    <div class="zhida">
      <router-link :to="`/singer/${zhida.singerMID}`">
        <img v-show="zhida.singerPic !== ''" v-lazy="zhida.singerPic" alt="">
        <h4>{{zhida.singerName}}</h4>
      </router-link>
    </div>
    <div class="divider text-center" data-content="音乐列表"></div>
    <f-music-list :list="list" @next="more" :showUser="true"></f-music-list>
  </div>
</template>
<script>
import fMusicList from './common/MusicList'
import { search } from '../../bin/spider.js'
export default {
  data () {
    return {
      page: 0,
      zhida: {
        singerMID: '',
        singerName: '',
        singerPic: ''
      },
      list: {
        list: [],
        isLoading: false,
        isEnd: false,
        total: 0
      }
    }
  },
  components: {
    fMusicList
  },
  computed: {},
  methods: {
    async more (word) {
      word = word || this.$route.params.keyWord
      this.list.isLoading = true
      let data
      try {
        data = (await search(word, this.page + 1)).slice(9, -1)
      } catch (e) {
        console.log(e)
        this.list.isLoading = false
      }
      this.page = this.page + 1
      let searchObj = JSON.parse(data).data
      if (this.page === 1) {
        this.zhida = searchObj.zhida.zhida_singer || { singerMID: '', singerName: '', singerPic: '' }
      }
      let list = searchObj.song.list.map(item => {
        return {
          songMid: item.songmid,
          songName: item.songname,
          albumMid: item.albummid,
          albumName: item.albumname,
          singer: item.singer
        }
      })
      this.list = { list: this.list.list.concat(list), isLoading: false, total: searchObj.song.totalnum, isEnd: (20 * this.page) >= searchObj.song.totalnum }
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.page = 0
    this.zhida = { singerMID: '', singerName: '', singerPic: '' }
    this.list = {
      list: [], isLoading: false, isEnd: false, total: 0
    }
    next()
    await this.more(to.params.keyWord)
  },
  async created () {
    await this.more(this.$route.params.keyWord)
  }
}
</script>
<style lang="stylus" scoped>
.zhida
  a
    display flex
    align-items center
  img
    width 150px
    height 150px
    margin-right 30px
    border-radius 50%
</style>
