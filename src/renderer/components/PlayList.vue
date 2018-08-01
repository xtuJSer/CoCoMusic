<template>
  <div class="play-list">
    <ul class="nav category">
      <li class="nav-item" v-for="categoryGroup in categoryGroupList" :key="categoryGroup.categoryGroupName">
        <a>{{categoryGroup.categoryGroupName}}</a>
        <ul class="nav">
          <li class="nav-item" :class="{active: currentCategory === category.categoryId}" v-for="category in categoryGroup.categoryList" :key="category.categoryId">
            <div
              v-show="currentCategory === category.categoryId && loading"
              class="loading text-left"></div>
            <a class="c-hand" v-show="!(currentCategory === category.categoryId && loading)"
              @click="currentCategory = category.categoryId; getThePlayList(1)"
              v-html="category.categoryName">{{category.categoryName}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <div class="playList-list">
      <f-play-list :list="list"></f-play-list>

      <f-pagination
        :loading="loading"
        :current="page"
        @goto="newPage => getThePlayList(newPage)"
        :total="totalPage">
      </f-pagination>

    </div>
  </div>
</template>
<script>
import {getCategory, getPlayList} from '../../spider/index.js'
import fPagination from './Pagination'
import fPlayList from './PlayListList'

export default {
  data () {
    return {
      categoryGroupList: [],
      list: [],
      page: 1,
      currentCategory: '',
      loading: false,
      totalPage: 0
    }
  },
  components: {
    fPagination, fPlayList
  },
  methods: {
    async getThePlayList (page) {
      this.loading = true
      /**
       *  Let it crash. You don't need to program defensively.
       **/
      Object.assign(this, await getPlayList({
        categoryId: this.currentCategory, page
      }))
      this.page = page
      this.loading = false
    }
  },
  async created () {
    this.loading = true
    this.categoryGroupList = (await getCategory())
    this.currentCategory = this.categoryGroupList[0].categoryList[0].categoryId
    this.getThePlayList(1)
  }
}
</script>
<style scoped>
div.loading{
  width: 70px;
}
.play-list {
  display: flex;
  justify-content: space-between;
}
.active a {
  color: #5764c6!important;
  text-shadow: 1px 1px 20px;
}
.category {
  height: 530px;
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
  height: 530px;
  scroll-behavior: smooth;
  overflow: scroll;
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
