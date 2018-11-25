const assert = require('assert')
const { getSingerAlbumList } = require('../../../src/spider/index')

describe('歌手专辑列表', function () {
  it('singerList', async function () {
    let data = await getSingerAlbumList({
      singerMid: '004PT6gg3cLvxv',
      page: 0
    })
    assert(data.list.length >= 19)
  })
})
