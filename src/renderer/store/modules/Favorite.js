import vue from 'vue'
function add (state, key, payload) {
  state.db.transaction([key], 'readwrite')
    .objectStore(key)
    .add(payload)
  vue.set(state[key], payload[`${key}Mid`], payload)
}
function del (state, key, payload) {
  state.db.transaction([key], 'readwrite')
    .objectStore(key)
    .delete(payload[`${key}Mid`])
  vue.delete(state[key], payload[`${key}Mid`], payload)
}
export default {
  state: {
    singer: {},
    album: {},
    song: {},
    db: {}
  },
  mutations: {
    setDB (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    addFavoriteSinger (state, payload) {
      add(state, 'singer', payload)
    },
    delFavoriteSinger (state, payload) {
      del(state, 'singer', payload)
    },
    addFavoriteSong (state, payload) {
      add(state, 'song', payload)
    },
    delFavoriteSong (state, payload) {
      del(state, 'song', payload)
    },
    addFavoriteAlbum (state, payload) {
      add(state, 'album', payload)
    },
    delFavoriteAlbum (state, payload) {
      del(state, 'album', payload)
    }
  },
  actions: {
    initFavorite ({commit, state}) {
      let openRequest = window.indexedDB.open('music')
      openRequest.onupgradeneeded = event => {
        let db = event.target.result
        db.createObjectStore('singer', { keyPath: 'singerMid' })
        db.createObjectStore('album', { keyPath: 'albumMid' })
        db.createObjectStore('song', { keyPath: 'songMid' })
      }
      openRequest.onsuccess = event => {
        let db = event.target.result
        commit('setDB', { db })
        let singerList = {}
        let songList = {}
        let albumList = {}
        db.transaction(['singer'], 'readwrite')
          .objectStore('singer')
          .openCursor()
          .onsuccess = event => {
            var res = event.target.result
            if (res) {
              singerList[res.key] = res.value
              res.continue()
            } else {
              commit('setDB', {singer: singerList})
            }
          }
        db.transaction(['album'], 'readwrite')
          .objectStore('album')
          .openCursor()
          .onsuccess = event => {
            var res = event.target.result
            if (res) {
              albumList[res.key] = res.value
              res.continue()
            } else {
              commit('setDB', {album: albumList})
            }
          }
        db.transaction(['song'], 'readwrite')
          .objectStore('song')
          .openCursor()
          .onsuccess = event => {
            var res = event.target.result
            if (res) {
              songList[res.key] = res.value
              res.continue()
            } else {
              commit('setDB', {song: songList})
            }
          }
      }
    }
  }
}
