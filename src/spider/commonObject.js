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
  constructor (songName, songMid, songMediaMid, album, singerList, type) {
    this.songMid = songMid
    this.songMediaMid = songMediaMid
    this.songName = songName
    this.album = album
    this.type = type
    this.singerList = singerList
    // 这个是啥子，其实我也不知道，我只知道默认是96： 'C400'
    this.fileName = {0: 'C400', 48: 'C200', 96: 'C400', 128: 'M500', 320: 'M800', 111: 'C4L0', 112: 'R400', 113: 'KC40'}[this.type] + songMediaMid + '.m4a'
  }
}

export class Mv {
  constructor (mvName, piv, mvId) {
    this.mvName = mvName
    this.piv = piv
    this.mvId = mvId
  }
}
