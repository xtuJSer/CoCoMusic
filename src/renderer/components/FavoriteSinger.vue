<template>
  <div>
    <router-link :to="{path: `/singer/${singer.singerMid}/music`, query: {name: singer.singerName}}"
      v-for="singer in singerList"
      :key="singer.singerMid">
      <singer-avatar
        :singer="singer"
        :showImage="true">
      </singer-avatar>
    </router-link>
  </div>
</template>
<script>
import singerAvatar from './SingerAvatar'
import { mapState } from 'vuex'
export default {
  components: {
    singerAvatar
  },
  computed: {
    ...mapState({
      singerList: state => state.Favorite.singer
    })
  }
}
</script>
<style>

</style>
