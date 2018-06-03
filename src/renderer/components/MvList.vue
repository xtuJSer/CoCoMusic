<template>
  <div class="mv-list">
    <router-link :to="{name: 'mvPlayer', params: {mvId: mv.mvId}}" class="mv-item" v-for="mv in mvList" :key="mv.mvId">
      <img :src="mv.piv" alt="">
      <p>{{mv.mvName}}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    mvList: Array
  }
}
</script>
<style scoped>
.mv-list {
  margin-top: 20px;
}
.mv-item {
  display: inline-block;
  width: 144px;
  margin: 5px 10px;
  text-align: center;
}
.mv-item img{
  box-shadow: 2px 2px 16px 2px rgba(112,128,151,0.35);
  width: 135px;
  border-radius: 5%;
}
.mv-item p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
