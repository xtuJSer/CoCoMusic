<template>
  <div>
    <h4>我的关注</h4>
    <div class="divider text-center" data-content="关注列表"></div>
    <div class="singer-img-list">
      <div class="singer-item" v-for="(value,key) in singer" :key="key">
        <router-link :to="`/singer/${value.singerMid}/`">
          <img class="badge" v-lazy="`https://y.gtimg.cn/music/photo_new/T001R150x150M000${value.singerMid}.jpg`" alt="">
          <p>{{value.singerName}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      singer: state => state.Favorite.singer
    })
  }
}
</script>
<style lang="stylus" scoped>
.singer-img-list
  display flex
  flex-wrap wrap
  div.singer-item
    width 190px
    text-align center
    margin-bottom 20px
    a
      &:focus
        box-shadow: none
      img
        width 150px
        height auto
        border-radius 50%
</style>
