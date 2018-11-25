<template>
  <div>
    <div class="has-icon-right search-input">
      <input v-model="keyword" @keyup.enter="init();search(1)" type="text" class="form-input" placeholder="搜索">
      <i v-show="loading" class="form-icon loading"></i>
      <i v-show="!loading" class="form-icon icon icon-search"></i>
    </div>

    <song-list :showSingerList="true" :musicList="songList"></song-list>

    <button class="btn btn-block" v-show="!isEnd" :class="{'loading': loading}"
      @click="!isEnd && search(page + 1)">更多</button>
    <div class="divider text-center" data-content="没有了" v-show="isEnd && songList.length" ></div>
  </div>
</template>
<script>
import { getSearch } from '../../spider/index.js'
import songList from './SongList'

export default {
  name: 'search',
  components: {
    songList
  },
  data () {
    return {
      keyword: '',
      loading: false,
      page: 1,
      totalPage: 1,
      direct: {},
      songList: []
    }
  },
  computed: {
    isEnd () {
      return this.totalPage <= this.page
    }
  },
  methods: {
    init () {
      this.$common.objectCopy({
        loading: false,
        page: 1,
        totalPage: 1,
        direct: {},
        songList: []
      }, this)
    },
    async search (newPage) {
      this.loading = true
      let data = await getSearch({
        page: newPage, keyword: this.keyword
      })
      this.page = newPage
      this.direct = data.direct
      this.totalPage = data.totalPage
      this.songList.push(...data.songList)
      this.loading = false
    }
  },
  created () {
  }
}
</script>
<style scoped>
.search-input {
  width: 40%;
  margin: 0px auto 35px auto;
  position: relative;
  top: 20px;
}
.btn-block {
  margin-bottom: 30px;
}
</style>
