<template>
  <div class="singer">
    <div class="singer-info">
      <singer-avatar :singer="singer" :showName='false'></singer-avatar>
      <div class="singer-name">
        <h4>{{singer.singerName}}</h4>
        <button class="btn btn-sm">关注</button>
      </div>
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
import fTab from '@/components/Tab'
import singerAvatar from './SingerAvatar'

let initData = {
  info: {},
  desc: '',
  other: {},
  showAllInfo: false,
  singerMidSave: ''
}

export default {
  data () {
    return {
      ...JSON.parse(JSON.stringify(initData)),
      singer: new Singer(this.$route.query.name, this.$route.params.id)
    }
  },
  computed: {
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
  watch: {
    '$route.name' (routerName) {
      if (['SingerMusic', 'SingerAlbum', 'SingerMv'].indexOf(routerName) !== -1) {
        this.singer = new Singer(this.$route.query.name, this.$route.params.id)
      }
    }
  },
  components: {
    singerAvatar, fTab
  }
}
</script>
<style scoped>
.information {
  width: 40%;
  overflow: hidden;
  height: 150px;
}
.singer-name {
  margin-right: 150px;
}
.singer-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.singer-avatar {
  margin: 0px 50px 0px 45px;
}
.singer-info p{
  margin-right: 20px;
}

singer-avatar p{
  margin-top: 100px;
}
</style>

