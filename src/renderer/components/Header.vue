<template>
  <div class="header">
    <div class="left">
      <f-tab :list="navList">
        <img v-for="route in navList" :alt="route.title" :title="route.title" :slot="route.name" :key="route.name" :src="`static/img/${route.name}.svg`" />
      </f-tab>
    </div>

    <f-player></f-player>

    <div class="right">
      <button class="btn btn-link btn-sm" @click="$router.go(-1)" title="后退">
        <img :class="isSide ? 'frame-img' : 'no-frame-img'" src="../assets/img/Back.svg" alt="后退">
      </button>
      <button class="btn btn-link btn-sm" @click="$router.go(1)" title="前进">
        <img :class="isSide ? 'frame-img' : 'no-frame-img'" src="../assets/img/Forward.svg" alt="前进">
      </button>
      <button class="btn btn-link btn-sm" @click="goTop" title="返回顶部">
        <img :class="isSide ? 'frame-img' : 'no-frame-img'" src="../assets/img/Up.svg" alt="返回顶部">
      </button>
      <button class="btn btn-link btn-sm" @click="minimize" v-if="!isSide">
        <img :class="isSide ? 'frame-img' : 'no-frame-img'" src="../assets/img/minimize.svg">
      </button>
      <button class="btn btn-link btn-sm" @click="close" v-if="!isSide">
        <img :class="isSide ? 'frame-img' : 'no-frame-img'" src="../assets/img/close.svg">
      </button>

    </div>
  </div>
</template>

<script>
import fTab from '@/components/Tab'
import fPlayer from './Player'
import local from '../../main/localStorage'
const { getCurrentWindow } = require('electron').remote

export default {
  data () {
    return {
      navList: [{ name: 'Setting', title: '设置' }, { name: 'Favorite', title: '收藏' }, { name: 'Search', title: '搜索' }, { name: 'SingerList', title: '歌手列表' }, { name: 'PlayList', title: '歌单推荐' }],
      isSide: local.getItem('winSideSetting') === 'true'
    }
  },
  components: {
    fTab, fPlayer
  },
  methods: {
    goTop () {
      window.scrollTo(0, 0)
    },
    minimize () {
      getCurrentWindow().minimize()
    },
    close () {
      getCurrentWindow().close()
    }
  }
}
</script>

<style scoped>

.right button{
  padding: 0px;
}

.header{
  padding: 0px 15px 0px 15px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  z-index: 10;
}

.left{
  margin-right: 20px;
}
img{
  width: 23px;
  height: 23px;
  margin-left: 8px;
	margin-right: 8px;
}

.frame-img{
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.no-frame-img {
  width: 12px;
  height: 12px;
  cursor: pointer;

}
</style>
