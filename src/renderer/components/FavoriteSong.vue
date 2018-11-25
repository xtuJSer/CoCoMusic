<template>
  <div>
    <song-list showSingerList :musicList="list"></song-list>
  </div>
</template>
<script>
import songList from './SongList'
import { mapState } from 'vuex'
import { orderBy } from 'lodash'
export default {
  components: {
    songList
  },
  computed: {
    ...mapState({
      list: state => orderBy(state.Favorite.song, ['singerList[0].singerName'], ['asc'])
    })
  }
}
</script>
