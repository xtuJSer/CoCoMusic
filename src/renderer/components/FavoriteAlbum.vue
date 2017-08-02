<template>
  <div>
    <h4>我的专辑</h4>
    <div class="divider text-center" data-content="专辑列表"></div>
    <f-album-list :hideMoreBtn="true" :list="{list: album}"></f-album-list>
  </div>
</template>
<script>
import fAlbumList from './common/AlbumList'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      album: state => Object.values(state.Favorite.album)
    })
  },
  components: {
    fAlbumList
  }
}
</script>
<style lang="stylus" scoped>

</style>
