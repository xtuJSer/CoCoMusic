<template>
  <div>
    <f-play-list :list="list"></f-play-list>
  </div>
</template>
<script>
import fPlayList from './PlayListList'
import { mapState } from 'vuex'

export default {
  components: {
    fPlayList
  },
  computed: {
    ...mapState({
      list: state => state.Favorite.playList
    })
  }
}
</script>
