const assert = require('assert')
const { getSingerMusicList } = require('../../../src/spider/index')

describe('歌手音乐列表', function () {
  it('SingerMusicList', async function () {
    let data = await getSingerMusicList({
      singerMid: '004PT6gg3cLvxv',
      page: 0
    })
    assert.strictEqual(data.musicList.length, 30)
  })
})
