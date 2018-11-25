const assert = require('assert')
const { getNewSingerList } = require('../../../src/spider/index')

describe('歌词', function () {
  it('getNewSingerList', async function () {
    let data = await getNewSingerList({
      page: 1,
      area: -100,
      sex: -100,
      genre: -100,
      index: -100
    })
    assert(data.singerList.length === 80)
  })
})
