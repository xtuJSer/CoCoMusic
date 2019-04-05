<template>
  <div class="login-content">
    <button class="btn btn-link btn-sm" @click="login">
      <img class="login-icon" v-bind:src="icon" alt="TO_LOGIN">
    </button>
    <div class="login-status">STATUS : {{status}}</div>
  </div>
</template>

<script>
import { setuser } from '../db/index'
import { UserInfo } from '../../spider/commonObject'
import { Info } from '../../spider/favorite'
const { BrowserWindow } = require('electron').remote

export default {
  methods: {
    login () {
      Login()
    }
  },
  data () {
    return {
      logined: false,
      status: 'NOT LOGIN',
      icon: '../assets/img/qq_login.svg'
    }
  },
  async activated () {
    let info = await Info()
    this.icon = info ? info.pic : '../assets/img/qq_login.svg'
    this.status = info ? 'LOGINED : ' + info.nickname : 'NOT LOGIN'
    this.logined = info === undefined
  }
}

// 登陆返回cookie
function Login () {
  let win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: true,
    alwaysOnTop: true,
    // 禁用node.jpg
    webPreferences: { nodeIntegration: false }
  })
  win.on('close', () => { win = null })
  win.loadURL('https://xui.ptlogin2.qq.com/cgi-bin/xlogin?daid=384&pt_no_auth=1&style=11&appid=1006102&s_url=https%3A%2F%2Fy.qq.com%2Fportal%2Fprofile.html%23sub%3Dsinger%26tab%3Dfocus%26stat%3Dy_new.top.user_pic%26stat%3Dy_new.top.pop.logout&low_login=1&hln_css=&hln_title=&hln_acc=&hln_pwd=&hln_u_tips=&hln_p_tips=&hln_autologin=&hln_login=&hln_otheracc=&hide_close_icon=1&hln_qloginacc=&hln_reg=&hln_vctitle=&hln_verifycode=&hln_vclogin=&hln_feedback=')
  win.show()
  win.webContents.on('did-finish-load', async function (e) {
    if (win.webContents.getURL().indexOf('y.qq.com/portal/profile.html') !== -1) {
      win.hide()
      window.setTimeout(() => {
        win.webContents.executeJavaScript('document.cookie').then(result => {
          var user = new UserInfo(result)
          setuser(user)
          win.destroy()
        }, 1000)
      })
    }
  })
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
