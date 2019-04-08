<template>
  <div class="singer">
    <div class="singer-info">
      <singer-avatar :singer="singer" :showName='false'></singer-avatar>
      <div class="singer-name">
        <h4>{{singer.singerName}}</h4>
        <button class="btn btn-sm" v-show="!isfocus()" @click="favorite(), toRemote(1)">关注</button>
        <button class="btn btn-sm" v-show="isfocus()" @click="deleteFavorite(), toRemote(0)">取消关注</button>
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
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view class="singer-router"></router-view>
        </keep-alive>        
      </transition>
    </div>
  </div>
</template>
<script>
import { Singer } from '../../spider/commonObject.js'
import { DeleteSinger, AddSinger } from '../../spider/favorite'
import fTab from '@/components/Tab'
import singerAvatar from './SingerAvatar'
import generateFavorite from './common/Favorite.js'

const favoriteMinix = generateFavorite('singer')

export default {
  mixins: [favoriteMinix],
  data () {
    return {
      info: {},
      desc: '',
      other: {},
      showAllInfo: false,
      singerMidSave: '',
      singer: new Singer('loading', this.$route.params.singerMid)
    }
  },
  computed: {
    tabList () {
      let id = this.singer.singerMid
      let name = this.singer.singerName
      return [
        { path: `/singer/${id}/music`, name: 'SingerMusic', ZHName: '单曲', params: { id }, query: { name } },
        { path: `/singer/${id}/album`, name: 'SingerAlbum', ZHName: '专辑', params: { id }, query: { name } },
        { path: `/singer/${id}/mv`, name: 'SingerMv', ZHName: 'MV', params: { id }, query: { name } }
      ]
    }
  },
  activated () {
    this.singer = new Singer(this.$route.query.name, this.$route.params.singerMid)
  },
  beforeRouteUpdate (to, from, next) {
    this.singer = new Singer(to.query.name, to.params.singerMid)
    next()
  },
  components: {
    singerAvatar, fTab
  },
  methods: {
    toRemote (flag) {
      if (flag === 0) {
        DeleteSinger(this.singer.singerMid)
      } else {
        AddSinger(this.singer.singerMid)
      }
    }
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
.singer-router {
  margin-bottom: 20px;
}
</style>

