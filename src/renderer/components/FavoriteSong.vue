<template>
  <div>
    <h4>我的收藏</h4>
    <div class="divider text-center" data-content="收藏列表"></div>
    <f-music-list :list="{list: song}" :hideMoreBtn="true" :showUser="true"></f-music-list>
  </div>
</template>
<script>
import fMusicList from './common/MusicList'
import { mapState } from 'vuex'
export default {
  components: {
    fMusicList
  },
  computed: {
    ...mapState({
      song: state => Object.values(state.Favorite.song)
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>
