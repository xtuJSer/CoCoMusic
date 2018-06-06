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
    <div class="divider text-center" data-content="没有了" v-show="isEnd" ></div>
  </div>
</template>
<script>
import {getSearch} from '../../spider/index.js'
import {generateGetListMixins} from './common/getListMixins.js'
import songList from './SongList'

const initData = {
  loading: false,
  page: 1,
  totalPage: 1,
  direct: {},
  songList: []
}

let searchMixins = generateGetListMixins({
  methodsName: 'search',
  loadingName: 'loading',
  pageName: 'page',
  initData: JSON.parse(JSON.stringify(initData)),
  spiderMethod: getSearch,
  spiderMethodParams: {
    page: 'page',
    keyword: 'keyword'
  },
  listDataName: 'songList',
  operation: 'append'
})

export default {
  mixins: [searchMixins],
  components: {
    songList,
    page: 1
  },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    isEnd () {
      return this.totalPage <= this.page
    }
  },
  methods: {
    init () {
      this.$common.objectCopy(initData, this)
    }
  }
}
</script>
<style scoped>
.search-input {
  width: 40%;
  margin: 0 auto;
}

</style>
