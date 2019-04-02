<template>
  <div>
    <div class="playList-item" v-for="playList in list" :key="playList.playListMid">
      <router-link :to="{name: 'playListInfo', params: {playListMid: playList.playListMid}, query: {imgUrl: playList.imgUrl}}">
        <img :src="playList.imgUrl" alt="">
        <p>{{playList.playListName}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
}
</script>
<style scoped>
.playList-item {
  width: 11.333333%;
  display: inline-block;
  margin: 10px 7px 7px 7px;
}
.playList-item img {
  width: 100%;
  height: auto;
  box-shadow: 4px 4px 16px 4px rgba(112,128,151,0.35);
  border-radius: 7%;
}
.playList-item p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 48px;
  -webkit-box-orient: vertical;
  margin-bottom: 15px;
  text-align: center;
}
@media only screen and (max-width: 1500px){
  .playList-item {
    width: 14.866667%
  }
}
</style>
