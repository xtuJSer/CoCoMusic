const assert = require('assert')
const { getPlayList } = require('../../../src/spider/index')

describe('歌曲搜索', function () {
  it('getPlayList', async function () {
    let data = await getPlayList({
      categoryId: '10000000',
      page: 1
    })
    assert.strictEqual(data.length === 30, true)
  })
})
