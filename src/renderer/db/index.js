import Dexie from 'dexie'
import { Singer, Album, PlayList, UserInfo } from '../../spider/commonObject'
const db = new Dexie('Music')

db.version(1).stores({
  singer: 'singerMid, singerName',
  song: 'songMid, songMediaMid, songName, album, type, singerList, fileName',
  album: 'albumMid, albumName',
  playList: 'playListMid, playListName, imgUrl'
})

async function getFavorite () {
  return {
    song: await db.song.toArray(),
    singer: (await db.singer.toArray()).map(obj => new Singer(
      obj.singerName, obj.singerMid
    )),
    album: (await db.album.toArray()).map(obj => new Album(
      obj.albumName, obj.albumMid
    )),
    playList: (await db.playList.toArray()).map(obj => new PlayList(
      obj.playListMid, obj.playListName, obj.imgUrl
    ))
  }
}

async function addFavorite ({ table, data }) {
  await db[table].put(data)
}

async function deleteFavorite ({ table, id }) {
  await db[table].where(`${table}Mid`).equals(id).delete()
}

function getuser () {
  return new UserInfo(localStorage.getItem('cookieString'))
}

function setuser (data) {
  let { cookieString } = data
  localStorage.setItem('cookieString', cookieString)
}

export {
  db, getFavorite, addFavorite, deleteFavorite, getuser, setuser
}
