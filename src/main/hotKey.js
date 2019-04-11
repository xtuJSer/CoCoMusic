import { app, globalShortcut, BrowserWindow } from 'electron'
const config = require('../main/localStorage')

let keyMap = {
  'previous': {
    name: '上一首',
    key: 'CmdOrCtrl + Alt + Left',
    func: function () {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('previous')
        console.log('send pre')
      })
    }
  },
  'next': {
    name: '下一首',
    key: 'CmdOrCtrl + Alt + Right',
    func: function () {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('next')
      })
    }
  },
  'pause or play': {
    name: '暂停 / 播放',
    key: 'CmdOrCtrl + Alt + P',
    func: function () {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('pause or play')
      })
    }
  },
  'increase volume': {
    name: '增大音量',
    key: 'CmdOrCtrl + Alt + Up',
    func: function () {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('increase volume')
      })
    }
  },
  'decrease volume': {
    name: '减小音量',
    key: 'CmdOrCtrl + Alt + Down',
    func: function () {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('decrease volume')
      })
    }
  },
  'show or hide window': {
    name: '显示 / 隐藏窗口',
    key: 'CmdOrCtrl + Alt + H',
    func: function () {
      BrowserWindow.getAllWindows().forEach(i => {
        if (i.isVisible()) {
          i.hide()
        } else {
          i.show()
        }
      })
    }
  }
}

let defaultKeyMap = deepCopy(keyMap)

function deepCopy (obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

function init () {
  keyMap = deepCopy(defaultKeyMap)
  let settings = config.default.getItem('keyMap')
  if (settings) {
    Object.keys(settings).forEach(set => {
      keyMap[set]['key'] = settings[set]['key']
    })
  }
}

function setHotKey () {
  init()
  let keys = []
  Object.keys(keyMap).forEach(key => {
    keys.push(keyMap[key])
  })
  keys.forEach(item => {
    globalShortcut.register(item['key'], item['func'])
  })
}

function start () {
  app.addListener('ready', () => {
    setHotKey()
  })
  app.addListener('window-all-closed', () => {
    globalShortcut.unregisterAll()
  })
}

export default start

export function resetHotKey () {
  globalShortcut.unregisterAll()
  setHotKey()
}

export function getkeyMap () {
  init()
  return keyMap
}

export function setGlobalKey (type, keys) {
  var status
  if (keys.length <= 1 || keys[0].length <= 1 || keys[0] === 'Shift') {
    status = 'FAIL'
  } else {
    globalShortcut.register(keys.join(' + '), () => {})
    if (globalShortcut.isRegistered(keys.join(' + ')) === true) {
      let tostoreSetting = {}
      keyMap[type]['key'] = keys.join(' + ')
      Object.keys(keyMap).forEach(k => {
        tostoreSetting[k] = {
          key: keyMap[k]['key']
        }
      })
      config.default.setItem('keyMap', tostoreSetting)
      status = 'SUCCESS'
    } else {
      status = '与 系统 / 其他程序 快捷键冲突'
    }
  }
  resetHotKey()
  return status
}

export function clearGlobalKey () {
  globalShortcut.unregisterAll()
}

export function DefaultKeySetting () {
  config.default.removeItem('keyMap')
  resetHotKey()
}

export function getMap () {
  let map = {
    17: 'CmdOrCtrl',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down'
  }
  if (process.platform !== 'darwin') {
    map[91] = 'Windows'
  } else {
    map[91] = 'Cmd'
  }
  return map
}
