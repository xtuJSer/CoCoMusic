<template>
  <div>
    <f-mv-list
     :mvList="mvList"></f-mv-list>
    <button class="btn btn-block" v-show="!isMvListEnd" :class="{'loading': mvLoading}"
      @click="!isMvListEnd && getTheSingerMvList(mvPage + 1)">更多</button>
    <div class="divider text-center" data-content="没有了" v-show="isMvListEnd" ></div>
  </div>
</template>
<script>
import fMvList from './MvList'
import {generateGetListMixins} from './common/getListMixins.js'
import {getSingerMvList} from '../../spider/index.js'
import {generateRouterMixins} from './common/getRouterMixins.js'

const initData = {
  mvLoading: false,
  mvPage: 0,
  mvList: [],
  mvTotal: 1,
  singerMidSave: ''
}

let mvMinxs = generateGetListMixins({
  methodsName: 'getTheSingerMvList',
  loadingName: 'mvLoading',
  pageName: 'mvPage',
  initData: JSON.parse(JSON.stringify(initData)),
  spiderMethod: getSingerMvList,
  spiderMethodParams: {
    singerMid: 'singerMid',
    page: 'mvPage'
  },
  listDataName: 'mvList',
  operation: 'append'
})

let routerMixins = generateRouterMixins({
  watchName: '$route.params.id',
  sourceId: 'singerMidSave',
  methodsName: 'getTheSingerMvList',
  methodsParams: [0],
  initData
})

export default {
  mixins: [mvMinxs, routerMixins],
  components: {
    fMvList
  },
  computed: {
    singerMid () {
      return this.$route.params.id
    },
    isMvListEnd () {
      return this.mvTotal <= this.mvPage
    }
  },
  created () {
    console.error('value')
    this.getTheSingerMvList(0)
  }
}
</script>
<style scoped>
  
</style>
