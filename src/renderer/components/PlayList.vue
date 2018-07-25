<template>
  <div class="play-list">
    <ul class="nav category">
      <li class="nav-item" v-for="categoryGroup in categoryGroupList" :key="categoryGroup.categoryGroupName">
        <a>{{categoryGroup.categoryGroupName}}</a>
        <ul class="nav">
          <li class="nav-item" :class="{active: currentCategory === category.categoryId}" v-for="category in categoryGroup.categoryList" :key="category.categoryId">
            <a class="c-hand" @click="getThePlayList(category.categoryId)" v-html="category.categoryName">{{category.categoryName}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <div class="playList-list">
      <div class="playList-item" v-for="playList in list" :key="playList.playListId">
        <router-link to="">
          <img :src="playList.imgUrl" alt="">
          <p>{{playList.playListName}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {getCategory, getPlayList} from '../../spider/index.js'
export default {
  data () {
    return {
      categoryGroupList: [],
      list: [],
      page: 1,
      currentCategory: ''
    }
  },
  methods: {
    async getThePlayList (categoryId) {
      this.currentCategory = categoryId
      this.list = await getPlayList({
        categoryId, page: this.page
      })
    }
  },
  async created () {
    this.categoryGroupList = (await getCategory())
  }
}
</script>
<style scoped>
.play-list {
  display: flex;
  justify-content: space-between;
}
.active a {
  color: #5764c6!important;
  text-shadow: 1px 1px 20px;
}
.category {
  height: 500px;
  overflow: scroll;
  scroll-behavior: smooth;
  width: 180px;
}
.category::-webkit-scrollbar {
  display: none;
}
.playList-list::-webkit-scrollbar {
  display: none;
}
.playList-list {
  width: 850px;
  height: 500px;
  scroll-behavior: smooth;
  overflow: scroll;
}
.playList-item {
  width: 150px;
  display: inline-block;
  margin: 10px 7px 7px 7px;
}
.playList-item img {
  width: 150px;
  height: 150px;
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
a:hover,a:active,a:visited,a:focus {
  outline: none;
  box-shadow: none;
  text-decoration: none;
}
a {
  box-shadow: none;
  color: #667189;
}
</style>
