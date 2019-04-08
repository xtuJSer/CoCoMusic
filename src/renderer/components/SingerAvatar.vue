<template>
  <div class="singer-avatar">
    <img v-if="showImage" @error.once="handleImageError" :src="`https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.singerMid}.jpg?max_age=2592000`" alt="">
    <p v-if="showName">{{singer.singerName}}</p>
  </div>
</template>
<script>
import { Singer } from '../../spider/commonObject.js'

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
    handleImageError ({ target }) {
      // 智障 QQ 音乐，没歌手图片直接返回 404 这么牛逼你怎么不上天
      target.src = 'https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000'
    }
  }
}
</script>
<style>
.singer-avatar img{
  width: 100%;
  height: auto;
  border-radius: 52%;
  box-shadow: 4px 4px 16px 4px rgba(112,128,151,0.35);
}
.singer-avatar p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer-avatar{
  margin: 12px 23px;
  text-align: center;
  width: 7.49999%;
  display: inline-block;
}

/**媒体查询大法！**/
@media only screen and (max-width: 1860px) {
  .singer-avatar {
    width: 8.33333%;
  }
}
@media only screen and (max-width: 1672px) {
  .singer-avatar {
    width: 11.333333%;
  }
}
@media only screen and (max-width: 1572px) {
  .singer-avatar {
    width: 8.99999%;
  }
}
@media only screen and (max-width: 1333px) {
  .singer-avatar {
    width: 15.666%;
  }
}
@media only screen and (max-width: 1000px) {
  .singer-avatar {
    width: 43.2222%;
  }
}
@media only screen and (max-width: 720px) {
  .singer-avatar {
    width: 85.6666%;
  }
}

</style>
