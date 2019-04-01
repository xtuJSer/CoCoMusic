import localStorage from 'electron-localstorage'

const local = require('electron-localstorage')

local.setItem('A', 'A')
console.log(local.getItem('A'))
local.setItem('A', 'B')
console.log(localStorage.getItem('A'))
