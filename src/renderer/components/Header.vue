<template>
  <div class="header">
    <div class="left">
      <f-tab :list="navList">
        <img v-for="route in navList" :slot="route.name" :key="route.name" :src="`static/img/${route.name}.svg`" />
      </f-tab>
    </div>

    <f-player></f-player>

    <div class="right">
      <button class="btn btn-link btn-sm" @click="$router.go(-1)">
        <img src="../assets/img/Back.svg" alt="">
      </button>
      <button class="btn btn-link btn-sm" @click="$router.go(1)">
        <img src="../assets/img/Forward.svg" alt="">
      </button>
      <button class="btn btn-link btn-sm" @click="goTop">
        <img src="../assets/img/Up.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import fTab from '@/components/Tab'
import fPlayer from './Player'

const {getCurrentWindow} = require('electron').remote

export default {
  data () {
    return {
      navList: [{name: 'Setting'}, {name: 'Favorite'}, {name: 'Search'}, {name: 'SingerList'}, {name: 'PlayList'}]
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

.right img{
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>
