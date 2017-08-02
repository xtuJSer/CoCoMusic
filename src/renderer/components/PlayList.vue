<template>
  <div>
    <h4>播放列表</h4>
    <div class="divider"></div>
    <f-music-list :list="{list: $store.state.Play.list}" :hideMoreBtn="true"></f-music-list>
  </div>
</template>
<script>
import fMusicList from './common/MusicList'
export default {
  components: {
    fMusicList
  },
  computed: {
  }
}
</script>
<style lang="stylus" scoped>

</style>
