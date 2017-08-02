<template>
  <div>
    <h4>MV Player</h4>
    <div class="divider text-center" data-content="MV"></div>
    <div class="video">
      <video :src="url" controls="controls"> </video>
    </div>
  </div>
</template>
<script>
import { getMVInfo } from '../../bin/spider.js'
export default {
  data () {
    return {
      url: ''
    }
  },
  async created () {
    let vid = this.$route.params.vid
    let data = await getMVInfo(vid)
    let MVData = JSON.parse(data.slice(13, -1)).vl.vi[0]
    this.url = `${MVData.ul.ui[0].url}${vid}.mp4?vkey=${MVData.fvkey}`
  }
}
</script>
<style lang="stylus" scoped>
.video
  width 100%
  display flex
  justify-content center
</style>
