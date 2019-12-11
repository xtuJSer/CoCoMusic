<template>
  <div class="login-content">
    <button class="btn btn-link btn-sm">
      <img v-if="!logined" class="login-icon" id="icon" src="../assets/img/qq_login.svg" alt="TO_LOGIN" @click="login('https://xui.ptlogin2.qq.com/cgi-bin/xlogin?daid=384&pt_no_auth=1&style=11&appid=1006102&s_url=https%3A%2F%2Fy.qq.com%2Fportal%2Fprofile.html%23sub%3Dsinger%26tab%3Dfocus%26stat%3Dy_new.top.user_pic%26stat%3Dy_new.top.pop.logout&low_login=1&hln_css=&hln_title=&hln_acc=&hln_pwd=&hln_u_tips=&hln_p_tips=&hln_autologin=&hln_login=&hln_otheracc=&hide_close_icon=1&hln_qloginacc=&hln_reg=&hln_vctitle=&hln_verifycode=&hln_vclogin=&hln_feedback=', 'qq')">
      <img v-if="!logined" class="login-icon" id="icon" src="../assets/img/weixin_login.svg" alt="TO_LOGIN" @click="login('https://open.weixin.qq.com/connect/qrconnect?appid=wx48db31d50e334801&redirect_uri=https%3A%2F%2Fy.qq.com%2Fportal%2Fwx_redirect.html%3Flogin_type%3D2%26surl%3Dhttps%3A%2F%2Fy.qq.com%2F&response_type=code&scope=snsapi_login&state=STATE&href=https%3A%2F%2Fy.gtimg.cn%2Fmediastyle%2Fyqq%2Fpopup_wechat.css#wechat_redirect', 'wx')">
      <img v-if="logined" class="login-icon" id="icon" :src="icon" alt="TO_LOGIN">
    </button>
    <div class="login-status">STATUS : {{status}}</div>
    <div v-if="logined" class="col-12 col-sm-12 text-center">
        <button class="btn" @click="updateFavorite" :class="{loading: updating}" style="border: none">{{message}}</button>
        <button class="btn" @click="logout" style="border: none">注销</button>
    </div>
  </div>
</template>

<script>
import { setuser } from '../db/index'
import { UserInfo } from '../../spider/commonObject'
import { Info, LocalToRemote } from '../../spider/favorite'

const { BrowserWindow } = require('electron').remote

export default {
  data () {
    return {
      logined: !!window.localStorage.logined,
      status: 'NOT LOGIN',
      icon: '',
      updating: false,
      message: '上传本地收藏数据'
    }
  },
  async mounted () {
    this.logined && this.update()
  },
  methods: {
    async updateFavorite () {
      this.updating = true
      LocalToRemote().then((res) => {
        this.updating = false
        this.message = 'SUCCESS'
        setTimeout(() => (this.message = '上传本地收藏数据'), 3000)
      }).catch(e => {
        this.updating = false
        this.message = 'FAIL'
        setTimeout(() => (this.message = '上传本地收藏数据'), 3000)
      })
    },
    login (url, flag) {
      let win = new BrowserWindow({
        width: 400,
        height: 600,
        resizable: false,
        alwaysOnTop: true,
        // 禁用node.jpg 不然就进不了CocoMusic官网了
        webPreferences: { nodeIntegration: false }
      })
      win.on('close', () => { win = null })
      win.loadURL(url)
      win.show()
      win.webContents.on('did-finish-load', async (e) => {
        let jumpUrl = ((flag === 'qq') ? 'y.qq.com/portal/profile.html' : 'y.qq.com/')
        if (win.webContents.getURL().indexOf(jumpUrl) !== -1) {
          win.hide()
          window.setTimeout(() => {
            win.webContents.executeJavaScript('document.cookie').then(result => {
              var user = new UserInfo(result, flag)
              setuser(user)
              win.destroy()
              this.update()
            }, 1000)
          })
        }
      })
    },
    logout () {
      window.localStorage.removeItem('cookieString')
      window.localStorage.removeItem('cookieString')
      this.update()
    },
    async update () {
      var info = await Info()
      console.log(info)
      this.icon = info ? info.pic : ''
      this.status = info ? 'LOGINED : ' + info.nickname : 'NOT LOGIN'
      if (info) {
        this.logined = true
        window.localStorage.logined = true
      } else {
        window.localStorage.logined = false
        this.logined = false
      }
    }
  }
}
</script>

<style>
.login-content {
  width: 300px;
  margin: 0px auto;
  text-align: center;
}

.login-status {
  padding-top: 15px;
  letter-spacing: 6px;
  color: #4b48d6;
  font-size: x-small;
}

.login-icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
