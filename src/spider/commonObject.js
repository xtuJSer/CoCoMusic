export class Singer {
  constructor (singerName, singerMid) {
    this.singerName = singerName
    this.singerMid = singerMid
  }
}
export class Album {
  constructor (albumName, albumMid) {
    this.albumName = albumName
    this.albumMid = albumMid
  }
}
export class Music {
  constructor (songName, songMid, album, singerList) {
    this.songMid = songMid
    this.songName = songName
    this.album = album
    this.singerList = singerList
  }
}
