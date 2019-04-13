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
    <div class="divider text-center" data-content="View"></div>
    <div class="form-group">
      <div class="col-6 col-sm-12">
        <h6 class="form-label">关闭按钮的行为</h6>
      </div>
      <div class="col-6 col-sm-12 text-right">
        <button class="btn" @click="hideSetting">{{hide ? '隐藏窗口' : '退出 CoCoMusic'}}</button>
      </div>
      <div class="col-6 col-sm-12">
        <h6 class="form-label">默认 / 无边框窗口</h6>
      </div>
      <div class="col-3 col-sm-12 text-right">
        <button class="btn" v-if="reloadbtn" @click="reload">重载窗口</button>
      </div>
      <div class="col-3 col-sm-12 text-right">
        <button class="btn" @click="noSideWindow">{{winSide ? '默认窗口边框' : '无窗口边框'}}</button>
      </div>
    </div>
    <div class="divider text-center" data-content="LOGIN"></div>
    <div>
      <login></login>
    </div>
    <div class="divider text-center" data-content="HotKey" @click="hotkeysbtn = !hotkeysbtn"></div>
    <div v-if="hotkeysbtn" class="form-group">
      <div class="col-12 col-sm-12 text-center">
        <button class="btn" @click="defaultKeySet">重置快捷键</button>
      </div>
      <hot-key-setting v-for="(value, key) in hotkeys" :key="value.name" :type="key" :name="value.name" :hotkey="value.key"></hot-key-setting>
    </div>
  </div>
</template>
<script>
import http from 'axios'
import { ipcRenderer } from 'electron'
import HotKeySetting from './HotKeySetting'
import Login from './Login'
import { getkeyMap } from '../../main/hotKey.js'
const localStorage = require('../../main/localStorage').default
const { shell, getCurrentWebContents } = require('electron').remote
const packjsonUrl = 'http://cocomusic-1252075019.file.myqcloud.com/package.json'
const CURRENT_VERSION = '2.0.4'

export default {
  data () {
    return {
      loadingUpdate: false,
      version: '',
      CURRENT_VERSION,
      showVersion: false,
      hide: localStorage.getItem('hideSetting') === 'true',
      winSide: localStorage.getItem('winSideSetting') === 'true',
      reloadbtn: false,
      hotkeysbtn: false,
      hotkeys: {}
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
    },
    hideSetting () {
      localStorage.setItem('hideSetting', this.hide ? 'false' : 'true')
      this.hide = !this.hide
    },
    noSideWindow () {
      localStorage.setItem('winSideSetting', this.winSide ? 'false' : 'true')
      this.winSide = !this.winSide
      this.reloadbtn = true
    },
    reload () {
      ipcRenderer.send('reload')
    },
    defaultKeySet () {
      ipcRenderer.send('default key setting')
      setTimeout(() => {
        this.loadKey()
        this.hotkeysbtn = false
      }, 500)
    },
    loadKey () {
      this.hotkeys = getkeyMap()
    }
  },
  components: {Login, HotKeySetting},
  activated () {
    this.loadKey()
  }
}
</script>
<style scoped>
.setting {
  width: 500px;
  margin: 100px auto 0px;
}
</style>
