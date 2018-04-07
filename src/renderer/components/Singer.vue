<template>
  <div class="singer">
    <div class="singer-info">
      <singer-avatar :singer="singer"></singer-avatar>
      <div class="divider text-center" data-content="歌手信息"></div>
      <p class="text-gray" v-for="(value, key) in info" :key='key' v-html="`${key} : ${value}`">
      </p>
      <p v-show="showAllInfo" class="text-gray" v-for="(value, key) in other" :key='key' v-html="`${key} : ${value}`">
      </p>
      <p v-show="showAllInfo" v-html="desc" class="text-gray"></p>
      <button class="btn btn-link btn-sm" @click="showAllInfo = !showAllInfo">更多 / 关闭</button>
    </div>
    <div class="music-album-mv">
      <f-tab :list="tabList">
        <div :slot="route.name"
          :key="route.name"
          v-for="route in tabList">
          {{route.ZHName}}
        </div>
      </f-tab>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import {Singer} from '../../spider/commonObject.js'
import {getSingerInfo} from '../../spider/index.js'
import fTab from '@/components/Tab'
import singerAvatar from './SingerAvatar'
import {generateRouterMixins} from './common/getRouterMixins.js'

let initData = {
  info: {},
  desc: '',
  other: {},
  showAllInfo: false,
  singerMidSave: ''
}

let routerMixins = generateRouterMixins({
  watchName: '$route.params.id',
  sourceId: 'singerMidSave',
  methodsName: 'getTheSingerInfo',
  methodsParams: [],
  initData
})

export default {
  mixins: [routerMixins],
  data () {
    return {
      ...JSON.parse(JSON.stringify(initData))
    }
  },
  computed: {
    singer () {
      if (!this.$route.params.id) return new Singer('Loading', '')
      return new Singer(this.$route.query.name, this.$route.params.id)
    },
    tabList () {
      let id = this.singer.singerMid
      let name = this.singer.singerName
      return [
        {path: `/singer/${id}/music`, name: 'SingerMusic', ZHName: '单曲', params: {id}, query: {name}},
        {path: `/singer/${id}/album`, name: 'SingerAlbum', ZHName: '专辑', params: {id}, query: {name}},
        {path: `/singer/${id}/mv`, name: 'SingerMv', ZHName: 'MV', params: {id}, query: {name}}
      ]
    }
  },
  methods: {
    async getTheSingerInfo () {
      this.showAllInfo = false
      this.$common.objectCopy(initData, this)
      let {info, desc, other} = await getSingerInfo({singerMid: this.singer.singerMid})
      this.info = info
      this.desc = desc
      this.other = other
    }
  },
  components: {
    singerAvatar, fTab
  },
  async created () {
    this.getTheSingerInfo()
  }
}
</script>
<style scoped>
.music-album-mv{
  width: 80%
}
.singer-info{
  width: 20%
}
.singer-info p{
  margin-right: 20px;
}
.singer {
  display: flex;
  justify-content: space-between;
}
singer-avatar p{
  margin-top: 100px;
}
</style>

