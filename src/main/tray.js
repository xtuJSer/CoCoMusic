'use strict'
import { app, BrowserWindow, Menu, Tray } from 'electron'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let iconPath = process.env.NODE_ENV === 'development'
  ? `build/icons/32x32.png`
  : `${__static}/img/32x32.png`
let appIcon

app.addListener('ready', () => {
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: '退出',
    click: () => {
      BrowserWindow.getAllWindows().forEach(i => {
        i.close()
        i.destroy()
        i = null
      })
      app.quit()
    }
  },
  {
    label: '显示 / 隐藏',
    click: () => {
      BrowserWindow.getAllWindows().forEach(i => {
        if (i.isVisible()) {
          i.hide()
        } else {
          i.show()
        }
      })
    }
  }
  ])
  appIcon.setContextMenu(contextMenu)
  appIcon.on('click', (event) => {
    BrowserWindow.getAllWindows().forEach(i => {
      if (i.isVisible()) {
        i.hide()
      } else {
        i.show()
      }
    })
  })
})

export default appIcon
