const assert = require('assert')
const { getSearch } = require('../../../src/spider/index')

describe('歌曲搜索', function () {
  it('getSearch', async function () {
    let data = await getSearch({
      keyword: '初音未来',
      page: 0
    })
    // console.log(data)
    assert.strictEqual(data.songList.length === 20, true)
  })
})
