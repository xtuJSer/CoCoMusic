<template>
  <div class="form-group" style="width: 100%; align-items: baseline" @keydown="sethotkey" @keyup="check">
    <div class="col-3 col-sm-12">
      <h6 class="form-label">{{name}}</h6>
    </div>
    <div class="col-6 col-sm-12">
      <code class="keys" v-for="key in keys" :key="key" >{{key}}</code>
    </div>
    <div class="col-3 col-sm-12 text-right">
      <button class="btn" @click="startset" :class="{loading: chekingNow}">{{settingNow ? '恢复' : btnMsg}}</button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { getMap } from '../../main/hotKey'

export default {
  props: ['type', 'name', 'hotkey'],
  data () {
    return {
      btnMsg: '设置',
      keys: this.hotkey.split('+'),
      bakKey: [],
      settingNow: false,
      chekingNow: false
    }
  },
  methods: {
    startset () {
      if (this.settingNow === true) {
        this.resetKey()
        this.settingNow = false
        ipcRenderer.send('try add global key', this.type, this.keys)
      } else {
        // 删除快捷键先（避免误触发之前的快捷键）
        ipcRenderer.send('clearAllKey')
        this.settingNow = true
        this.bakKey = []
        this.keys.forEach(item => this.bakKey.push(item))
        this.keys = []
      }
    },
    sethotkey (event) {
      if (this.settingNow === true) {
        let k = getMap()[event.keyCode]
        if (k) {
          this.keys.push(k)
        } else {
          this.keys.push(event.key[0].toUpperCase() + event.key.slice(1))
        }
      }
    },
    check (event) {
      if (this.settingNow === true) {
        this.chekingNow = true
        this.settingNow = false
        if (this.keys.length === 0) {
          this.resetKey()
        }
        ipcRenderer.send('try add global key', this.type, this.keys)
        ipcRenderer.on('add key status', (e, status, type) => {
          this.chekingNow = false
          if (this.type === type) {
            this.setMessage(status)
            if (status !== 'SUCCESS') {
              this.resetKey()
            }
          }
        })
      }
    },
    setMessage (msg) {
      this.btnMsg = msg
      setTimeout(() => { this.btnMsg = '设置' }, 3000)
    },
    resetKey () {
      this.keys = []
      this.bakKey.forEach(item => this.keys.push(item))
    }
  },
  activated () {
    this.keys = this.hotkey.split('+')
  }
}
</script>

<style>
code.keys {
  font-family: monospace, courier;
  font-size: 0.8em;
  background-color: #dee4f7;
  color: #5764c6;
  padding: 5px 5px;
  margin: 0px 2px;
  border-radius: 2px;
  white-space: nowrap;
}

.setting {
  width: 500px;
  margin: 100px auto 0px;
}
</style>
