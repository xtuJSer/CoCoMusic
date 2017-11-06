const { BrowserWindow, app } = require('electron')
const installExtension = require('electron-devtools-installer')

const extensionList = [
  installExtension.REACT_DEVELOPER_TOOLS,
  installExtension.REDUX_DEVTOOLS
]

let mainWindow
let loadingWindow
let loadUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : `file://${__dirname}/build/index.html`

function createMainWindows () {
  mainWindow = new BrowserWindow({
    height: 670,
    useContentSize: true,
    width: 1020,
    // autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    show: false,
    frame: false,
    'web-preferences': {
      'web-security': false
    }
  })
  mainWindow.loadURL(loadUrl)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    loadingWindow && loadingWindow.close()
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
    // install devtools extension include devtron and some react extension
    require('devtron').install()
    extensionList.forEach((extension) => {
      installExtension.default(extension)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    })
  }
}

function creatLoading () {
  loadingWindow = new BrowserWindow({
    parent: mainWindow,
    show: false,
    width: 300,
    height: 400,
    autoHideMenuBar: true,
    frame: false
  })
  loadingWindow.loadURL(`file://loading.html`)
  loadingWindow.on('closed', () => loadingWindow = null) // eslint-disable-line
  loadingWindow.webContents.on('did-finish-load', () => loadingWindow.show())
}

app.on('ready', () => {
  createMainWindows()
  creatLoading()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindows()
  }
})
