<template>
  <div class="form-horizontal setting">
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <h6 class="form-label">检查更新</h6>
      </div>
      <div class="col-9 col-sm-12 text-right">
        <button class="btn" @click="checkUpdate" :class="{loading: loadingUpdate}">检查更新</button>
      </div>
      <div class="toast toast-primary" v-if="showVersion">
        当前版本：{{CURRENT_VERSION}} &nbsp; 服务器版本：{{version}} &nbsp; 
        <a v-if="version > CURRENT_VERSION" @click="go('https://github.com/xtuJSer/CoCoMusic')" class="c-hand">下载更新</a>
        <span v-else>已经是最新版本</span>
      </div>
    </div>
  </div>
</template>
<script>
import http from 'axios'
const {shell} = require('electron').remote
const packjsonUrl = 'http://cocomusic-1252075019.cosgz.myqcloud.com/package.json'
const CURRENT_VERSION = '2.0.0'

export default {
  data () {
    return {
      loadingUpdate: false,
      version: '',
      CURRENT_VERSION,
      showVersion: false
    }
  },
  methods: {
    async checkUpdate () {
      this.loadingUpdate = true
      try {
        const {version} = (await http.get(packjsonUrl)).data
        this.version = version
        this.showVersion = true
      } catch (e) {
        window.alert('我也不知道发生了什么Github看看吧')
        this.go('https://github.com/xtuJSer/CoCoMusic')
        this.showVersion = false
      }
      this.loadingUpdate = false
    },
    go (url) {
      shell.openExternal(url)
    }
  }
}
</script>
<style scoped>
.setting {
  width: 500px;
  margin: 80px auto;
}
</style>
