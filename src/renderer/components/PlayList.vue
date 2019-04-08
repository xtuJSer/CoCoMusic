<template>
  <div class="play-list">
    <div class="category">
      <div class="accordion" v-for="categoryGroup in categoryGroupList" :key="categoryGroup.categoryGroupName">
        <input type="radio" :id="`accordion-${categoryGroup.categoryGroupName}`" name="accordion-radio" hidden>
        <label :for="`accordion-${categoryGroup.categoryGroupName}`" class="accordion-header c-hand">
          <i class="icon icon-arrow-right mr-1"></i>
          {{categoryGroup.categoryGroupName}}
        </label>
        <div class="accordion-body">
          <div class="category-list" 
            :class="{active: currentCategory === category.categoryId}"
            v-for="category in categoryGroup.categoryList"
            :key="category.categoryId">
            <div
              v-show="currentCategory === category.categoryId && loading"
              class="loading"></div>
            <a class="c-hand"
              v-show="!(currentCategory === category.categoryId && loading)"
              @click="currentCategory = category.categoryId; getThePlayList(1)"
              v-html="category.categoryName">
              {{category.categoryName}}
            </a>
          </div>
        </div>
      </div>
    </div>
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
import { getCategory, getPlayList } from '../../spider/index.js'
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
       *  我的代码没有bug
       *  js报错不影响页面功能
       *  IE6根本没人用
       *
       *  被开除了
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
    // this.currentCategory = 10000000
    this.currentCategory = this.categoryGroupList[0].categoryList[0].categoryId
    // 在上一个请求完成之后放到事件循环后面 则只需要 400ms 就能完成属于正常速度, 我怀疑 electron 那群人做了什么蠢事把事件循环搞坏了
    setTimeout(() => this.getThePlayList(1), 0)
    // await this.getThePlayList(1) // 在上一个请求完成之后立即执行 一般在 6000ms 左右, 有毒
  }
}
</script>
<style scoped>
div.loading{
  width: 70px;
}
.loading::after {
  left: 25%;
}
.active a {
  color: #5764c6!important;
  text-shadow: 1px 1px 20px;
}
.category {
  height: 550px;
  overflow: scroll;
  scroll-behavior: smooth;
  width: 130px;
  position: fixed;
}
.category::-webkit-scrollbar {
  display: none;
}
.category-list{
  transition: all .2s cubic-bezier(.6,.15,.3,.8);
  margin: 10px 0px 10px 35px;
}
.playList-list::-webkit-scrollbar {
  display: none;
}
.playList-list {
  padding-left: 130px;
  float: right;
  margin: 0px 10px;
  /* height: 530px;
  scroll-behavior: smooth;
  overflow: scroll; */
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
