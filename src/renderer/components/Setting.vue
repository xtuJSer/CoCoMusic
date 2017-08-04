<template>
  <div>
    <h4>假装有设置</h4>
    <div class="divider text-center" data-content="设置"></div>
    <div>
      <ul>
        <li>检查更新：请star这个<button class="btn btn-sm" @click="open">Git仓库</button>，这样就能及时收到更新了,欢迎大家pr</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { remote } from 'electron'
const shell = remote.shell
export default {
  methods: {
    open () {
      shell.openExternal('https://github.com/fengT-T/CoCoMusic')
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
