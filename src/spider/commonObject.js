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
    this.fileName = { 0: 'C400', 48: 'C200', 96: 'C400', 128: 'M500', 320: 'M800', 111: 'C4L0', 112: 'R400', 113: 'KC40' }[this.type] + songMediaMid + '.m4a'
  }
}

export class Mv {
  constructor (mvName, piv, mvId) {
    this.mvName = mvName
    this.piv = piv
    this.mvId = mvId
  }
}

export class Category {
  constructor (categoryName, categoryId) {
    this.categoryName = categoryName
    this.categoryId = categoryId
  }
}

export class PlayList {
  constructor (playListMid, playListName, imgUrl) {
    this.playListName = playListName
    this.imgUrl = imgUrl
    this.playListMid = playListMid
  }
}

export class Lyric {
  constructor (lyricString, transString) {
    let lyric = this.parseLyric(Buffer.from(lyricString, 'base64').toString())
    let trans = transString && this.parseLyric(Buffer.from(transString, 'base64').toString())
    this.lyricList = trans ? this.searchTrans(lyric, trans) : lyric
  }

  parseLyric (lyricString) {
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    return lyricString.replace(/&apos;/g, '\'').split('\n').map(lyric => {
      let timeString = lyric.match(timeReg)
      if (!timeString) {
        return
      }
      timeString = timeString[0]
      let min = Number(String(timeString.match(/\[\d*/i)).slice(1))
      let sec = Number(String(timeString.match(/:\d*.\d*/i)).slice(1))
      let time = min * 60 + sec
      return {
        time: +time.toFixed(2),
        lyric: lyric.replace(timeReg, '')
      }
    }).filter(lyric => !!lyric && !!lyric.lyric)
  }

  searchTrans (lyric, trans) {
    let transIndex = -1
    function euqal (a, b) {
      return Math.abs(a - b) <= 0.3
    }
    return lyric.map(ly => {
      transIndex = transIndex + 1
      while (!euqal(ly.time, trans[transIndex].time)) {
        transIndex = transIndex + 1
      }
      return {
        time: ly.time,
        lyric: ly.lyric,
        trans: trans[transIndex].lyric
      }
    })
  }
}

export class UserInfo {
  constructor (cookieString) {
    this.cookieString = cookieString
    this.cookie = (function () {
      var cookie = {}
      cookieString.split('; ').forEach(item => {
        item = item.split('=')
        cookie[item[0]] = item[1]
      })
      return cookie
    })()
    this.g_tk = this._gtk()
  }
  _gtk () {
    function e (e) {
      for (var n = 5381, o = 0, t = e.length; t > o; ++o) {
        n += (n << 5) + e.charCodeAt(o)
      }
      return 2147483647 & n
    }
    if (this.cookie) {
      return e(this.cookie['p_skey'] || this.cookie['skey'])
    } else {
      return 0
    }
  }
}
