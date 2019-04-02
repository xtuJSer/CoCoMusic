<template>
  <div class="singer-list">
    <div class="singer-type-list">

      <div class="singer-type-item">
        <button class="btn btn-link"
          @click="selectTag.index = tag.id, getTheSingeList(1)" 
          v-for="tag in tagList.index" 
          :key="tag.id"
          :disabled="tag.id !== selectTag.index && loading"
          :class="{'active': tag.id === selectTag.index, 'loading': tag.id === selectTag.index && loading}" >
          {{tag.name}}
        </button>
      </div>

      <div class="singer-type-item d-inline-block">
        <button class="btn btn-link"
          @click="selectTag.area = tag.id, getTheSingeList(1)"
          v-for="tag in tagList.area"
          :key="tag.id"
          :disabled="tag.id !== selectTag.area && loading"
          :class="{'active': tag.id === selectTag.area, 'loading': tag.id === selectTag.area && loading}">
          {{tag.name}}
        </button>
      </div>

      <div class="singer-type-item d-inline-block">
        <button class="btn btn-link"
          @click="selectTag.sex = tag.id, getTheSingeList(1)"
          v-for="tag in tagList.sex"
          :key="tag.id"
          :disabled="tag.id !== selectTag.sex && loading"
          :class="{'active': tag.id === selectTag.sex, 'loading': tag.id === selectTag.sex && loading}">
          {{tag.name}}
        </button>
      </div>

      <div class="singer-type-item">
        <button class="btn btn-link"
          @click="selectTag.genre = tag.id, getTheSingeList(1)"
          v-for="tag in tagList.genre"
          :key="tag.id"
          :disabled="tag.id !== selectTag.genre && loading"
          :class="{'active': tag.id === selectTag.genre, 'loading': tag.id === selectTag.genre && loading}">
          {{tag.name}}
        </button>
      </div>
    </div>

    <router-link :to="{path: `/singer/${singer.singerMid}/music`, query: {name: singer.singerName}}"
    v-for="(singer, index) in singerList"
    :key="singer.singerMid">
      <singer-avatar
        :singer="singer"
        :showImage="page === 1 && index < 10">
      </singer-avatar>
    </router-link>

    <f-pagination
      :current="page"
      :loading="loading"
      @goto="newPage => getTheSingeList(newPage)"
      :total="totalPage">
    </f-pagination>

  </div>
</template>
<script>
import singerAvatar from './SingerAvatar'
import { tag } from './common/SingerList.js'
import { getNewSingerList } from '../../spider'
import fPagination from './Pagination'

export default {
  name: 'singerList',
  data () {
    return {
      singerList: [],
      totalPage: 0,
      page: 0,
      loading: false,
      tagList: tag,
      selectTag: {
        area: -100, sex: -100, genre: -100, index: -100
      }
    }
  },
  components: {
    singerAvatar, fPagination
  },
  methods: {
    async getTheSingeList (newPage) {
      this.loading = true
      let data = await getNewSingerList({
        ...this.selectTag,
        page: newPage
      })
      this.page = newPage
      Object.assign(this, data)
      this.loading = false
    }
  },
  created () {
    setTimeout(async () => {
      this.getTheSingeList(1)
    }, 50)
  }
}
</script>
<style scoped>
.singer-list a {
  box-shadow: none;
}
.singer-type-list button.active{
  background: #717ff9;
  color: #fff;
  border-radius: 10%;
  box-shadow: 4px 5px 7px 1px rgba(112,128,151,0.35);
}
.singer-type-list:first-child{
  margin-bottom: 3px;
}
.singer-type-list>.singer-type-item{
  margin-bottom: 5px;
}
.singer-type-list button{
  margin-left: 6px;
  margin-bottom: 2px;
  color: #50596c;
}
</style>
