<template>
<div class="lyric">
  <button class="goback btn btn-link btn-sm" @click="$router.go(-1)">
    <img src="../assets/img/Back.svg" alt="">
  </button>
  <div class="over-bg"></div>
  <div class="lyric-contain">
    <img class="bg" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentPlay.album.albumMid}.jpg?max_age=2592000`"/>
    <div :id="`lyric-${index}`" class="lyric-list" :class="{'play-lyric': lyricIndex === index}" v-for="(lyric, index) in lyricList" :key="lyric.time">
      <p :class="{'has-trans': hasTrans}" class="lyric">{{lyric.lyric}}</p>
      <p v-if="hasTrans" class="trans">{{lyric.trans}}</p>
    </div>
    <p class="text-center" v-show="!lyricList.length">加载中。。。</p>
  </div>
  <div class="drag"></div>
</div>

</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'lyric',
  computed: {
    ...mapGetters([
      'currentPlay', 'currentLyric'
    ]),
    ...mapState({
      lyricList: state => state.Player.lyricList,
      lyricIndex: state => state.Player.lyricIndex
    }),
    hasTrans () {
      return !!this.lyricList[0].trans
    }
  },
  methods: {
    scrollLyric (index) {
      let lyric = document.getElementById(`lyric-${index}`)
      lyric && lyric.scrollIntoView({ block: 'center' })
    }
  },
  watch: {
    'lyricIndex' (index) {
      this.scrollLyric(index)
    }
  },
  activated () {
    this.scrollLyric(this.lyricIndex)
  }
}
</script>
<style scoped>
.goback {
  position: fixed;
  top: 12px;
}
.bg {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(60px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100vw;
  height: 100vh;
}
.over-bg{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.6);
}
.lyric-contain {
  z-index: 10;
  overflow-y: scroll;
  height: 100vh;
}
.trans {
  margin-top: 0px;
}
.lyric.has-trans{
  margin-bottom: 0px;
}
.lyric-list {
  text-align: center;
  /* margin: 0 0; */
}
.play-lyric{
  color: #5764c6;
  text-shadow: 1px 1px 20px;
}
.drag {
  position: fixed;
  top: 30px;
  left: 0px;
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}
img{
  width: 15px;
  height: 15px;
  margin-left: 8px;
	margin-right: 8px;
}
</style>
