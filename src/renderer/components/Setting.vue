<template>
  <div class="form-horizontal setting">
    <div class="divider text-center" data-content="Update"></div>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <h6 class="form-label">当前版本</h6>
      </div>
      <div class="col-9 col-sm-12 text-right">
        <p>{{CURRENT_VERSION}}</p>
      </div>
      <div class="col-3 col-sm-12">
        <h6 class="form-label">检查更新</h6>
      </div>
      <div class="col-9 col-sm-12 text-right">
        <button class="btn" @click="checkUpdate" :class="{loading: loadingUpdate}">检查更新</button>
      </div>
      <div class="toast toast-primary" v-if="showVersion">
        <button class="btn btn-clear float-right" @click="showVersion = false"></button>
        当前版本：{{CURRENT_VERSION}} &nbsp; 最新稳定版本：{{version}} &nbsp;
        <a v-if="version !== CURRENT_VERSION" @click="go('https://github.com/xtuJSer/CoCoMusic')" class="c-hand">下载更新</a>
        <span v-else>已经是最新版本</span>
      </div>
    </div>
    <div class="divider text-center" data-content="Debug"></div>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <h6 class="form-label">调试</h6>
      </div>
      <div class="col-9 col-sm-12 text-right">
        <button class="btn" @click="openDev">打开 / 关闭 调试窗口</button>
      </div>
    </div>
    <div class="divider text-center" data-content="About"></div>
    <div class="form-group">
      <div class="col-3 col-sm-12">
        <h6 class="form-label">代码仓库</h6>
      </div>
      <div class="col-9 col-sm-12 text-right">
        <button class="btn" @click="go('https://github.com/xtuJSer/CoCoMusic')">Github</button>
      </div>
    </div>
  </div>
</template>
<script>
import http from 'axios'
const { shell, getCurrentWebContents } = require('electron').remote
const packjsonUrl = 'http://cocomusic-1252075019.file.myqcloud.com/package.json'
const CURRENT_VERSION = '2.0.4'

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
        const { version } = (await http.get(packjsonUrl)).data
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
    },
    openDev () {
      getCurrentWebContents().toggleDevTools()
    }
  }
}
</script>
<style scoped>
.setting {
  width: 500px;
  margin: 100px auto;
}
</style>
