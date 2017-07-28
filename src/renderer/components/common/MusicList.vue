<template>
<div>
  <div class="music-item" v-for="(item,index) in list.list" :key="index">
    <h6> {{index}}. &nbsp; {{item.songName}} </h6>
    <div class="action">
      <button class="btn btn-link">
        <img src="../../assets/img/play2.svg" alt="">
      </button>
      <button class="btn btn-link">
        <img src="../../assets/img/download.svg" alt="">
      </button>
    </div>
    <div class="album" >
      <p v-if="!list.simple">{{item.albumName}}</p>
    </div>
  </div>
  <div v-if="!list.simple">
    <button class="more btn btn-block" @click="$emit('next')" v-show="!list.isEnd" :class="{'loading':list.isLoading}">More</button>
    <div class="divider text-center" v-show="list.isEnd" data-content="没有了"></div>
  </div>
</div>
</template>
<script>
export default {
  props: ['list']
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/main.styl'

.music-item
  &:hover
    background light-gray-color
    transform none!important
    color main-color
    div.action
      display block
  display flex
  justify-content space-between
  h6
    width 350px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    margin-top 0px
  div.action
    display none
    img
      height 20px
      width 20px
  div.album
    width 200px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
