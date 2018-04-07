export class Singer {
  constructor (singerName, singerMid) {
    this.singerName = singerName && singerName.split(' (')[0]
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
  constructor (songName, songMid, songMediaMid, album, singerList) {
    this.songMid = songMid
    this.songMediaMid = songMediaMid
    this.songName = songName
    this.album = album
    this.singerList = singerList
  }
}

export class Mv {
  constructor (mvName, piv, mvId) {
    this.mvName = mvName
    this.piv = piv
    this.mvId = mvId
  }
}
