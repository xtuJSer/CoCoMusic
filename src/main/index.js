'use strict'

import { app, BrowserWindow } from 'electron'
import flow from 'lodash/fp/flow'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, loadingWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const loadURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/static/loading.html`
  : `file://${__dirname}/static/loading.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 610,
    useContentSize: true,
    width: 1020,
    // autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    show: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    loadingWindow && loadingWindow.close()
  })
}

function creatLoading () {
  loadingWindow = new BrowserWindow({
    center: true,
    parent: mainWindow,
    show: true,
    width: 400,
    height: 230,
    autoHideMenuBar: true,
    frame: false
  })
  loadingWindow.loadURL(loadURL)
  loadingWindow.on('closed', () => loadingWindow = null) // eslint-disable-line
  // loadingWindow.webContents.on('did-finish-load', () => loadingWindow.show())
}

app.on('ready', flow([createWindow, creatLoading]))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
