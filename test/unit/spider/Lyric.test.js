const assert = require('assert')
const { getLyric } = require('../../../src/spider/index')

describe('歌词', function () {
  it('getLyric', async function () {
    let data = await getLyric({
      singerMid: '000sN4Rj0MP9hg'
    })
    assert(data.lyric !== '')
  })
})
