<template>
  <div class="singer-list">
    <div class="singer-type-list">
      <div class="singer-country">

        <button class="btn btn-link"
          @click="selectCountry = code, getTheSingeList(1)" 
          v-for="(code, country) in singertypeList" 
          :key="code"
          :class="{'active': code === selectCountry, 'loading': code === selectCountry && loading}" >
          {{country}}
        </button>

      </div>
      <div class="singer-firstname">

        <button class="btn btn-link"
          @click="selectName = code, getTheSingeList(1)"
          v-for="(code, name) in singerNameList"
          :key="code"
          :class="{'active': code === selectName, 'loading': code === selectName && loading}">
          {{name}}
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
      @goto="newPage => getTheSingeList(newPage)"
      :total="totalPage">
    </f-pagination>

  </div>
</template>
<script>
import singerAvatar from './SingerAvatar'
import { singertypeList, singerNameList } from './common/SingerList.js'
import {getSingerList} from '../../spider'
import fPagination from './Pagination'

export default {
  name: 'singerList',
  data () {
    return {
      singerList: [],
      totalPage: 0,
      page: 0,
      loading: false,
      singertypeList,
      singerNameList,
      selectCountry: 'all_all',
      selectName: 'all'
    }
  },
  components: {
    singerAvatar, fPagination
  },
  methods: {
    async getTheSingeList (newPage) {
      this.loading = true
      let data
      try {
        data = await getSingerList({
          country: this.selectCountry,
          name: this.selectName,
          page: newPage
        })
        this.page = newPage
      } catch (e) {
        console.error(e)
      }
      this.loading = false
      Object.assign(this, data)
    }
  },
  created () {
    this.getTheSingeList(1)
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
.singer-type-list>.singer-country{
  margin-bottom: 3px;
}
.singer-type-list>.singer-firstname{
  margin-bottom: 5px;
}
.singer-type-list button{
  margin-left: 6px;
  margin-bottom: 2px;
  color: #50596c;
}
</style>
