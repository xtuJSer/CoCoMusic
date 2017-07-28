<template>
  <div class="singer-list">
    <div class="select-list" @click="select">
      <div class="select-singer">
        <button class="btn btn-link" v-for="(value,key) in singertypeList" :class="{'active': selectSingerType === value, 'loading': selectSingerType === value && isLoading}" f-select="selectSingerType" :value="value" :key="value"> {{key}} </button>
      </div>
      <div class="select-name">
        <button class="btn btn-link" v-for="(value,key) in singerNameList" :class="{'active': selectSingerName === value, 'loading': selectSingerName === value && isLoading}" f-select="selectSingerName" :value="value" :key="value"> {{key}} </button>
      </div>
    </div>
    <div class="singer-img-list">
      <div class="singer-item" v-for="(item,index) in list" :key="item.Fsinger_mid">
        <router-link :to="`/singer/${item.Fsinger_mid}/`">
          <img class="badge" v-lazy="`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg`" alt="">
          <p>{{item.Fsinger_name}}</p>
        </router-link>
      </div>
    </div>
    <f-pagination :current="page" :total="total_page" @to="goPage"></f-pagination>
  </div>
</template>
<script>
import { singertypeList, singerNameList } from './SingerList/singerList.js'
import fPagination from './common/Pagination'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      singertypeList, singerNameList
    }
  },
  components: {
    fPagination
  },
  computed: {
    ...mapState({
      selectSingerType: state => state.SingerList.selectSingerType,
      selectSingerName: state => state.SingerList.selectSingerName,
      isLoading: state => state.SingerList.isLoading,
      list: state => state.SingerList.list,
      page: state => state.SingerList.page,
      total_page: state => state.SingerList.total_page
    })
  },
  methods: {
    select (event) {
      let select = event.target.getAttribute('f-select')
      let value = event.target.getAttribute('value')
      this.$store.commit('setList', { page: 1 })
      this.$store.commit('selectSinger', {
        select, value
      })
      this.$store.dispatch('updateSingerList')
    },
    goPage (to) {
      this.$store.commit('setList', {
        page: +to
      })
      this.$store.dispatch('updateSingerList')
    }
  },
  created () {
    if (!this.list.length) {
      this.$store.dispatch('updateSingerList')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/stylus/main.styl'

div.select-list
  button
    margin-bottom 3px
    transition 0.5s ease
  button.active
    background-color main-color
    border-radius 6px
    color white
.singer-img-list
  margin-top 30px
  display flex
  flex-wrap wrap
  div.singer-item
    width 190px
    text-align center
    margin-bottom 20px
    a
      &:focus
        box-shadow: none
      img
        width 150px
        height auto
        border-radius 50%
</style>
