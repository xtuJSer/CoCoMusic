<template>
  <div>
    <p>{{mv.mvName}}</p>
    <video width="80%" controls="controls" :src="url"></video>
  </div>
</template>
<script>
import { getMvInfo, getMUrl } from '../../spider/index.js'
export default {
  name: 'mvPlayer',
  data () {
    return {
      fileid: '',
      mv: {},
      url: ''
    }
  },
  computed: {
    mvId () {
      return this.$route.query.mvId
    }
  },
  methods: {
    async getTheMvInfo () {
      let { fileid, mv } = await getMvInfo({ mvId: this.mvId })
      let { cn, mvSourceUrl, vkey } = await getMUrl({ fileid })
      this.url = `${mvSourceUrl}${cn}?vkey=${vkey}`
      this.mv = mv
    }
  },
  watch: {
    'mvId': function (value) {
      if (!value) {
        return
      }
      this.getTheMvInfo()
    }
  },
  async created () {
    this.getTheMvInfo()
  }
}
</script>
<style scoped>
video{
  margin-left: 10%;
  border-radius: 1%;
  box-shadow: 2px 2px 16px 2px rgba(112,128,151,0.35);
}
p {
  text-align: center;
}
</style>
