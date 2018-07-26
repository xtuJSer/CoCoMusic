<template>
  <div class="pagination">
    <ul class="pagination" @click="goto" v-show="!loading">
      <li class="page-item">
        <a :f-to="current-1" :disabled="current<=1" tabindex="-1">Previous</a>
      </li>
      <li class="page-item" v-show="current>2">
        <a f-to="1">1</a>
      </li>
      <li class="page-item" v-show="current>3">
        <span>...</span>
      </li>
      <li class="page-item" v-show="current>1">
        <a :f-to="current-1">{{current-1}}</a>
      </li>
      <li class="page-item active">
        <a :f-to="current">{{current}}</a>
      </li>
      <li class="page-item" v-show="(total-current)>0">
        <a :f-to="current+1">{{current+1}}</a>
      </li>
      <li class="page-item" v-show="(total-current)>3">
        <span>...</span>
      </li>
      <li class="page-item" v-show="(total-current)>1">
        <a :f-to="total">{{total}}</a>
      </li>
      <li class="page-item">
        <a :f-to="current+1" :disabled="current>=total">Next</a>
      </li>
    </ul>
    <div v-show="loading" class="loading loading-lg text-center"></div>
  </div>
</template>
<script>
export default {
  props: {
    current: Number,
    total: Number,
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goto (event) {
      if (event.target.nodeName !== 'A') {
        return
      }
      this.$emit('goto', Number(event.target.getAttribute('f-to')))
    }
  }
}
</script>
<style>
div.pagination{
  width: 100%;
  text-align: center;
}
ul.pagination>li>a{
  cursor: pointer;
}
ul.pagination{
  margin: 0 auto;
  display: inline;
}
ul.pagination>li{
  display: inline;
}
.pagination div.loading {
    display: block;
    width: 100%;
}
</style>