const assert = require('assert')
const { getSingerList } = require('../../../src/spider/index')

describe('歌手列表', function () {
  it('singerList', async function () {
    let data = await getSingerList({
      country: 'all_all',
      name: 'all',
      page: 1
    })
    assert.strictEqual(data.singerList.length, 100) // 华语歌手一定是超过100个的
  })
})
