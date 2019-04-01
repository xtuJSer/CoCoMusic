'use strict'
import { app, BrowserWindow, Menu, Tray } from 'electron'

let iconPath
if (process.platform === 'win32') {
  iconPath = `${__static}\\img\\32x32.png`
} else {
  iconPath = `${__static}/img/32x32.png`
}

let appIcon

app.addListener('ready', () => {
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: '退出',
    click: () => {
      BrowserWindow.getAllWindows().forEach(i => {
        i.close()
        i.destroy()
      })
    }
  },
  {
    label: 'HIDE/SHOW',
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
})

export default appIcon
