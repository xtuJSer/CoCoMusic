import Dexie from 'dexie'

const db = new Dexie('Music')

db.version(1).stores({
  singer: 'singerMid, singerName',
  song: 'songMid, songMediaMid, songName, album, type, singerList, fileName',
  album: 'albumMid, albumName'
})

async function getFavorite () {
  return {
    song: await db.song.toArray(),
    singer: await db.singer.toArray(),
    album: await db.album.toArray()
  }
}

async function addFavorite ({table, data}) {
  await db[table].put(data)
}

async function deleteFavorite ({table, id}) {
  await db[table].where(`${table}Mid`).equals(id).delete()
}

export {
  db, getFavorite, addFavorite, deleteFavorite
}
