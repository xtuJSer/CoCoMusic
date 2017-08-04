<template>
    <div class="top-bar">
      <div class="log">
        <img src="../assets/img/music.svg" alt="">
        <span class="CoCoMusic">CocoMusic</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <button class="btn btn-link" @click="$router.go(-1)">
          <i class="icon icon-arrow-left"></i>
        </button>&nbsp;
        <button class="btn btn-link" @click="$router.go(1)">
          <i class="icon icon-arrow-right"></i>
        </button>
      </div>
      <div class="form-group search">
        <input class="form-input" v-model="search" @keyup.enter="$router.push(`/search/${search}`)" placeholder=" Search" type="text"> </div>
      <div class="setting">
        <button class="btn btn-link" @click="goTop">
          <i class="icon icon-arrow-up"></i>Top </button>
        <button class="btn btn-link" @click="open">
          <img src="../assets/img/github.svg" class="github" alt=""></button>
      </div>
    </div>
</template>
<script>
import { remote } from 'electron'
const shell = remote.shell
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    goTop () {
      window.scrollTo(0, 0)
    },
    open (url) {
      shell.openExternal('https://github.com/fengT-T/CoCoMusic')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/main.styl'

top-bar-flex()
  display flex
  align-items baseline
  justify-content space-between

.top-bar
  z-index 100
  background-color #fff
  position fixed
  top 0px
  margin-left 10px
  width 100%
  color main-color
  height 50px
  top-bar-flex()
  div.log
    top-bar-flex()
    .CoCoMusic
      font-family Orbitron
      font-size 2rem
      margin-right 20px 
      margin-left 10px
    img
      position relative
      top 10px
      height 35px
    button
      font-size 1.3rem
  div.search 
    margin-left 10px
    margin-bottom 0px
    width 250px
    input
      border-radius 20px
  div.setting
    img.github
      width 22px 
      margin-right 10px
</style>
