<template>
  <div class="pagination">
    <ul class="pagination" @click="goto">
      <li class="page-item">
        <a href="javascript:void(0);" :f-to="current-1" :disabled="current<=1" tabindex="-1">Previous</a>
      </li>
      <li class="page-item" v-show="current>2">
        <a href="javascript:void(0);" f-to="1">1</a>
      </li>
      <li class="page-item" v-show="current>3">
        <span>...</span>
      </li>
      <li class="page-item" v-show="current>1">
        <a href="javascript:void(0);" :f-to="current-1">{{current-1}}</a>
      </li>
      <li class="page-item active">
        <a href="javascript:void(0);" :f-to="current">{{current}}</a>
      </li>
      <li class="page-item" v-show="(total-current)>0">
        <a href="javascript:void(0);" :f-to="current+1">{{current+1}}</a>
      </li>
      <li class="page-item" v-show="(total-current)>3">
        <span>...</span>
      </li>
      <li class="page-item" v-show="(total-current)>1">
        <a href="javascript:void(0);" :f-to="total">{{total}}</a>
      </li>
      <li class="page-item">
        <a href="javascript:void(0);" :f-to="current+1" :disabled="current>=total">Next</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    'current': Number, 'total': Number},
  methods: {
    goto (event) {
      if (event.target.nodeName === 'UL') {
        return
      }
      let to = event.target.getAttribute('f-to')
      this.$emit('to', to)
    }
  }
}
</script>
<style lang="stylus" scoped>

div.pagination
  text-align center

ul.pagination
  text-align center
  width 100%
  display inline
  li
    display inline
</style>
