<template>
  <div>
    <div class="MV-list">
      <div class="MV-item" v-for="(item,index) in list.list" :key="index">
        <router-link :to="`/MV/${item.vid}`">
          <img v-lazy="item.pic">
          <p>{{item.title}}</p>
        </router-link>
      </div>
    </div>
    <div>
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
.MV-list
  display flex
  flex-wrap wrap
.MV-item
  width 195px
  text-align center
  img
    width 180px
    height 100px
    border-radius 6px
  p
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
