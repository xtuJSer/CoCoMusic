<template>
  <div>
    <f-album-list :albumList="list"></f-album-list>
  </div>
</template>
<script>
import fAlbumList from './AlbumList'
import { mapState } from 'vuex'

export default {
  components: {
    fAlbumList
  },
  computed: {
    ...mapState({
      list: state => state.Favorite.album
    })
  }
}
</script>
