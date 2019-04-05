import Dexie from 'dexie'
import { Singer, Album, PlayList } from '../../spider/commonObject'
const db = new Dexie('Music')

db.version(1).stores({
  singer: 'singerMid, singerName',
  song: 'songMid, songMediaMid, songName, album, type, singerList, fileName',
  album: 'albumMid, albumName',
  playList: 'playListMid, playListName, imgUrl',
  user: 'cookieString, cookie, g_tk'
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

async function getuser () {
  var users = await db.user.toArray()
  return users ? users[0] : null
}

async function setuser (data) {
  await db.user.where('g_tk').above(0).delete()
  await db['user'].put(data)
}

export {
  db, getFavorite, addFavorite, deleteFavorite, getuser, setuser
}
