<template>
  <div class="singer-avatar">
    <img v-if="showImage" @error.once="handleImageError" :src="`https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.singerMid}.jpg?max_age=2592000`" alt="">
    <p v-if="showName">{{singer.singerName}}</p>
  </div>
</template>
<script>
import {Singer} from '../../spider/commonObject.js'

export default {
  props: {
    singer: Singer,
    showImage: {
      type: Boolean,
      default: true
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleImageError ({target}) {
      // 智障 QQ 音乐，没歌手图片直接返回 404 这么牛逼你怎么不上天
      target.src = 'https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000'
    }
  }
}
</script>
<style>
.singer-avatar{
  display: inline-block;
  margin: 12px 23px;
  text-align: center;
  width: 150px;
}
.singer-avatar img{
  width: 150px;
  height: 150px;
  border-radius: 52%;
  box-shadow: 4px 4px 16px 4px rgba(112,128,151,0.35);
}
.singer-avatar p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
