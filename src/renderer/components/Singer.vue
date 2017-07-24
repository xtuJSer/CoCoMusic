<template>
  <div>
    <div class="singerInfo">
      <img v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerMid}.jpg`" alt="">
      <div>
        <h4>{{singerName}}</h4>
        <button class="btn btn-sm">收藏</button>
      </div>
    </div>
    <div class="musicList">
      <ul class="tab tab-block">
        <li class="tab-item active">
          <a href="#">歌曲</a>
        </li>
        <li class="tab-item">
          <a href="#">专辑</a>
        </li>
        <li class="tab-item">
          <a href="#">MV</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      id: ''
    }
  },
  computed: {
    ...mapState({
      singerName: state => state.Singer.singerName,
      singerMid: state => state.Singer.singerMid,
      musicList: state => state.Singer.musicList
    })
  },
  mounted () {
    this.$store.commit('init', this.$route.params.id)
    this.$store.dispatch('getNextMusicList')
  }
}
</script>
<style lang="stylus" scoped>
.singerInfo
  display flex
  align-items center
  img
    margin-left 30px
    border-radius 50%
    width 150px
    height 150px
  div
    margin-left 60px
</style>
